const express = require('express');
const jwt = require('jsonwebtoken');

// const verificationToken =  Math.floor(100000 + Math.random() * 900000).toString();

//GENERATE A TOKEN AND SET IT IN A COOKIE
const generateTokenCookies = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.cookie ('jwt', token, {
        httpOnly: true, //XSS protection
        secure : process.env.NODE_ENV === "production",
        sameSite: "strict", //CSRF protection or attack
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    return token;
}

module.exports = { generateTokenCookies };