const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {
    // //validate the data
    // const { error } = registerValidation(req.body)
    // if(error) return res.status(400).json({
    //     status: res.statusCode,
    //     message: error.details[0].message
    // })

    // check the email address
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email already exists!'
    })

    //Hash Password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password
    });
    try{
        savedUser = await user.save();
        res.json({
            error: false,
            message: "User saved successfully!",
            savedUser});
    }catch(err){
        res.status(400).json({
            status: res.statusCode,
            message: 'failed! pls try again!'
        })
    }
})

router.post('/login', async (req, res) => {
    // const { error } = loginValidation(req.body)
    // if(error) return res.status(400).json({
    //     status: res.statusCode,
    //     message: error.details[0].message
    // })

    // check the email address
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).json({
        status: res.statusCode,
        message: 'Email is not found!'
    })

    //check password
    //const validPass = await bcrypt.compare(req.body.password, user.password);
    const validPass = await User.findOne({ password: req.body.password });
    if(!validPass) return res.status(400).json({
        status: res.statusCode,
        message: 'Invalid Password!'
    })

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({
        status: res.statusCode,
        message: 'Token generated!',
        token: token
    })
})

module.exports = router;



