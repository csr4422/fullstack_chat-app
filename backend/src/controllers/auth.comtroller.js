import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at leats 6 characters long" });
        };


        const user = await User.findOne({ email });

        if (user) return res.status(400).json({
            message: "user already exists"
        });
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })
        if (newUser) {
            //generating jwt token
            generateToken(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic:newUser.profilePic
            })

        }
        else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "internal server error" })

    }
};
export const login = (req, res) => {
    res.send("login route");
};
export const logout = (req, res) => {
    res.send("logout route");
};

