const router = require('express').Router();

router.get('/', (req, res) => {
    let score = 87;

    res.status(200).json({
        error: false,
        status: res.statusCode,
        message: 'Prediction Success!',
        score
    })
})

module.exports = router;