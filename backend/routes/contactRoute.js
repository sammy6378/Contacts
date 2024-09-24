const express = require("express");
const contactsModel = require("../models/contactModel");
const route = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

//* Set up multer
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${file.originalname.trim()}`);
  },
});

const upload = multer({ storage: storage });

//* Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//? POST contacts/add
route.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const userId = req.userId;
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    // Check if any required field is missing
    const { name, email, number, address } = req.body;
    if (name.trim() === "" || email.trim() === "" || address.trim() === "") {
      return res.json({
        success: false,
        message: "Check for empty input fields",
      });
    }

    // Format phone number
    const fullNumber = "+" + "254" + number;
    if (fullNumber.length !== 13) {
      return res.json({
        success: false,
        message: "Number should be 9 digits long",
      });
    }

    // Create contact and store the image URL from Cloudinary
    const data = await contactsModel.create({
      name,
      email,
      number: fullNumber,
      address,
      image: uploadResult.secure_url, // Store the Cloudinary image URL,
      userId
    });

    res.json({ success: true, data, message: "Contact added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

/*
 //? POST contacts/edit/:id (with optional image upload)
route.post("/edit/:id", authMiddleware, upload.single('image'), async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.userId;
  
      // Find the existing contact
      const contact = await contactsModel.findOne({ _id: id, userId });
      if (!contact) {
        return res.status(404).json({ success: false, message: "Contact not found" });
      }
  
      let newImageUrl = contact.image; // Keep the old image URL unless a new one is uploaded
  
      // Check if a new image is uploaded
      if (req.file) {
        // Upload new image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
  
        // Delete the old image from Cloudinary if it exists
        const oldImageUrl = contact.image;
        if (oldImageUrl) {
          // Extract the public ID from the URL (needed to delete the image from Cloudinary)
          const publicId = oldImageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        }
  
        // Set the new image URL
        newImageUrl = uploadResult.secure_url;
      }
  
      // Update the contact details, including the image URL if it was updated
      const updatedContact = await contactsModel.findByIdAndUpdate(
        { _id: id, userId },
        {
          name: req.body.name || contact.name,
          email: req.body.email || contact.email,
          number: req.body.number || contact.number,
          address: req.body.address || contact.address,
          image: newImageUrl, // Update image URL if a new image was uploaded
          updatedAt: Date.now(),
        },
        { new: true }
      );
  
      res.json({ success: true, message: "Contact successfully updated", data: updatedContact });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  });
  

//POST contacts/delete/:id
route.post("/delete/:id", authMiddleware, async (req, res) => {
  try {
  } catch (error) {}
});
 */

//? GET contacts/list
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
