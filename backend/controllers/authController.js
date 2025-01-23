//Package Imports
const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

//LOCAL IMPORTS
const User = require("../models/userModel");
const { generateTokenCookies } = require('../utils/verificationCode');
const { verificationEmail, welcomeEmail, passwordResetEmail,
         passwordResetSuccessEmail } = require('../mailtrap/emails');

// SIGNUP FUNCTION.....
const signup = async (req, res) => {
    const {name, email, password } = req.body;
    
    try {
        //CHECK FOR EMPTY FIELDS AND SEND A RESPONSE
        if(!name || !email || !password){
            res.status(400).json({message: 'All fields are Required'});
        }
        //CHECKING FOR EXISTING USER
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({message: 'User Already Exist'});
        };
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //GENERATE A VERIFICATION CODE
        // const verificationToken = generateVerificationToken();
        const verificationToken =  Math.floor(100000 + Math.random() * 900000).toString();

        //CREATE A NEW USER
        const user = new User({
            name,
            email,
            password: hashPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000 //24hrs

        });
        await user.save();

        // GENERATE JWT TOKEN
        generateTokenCookies(res, user._id);

        //SEND VERIFICATION EMAIL TO USER OR SEND EMAIL WITH VERIFICATION TOKEN         
        await verificationEmail(user.email, user.verificationToken);

        res.status(201).json({message: 'User created successfully', success: true, 
            user:{...user._doc, password: undefined, }});
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({message: 'Server Error'});
        
    }
}

//LOGIN FUNCTION.......
const login = async (req, res) => {
   const { email, password } = req.body;

   try {

    const user = await User.findOne({email});

    if(!email || !password){
        res.status(400).json({message: 'All fields are Required'});
    } else if(!user){
        res.status(400).json({success: false, message: 'Email and Password Not Found'});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        res.status(400).json({success: false, message: 'Email and Password Not Found'});
    }

      // GENERATE JWT TOKEN
      generateTokenCookies(res, user._id);
    //   lastLogin = new Date.now();

        await user.save();

    res.status(200).json({success: true, message: 'Login successful', user:{...user._doc, password: undefined, }});
        
   } catch (error) {
    console.error(`Error: ${error.message}`);
    // res.status(500).json({message: 'Server Error'});
    res.status(500).json({success: false, message: 'Server Error'});
   }
}

//LOGOUT FUNCTION....
const logout = async (req, res) => {
    // res.cookie("jwt", "", {httpOnly: true, expires: new Date(0)});
    res.clearCookie("jwt", "", {httpOnly: true, expires: new Date(0)});
    res.status(200).json({success: true, message: 'Logout successful'});
}

//VERIFY EMAIL FUNCTION....
const verifyEmail = async(req, res)=>{
    //6 digit code
 const { code } = req.body;
 try {
    const user = await User.findOne({
        verificationToken: code, //CHECK IF VERIFICATION TOKEN MATCHES
        verificationTokenExpiresAt: {$gt: Date.now()} 
    });

    //CHECK IF USER EXISTS AND IF TOKEN HAS EXPIRED
    if(!user){
        return res.status(400).json({success: false, message: 'Invalid or Expired Verification Token'});
    }
    
    //
    user.isVerified = true; //SET USER TO VERIFIED
    user.verificationToken = undefined; //REMOVE VERIFICATION TOKEN
    verificationTokenExpiresAt = undefined; //REMOVE EXPIRATION DATE
    await user.save(); //SAVE USER

    
    await welcomeEmail(user.email, user.name); //SEND WELCOME EMAIL TO USER
    res.status(200).json({message: 'Email Verified Successfully', success: true, 
        user:{...user._doc, password: undefined, }}); //SEND RESPONSE

 } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({success: false, message: 'Server Error'});    
    
 }

}

//FORGOT PASSWORD FUNCTION....
const forgotPassword = async(req, res)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: 'User not found'});
        }
        //GENERATE A RANDOM TOKEN
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 30 * 60 * 1000; //30 minutes

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        //SEND PASSWORD RESET EMAIL TO USER  
        await passwordResetEmail(user.email, `${process.env.CLIENT_SIDE_URL}/reset-password/${resetToken}`);
        res.status(200).json({success: true, message: 'Password reset link sent to your email'});

    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({success: false, message: 'Server Error'});
        
    }
}

//RESET PASSWORD FUNCTION....
const resetPassword = async(req, res)=>{
    const { token } = req.params; //DESTRUCTING TOKEN FROM PARAMS
    const {password} = req.body; 
    try {
        const user = await User.findOne({resetPasswordToken: token, resetPasswordExpiresAt: {$gt: Date.now()} });
        if(!user){
            return res.status(400).json({success: false, message: 'Expired or Invalid Token'});
        }
        //UPDATE PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword;
        user.resetPasswordToken = undefined; //REMOVE RESET TOKEN
        user.resetPasswordExpiresAt = undefined; //REMOVE EXPIRATION DATE
        await user.save(); //SAVE NEW USER INTO DB

        //SEND PASSWORD RESET SUCCESS EMAIL TO USER
        await passwordResetSuccessEmail(user.email);
        res.status(200).json({message: 'Password Reset Successfully', success: true, 
            user:{...user._doc, password: undefined, }}); //SEND RESPONSE


    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({success: false, message: 'Server Error'});
        
    }

}

//CHECK FUNCTION TO AUTHENTICATE USER....
const checkAuth = async(req, res) => {
    try {
        const user = await User.findById(req.userId); //FIND USER BY ID USING THE USERID FROM VERIFY MIDDLEWARE
        if(!user){
            return res.status(401).json({success: false, message: 'Unauthorized User'});
        }
        res.status(200).json({ success: true, user:{...user._doc, password: undefined, }}); 
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({success: false, message: 'Server Error'});     
    }
}

//EXPORT FUNCTIONS
module.exports = { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth};