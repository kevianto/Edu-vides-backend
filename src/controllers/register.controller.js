import User from "../models/User.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    return res.status(200).json({ success: true, message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default register;
