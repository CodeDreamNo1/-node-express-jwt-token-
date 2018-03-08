var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const token = jwt.sign({
        //exp: Math.floor(Date.now() / 1000) + (60 * 60),//签署1小时token
        name: 123
    },'dddd'
    ,{
        expiresIn: 30 //60秒到期时间
    });
// view engine setup
router.all('*',function (req, res, next) {
    jwt.verify(token, 'dddd', function (err, decoded) {
        if (!err){
            console.log(decoded)
            next(); //会输出123，如果过了60秒，则有错误。
        } else {
            console.log('token过期了')
            res.sendfile('./views/1.html');
        }
    })
})
/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile('./views/1.html')
});
router.get('/r',function (req,res,next) {
    if(req.query.user === '123' && req.query.pass === '123'){
        res.cookie('token',token)
        res.end();
    } else {
        // res.write('用户名密码错误');
        res.render('./views/error.html');
    }
})
router.get('/c',function (req,res,next) {
     console.log('未过期')
    res.end();
})
module.exports = router;
