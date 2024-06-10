require('dotenv').config();

const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());


//Database connection with mongodb
const CONNET_MONGOOSE = process.env.CONNET_MONGOOSE;
console.log(CONNET_MONGOOSE);

mongoose.connect(CONNET_MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


//creating Application interface protocol
app.get("/", (request, response) => {
    response.send("Express app is running")
})

//Image storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//creating upload endpoint for images
app.use("/images", express.static("upload/images"))
app.post("/upload", upload.single("product"), (req, res) => {

    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,

    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true,
    }
})
app.post("/addproduct", async (request, response) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0]
        id = last_product.id + 1;
    } else {
        id = 1;
    }


    const product = new Product({
        id: id,
        name: request.body.name,
        image: request.body.image,
        category: request.body.category,
        new_price: request.body.new_price,
        old_price: request.body.old_price
    })
    console.log(product)
    await product.save();
    console.log("saved")
    response.json({
        success: true,
        name: request.body.name,
    })
})
//creating api for deleteing products
app.post("/removeproduct", async (request, response) => {
    await Product.findOneAndDelete({
        id: request.body.id
    })
    console.log("removed")
    response.json({
        success: true,
        name: request.body.name,
    })
})


//Creating api for getting all products
app.get("/allproducts", async (request, response) => {
    let products = await Product.find({})
    console.log("All Products fetched");

    response.send(products)
})


//creating api endpoint for new collection data
app.get("/newcollections", async (request, response) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    console.log("new Collection fetched");

    response.send(newCollection);
})

//creating api endpoint for popualar in women 
app.get("/popularinwomen", async (request, response) => {
    let products = await Product.find({ category: "women" })
    let popularinwomen = products.slice(0, 4);
    console.log("popular in women fetched")
    response.send(popularinwomen);
})

//creating middleware to fetch user
const fetchUser = async (request, response, next) => {
    const token = request.header("auth-token");
    if (!token) {
        response.status(401).send({ erros: "Please authenticate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, "secret_ecom");
            request.user = data.user;
            next();

        } catch (error) {
            response.status(401).send({ errors: "please authenticate with valid token" })
        }
    }
}

//creating a endpoint for adding products in cartData
app.post("/addtocart", fetchUser, async (request, response) => {
    //   console.log(request.body, request.user)
    console.log("Added", request.body.itemId)
    let userData = await Users.findOne({ _id: request.user.id });
    userData.cartData[request.body.itemId] += 1;

    await Users.findOneAndUpdate({ _id: request.user.id }, { cartData: userData.cartData })
    response.send("Added")
})

//creating endpoint to remove product from cart data
app.post("/removefromcart", fetchUser, async(request, response) => {
    console.log("removed", request.body.itemId)
    let userData = await Users.findOne({ _id: request.user.id });
    if(userData.cartData[request.body.itemId] > 0){

        userData.cartData[request.body.itemId] -= 1;
    }

    await Users.findOneAndUpdate({ _id: request.user.id }, { cartData: userData.cartData })
    response.send("Removed")
})
//creating endpoint to get cartData
app.post("/getcart", fetchUser, async(request, response) => {
    console.log("Get Cart");
    let userData = await Users.findOne({_id: request.user.id})
    response.json(userData.cartData);

})
//Schema for user model
const Users = mongoose.model("Users", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})
//Creating endpoint for registering the users
app.post("/signup", async (request, response) => {
    let emailAlreadyExists = await Users.findOne({
        email: request.body.email
    })
    if (emailAlreadyExists) {
        return response.status(400).json({
            success: false,
            errors: "existing user email address"
        })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id,
        }
    }

    const token = jwt.sign(data, "secret_ecom");
    response.json({ success: true, token })
})

//creating a endpoint for user login
app.post("/login", async (request, response) => {
    let user = await Users.findOne({
        email: request.body.email,
    })

    if (user) {
        let passwordCompare = request.body.password === user.password;

        if (passwordCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, "secret_ecom");
            response.json({
                success: true, token
            })
        } else {
            response.json({
                success: false,
                errors: "Please Enter your correct password"
            })
        }
    } else {
        response.json({
            success: false,
            error: "Wrong Email ID"
        })
    }
})

//listening to the server
app.listen(port, (error) => {
    if (!error) {
        console.log("server running on port:", port)
    } else {
        console.log("connection error:", error)
    }
})
