const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// Cookie can't be read by JS (httpOnly), is only sent over HTTPS in prod,
// and uses sameSite "none"+secure for cross-site deploys / "lax" locally.
const cookieOptions = () => {
    const isProd = process.env.NODE_ENV === "production";
    return {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: SEVEN_DAYS_MS,
    };
};

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // Primary auth path: store the JWT in an httpOnly cookie (XSS-safe).
        res.cookie("token", token, cookieOptions());

        // token is also returned for the bearer-header fallback used by
        // setups/clients that can't rely on cross-site cookies.
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const getProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    });

};

const logoutUser = async (req, res) => {

    // Clear the cookie with the same attributes it was set with,
    // otherwise the browser won't remove it.
    const { maxAge, ...clearOptions } = cookieOptions();
    res.clearCookie("token", clearOptions);

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });

};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    logoutUser
};