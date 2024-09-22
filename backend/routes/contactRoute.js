const express = require("express");
const contactsModel = require("../models/contactModel");
const route = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//?POST contacts/add
route.post("/add", authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, email, number, address } = req.body;
    if (name.trim() === "" || email.trim() === "" || address.trim() === "") {
      return res.json({
        success: false,
        message: "Check for empty input fields",
      });
    }

    const fullNumber = "+" + "254" + number;

    if (fullNumber.length !== 13) {
      return res.json({
        success: false,
        message: "Number should be 9 digits long",
      });
    }

    const data = await contactsModel.create({
      name,
      email,
      number: fullNumber,
      address,
    });

    res.json({ success: true, data, message: "Contact added succesfully" });
  } catch (error) {
    console.log(error);
  }
});


//?GET contacts/list
route.get("/list", authMiddleware, async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.json({ success: false, message: "User does not exist" });
      }
  
      const data = await contactsModel.find({ userId });
      if (!data) {
        return res.json({ success: false, message: "Contact List empty" });
      }
  
      res.json({ success: true, data });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = route;
