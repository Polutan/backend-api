const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User')

router.get('/', verify, async (req, res) => {
    try {
        const user  = await User.find()
        res.json(user)
    }catch(err){
        res.json({
            status: res.statusCode,
            message: err})
    }
})

module.exports = router;