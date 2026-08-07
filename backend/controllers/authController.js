const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {

    try {

        const { full_name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (full_name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, full_name, email`,
            [full_name, email, hashedPassword]
        );

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Registration failed"
        });

    }

};



const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.json({

            message: "Login successful",

            token,

            user: {

                id: user.id,
                full_name: user.full_name,
                email: user.email

            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Login failed"

        });

    }

};



module.exports = {
    registerUser,
    loginUser
};


