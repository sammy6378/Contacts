const express = require('express');
const route = express.Router();
const authModel = require('../models/authModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//? POST auth/login
/* route.post('/login', async(req, res) => {
    try {
        const {username, password} = req.body;
        const user = await authModel.findOne({username});
        if(username.trim() === "") {
            return res.json({success: false, message: "username field empty"})
        }
        if(password.trim() === "") {
            return res.json({success: false, message: "password field empty"})
        }

        if(!user) {
            return res.json({success: false, message: "User not found"})
        }

        const isValidPassword = bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            return res.json({success: false, message: "Password not found"});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        res.json({success: true, message: "Login Successful", token})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error login' in"});
    }
}) */


//? POST auth/register
route.post('/register', async(req, res) => {
    try {
        const {username, email, password} = req.body;
        if(username.trim() === "" || email.trim() === "" || password.trim() === "") {
            return res.json({success: false, message: "Empty fields"});
        }

        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Invalid email"})
        }

        if(!validator.isStrongPassword(password)) {
            return res.json({success: false, message: "Invalid password"});
        }

        //hash password: bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await authModel.create({
            username,
            password: hashedPassword,
            email,
        })
        
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

        res.json({success: true, token, message: "Account created successfully"});
        
    } catch (error) {
        if(error.code === 11000) {
          return  res.json({success: false, message: "User already exists"})
        }
        res.json({success: false, message: "registration error" + error.message});
        
    }
})


module.exports = route;