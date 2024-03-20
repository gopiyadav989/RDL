import Seller from "../models/seller.model.js";
import bcryptjs from 'bcryptjs';

import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {

    try {
        const {fullName, email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password,7);
    
        const seller = await Seller.create({
            fullName,
            email,
            password: hashedPassword,
            companyLogo: `https://api.dicebear.com/5.x/initials/svg?seed=${fullName}`,
        })

        res.status(201).json({
            success: true,
            msg: "user created Successfully",
            seller,
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "User cannot be registered. please try again",
        })
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await Seller.findOne({ email: email }); // Finding the user by email in the Seller model
        if (!validUser) {
            return res.status(404).json({
                success: false,
                message: "User is not registered, please singup first",
            });
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure, please try again"
        })
    }
}


export const google = async (req, res, next) => {
    try {
        const existingSeller = await Seller.findOne({ email: req.body.email });

        if (existingSeller) {
            const token = jwt.sign({ id: existingSeller._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = existingSeller._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 7);

            const newSeller = await Seller.create({
                fullName: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                companyLogo: req.body.photo
            });

            const token = jwt.sign({ id: newSeller._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newSeller._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Google authentication failed, please try again"
        });
    }
}


export const signout = async (req, res, next) => {
    try{
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    }
    catch(e){
        next(e);
    }
}