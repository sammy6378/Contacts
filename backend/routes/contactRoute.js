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

//! POST contacts/add
route.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const userId = req.userId;
    // Upload image to Cloudinary
    let imageUrl = "";
    if(req.file) {
         const uploadResult = await cloudinary.uploader.upload(req.file.path);
         imageUrl = uploadResult.secure_url 
    }


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
      image: imageUrl, // Store the Cloudinary image URL,
      userId,
    });

    res.json({ success: true, data, message: "Contact added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

//! POST contacts/edit/:id
route.post(
  "/edit/:id",
  upload.single("image"),
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.userId;
      const id = req.params.id;

      const contact = await contactsModel.findOne({ _id: id, userId });

      let newImageUrl = contact.image; //keep a copy of the original image
      if (req.file) {
        const uploadedImage = await cloudinary.uploader.upload(req.file.path);
        const oldImageUrl = contact.image;
        if (oldImageUrl) {
          const publicId = oldImageUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
        newImageUrl = uploadedImage.secure_url;
      }

      const data = await contactsModel.findByIdAndUpdate(
        { _id: id, userId },
        {
          name: req.body.name,
          email: req.body.email,
          address: req.body.address,
          number: req.body.number,
          image: newImageUrl, //replace with the new image
          updatedAt: Date.now(),
        },
        { new: true }
      );

      res.json({
        success: true,
        message: "Contact updated successfully",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ success: false, message: "Error Updating" });
    }
  }
);

//! POST contacts/delete/:id
route.post("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;
    //delete the image from cloudinary first
    const contact = await contactsModel.findOne({ _id: id, userId });
    const contactImage = contact.image;
    if (contactImage) {
      const publicId = contactImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    const data = await contactsModel.findByIdAndDelete({ _id: id, userId });
    res.json({ success: true, message: "Contact Deleted Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Error Deleting Contact" });
  }
});

//! GET contacts/list 
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

//! contacts/:id
route.get('/:id', authMiddleware, async(req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const data = await contactsModel.findOne({_id: id, userId});
    res.json({success: true, data});
  } catch (error) {
    console.log(error);
    res.status(400).json({success: false, message: "Failed to fetch contact"});
  }
})

module.exports = route;