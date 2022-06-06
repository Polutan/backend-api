const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {
    // //validate the data
    // const { error } =  registerValidation(req.body);
    // if (error) return res.status(400).send(error.message);

    // check the email address
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {return res.status(400).send('Email already exists');}

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        nama: req.body.nama,
        email: req.body.email,
        password: hashedPassword,
        no_telp: req.body.no_telp,
    });
    try{
        savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(404).send(err);
    }
})

router.post('/login', async (req, res) => {
    // // validate the data
    // const { error } =  loginValidation(req.body);
    // if (error) return res.status(400).send(error.detail);

    // check the email address
    const user = await User.findOne({ email: req.body.email });
    if (!user) {return res.status(400).send('Email is not found!');}

    //check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {return res.status(400).send('Invalid Password!');}

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    res.send('Logged in!');
})

module.exports = router;



