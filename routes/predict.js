const router = require('express').Router();
const verify = require('./verifyToken');

//Predictions result
router.get('/', verify, async (req, res) => {
    try {
        let score = 87;
        
        res.status(200).json({
        error: false,
        status: res.statusCode,
        message: 'Prediction Success!',
        score
    })
    }catch(err){
        res.json({
            status: res.statusCode,
            message: err})
    }
})

module.exports = router;