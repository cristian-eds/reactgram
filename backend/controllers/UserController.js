const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

// Generate User TOken
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d"
    });
};


// Register user and sign in
const register = async (req, res) => {

    const { name, email, password } = req.body

    //check if user existes
    const user = await User.findOne({ email });

    if (user) {
        res.status(422).json({ errors: ["Por favor, utilize outro e-mail"] });
        return;
    }

    // Generate password hasj
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    });

    // if user was created sucessfully
    if (!newUser) {
        res.status(422).json({ erros: ["Houve um erro, por favor tente mais tarde."] });
        return;
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })

    res.send("Registro");
};

// Sign user in
const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //Check user exists
    if (!user) {
        res.status(404).json({ errors: ["Usuário não existe."] })
        return;
    }

    // Check if password matches
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({ errors: ["Senha está incorreta."] });
        return;
    }

    //Return user with token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })
}


// Get current logged in User
const getCurrentUser = async (req, res) => {
    const user = req.user

    res.status(200).json(user);
}

// update user
const update = async (req, res) => {

    const { name, password, bio } = req.body;

    let profileImage = null;

    if (req.file) {
        progileImage = req.file.filaname;
    }

    const reqUser = req.user;

    const user = await User.findById(reqUser._id).select("-password");

    if (name) {
        user.name = name;
    }

    if (password) {
        // Generate password hasj
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash;
    }

    if (profileImage) {
        user.profileImage = profileImage;
    }

    if (bio) {
        user.bio = bio;
    }

    await user.save();

    res.status(200).json(user);
}


module.exports = {
    register,
    login,
    getCurrentUser,
    update
}