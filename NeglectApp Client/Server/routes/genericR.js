const express=require('express')
const userC=require('../controllers/genericC')
const auth=require('../middleware/userauth')
var router = express.Router();


router.post('/register',userC.register )
router.post('/login', userC.login);
router.post('/refresh_token',userC.getAccessToken)
router.get('/infor',auth, userC.getUserInfo)
router.post('/forgot',userC.forgetPassword)
router.post('/resetpassword',auth,userC.resetpassword)
router.get('/logout',userC.logout);
router.get('/totalusers',userC.getTotalUsers)
module.exports = router;
