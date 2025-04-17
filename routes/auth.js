import express from 'express';
import bcrypt from "bcryptjs";

import User from '../models/user.js';

const router = express.Router();

// check
router.get('/get', async (req, res) => {
    res.status(200).json({ message: "Got it" });
});

// Sign Up
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username }); // Checking for the existing user

        if (existingUser) {
            return res.status(200).json({ message: "User already exist" });
        }
        const hashPassword = bcrypt.hashSync(password);

        const newUser = new User({ username, password: hashPassword });
        await newUser.save()
        .then(() => {
            const {password , ...others} = newUser._doc;
            res.status(200).json({ message: "User Saved", others });
        })
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: 'Server error',error: error.message });
    }
})

// Sign In
router.post('/signin', async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(200).json({ message: 'User does not exits' });
        }

        const isMatch = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!isMatch) {
            return res.status(200).json({ message: "Invalid username or password" });
        }
        // res.status(200).json({ message: "Login successful!" });
        const {password , ...others} = user._doc; // give everyting from User Database except password
        res.status(200).json({message:"loged in" , others});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Sever Error"});
    }
})

export default router;