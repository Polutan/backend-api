const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
   res.json({
    status: res.statusCode,
    message: 'Hello!'
   })
})

module.exports = router;