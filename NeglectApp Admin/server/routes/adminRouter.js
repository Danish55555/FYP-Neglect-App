var express = require('express');
var router = express.Router()
const auth = require('../middleware/auth')
const Admin= require('../controllers/adminController');

router.post('/register', Admin.adminCtrl)
router.post('/activation', Admin.activateEmail)
router.post('/login', Admin.login)
router.post('/refresh_token', Admin.getAccessToken) 
router.post('/forgot', Admin.forgotPassword) 
router.post('/reset', auth, Admin.resetPassword)
router.get('/infor', auth, Admin.getAdminInfor)
router.get('/guardianinfor', auth, Admin.getGuardianInfor)
router.get('/doctorinfor', auth, Admin.getDoctorInfor)
router.get('/logout', Admin.logout)
router.patch('/update', auth, Admin.updateprofile)
router.patch('/updaterole/:id', auth, Admin.updateuserrole)
router.delete('/deleteguardian/:id', auth, Admin.deleteguardian)
router.delete('/deletedoctor/:id', auth, Admin.deletedoctor)

router.post('/addfaq',auth, Admin.addfaq)
router.delete('/deletefaq/:id', auth, Admin.delfaq)
router.get('/getfaq', Admin.getfaq)
router.patch('/updatefaq/:id', Admin.updatefaq)

router.post('/addannouncement',auth, Admin.addannouncement)
router.delete('/deleteannouncement/:id', auth, Admin.delannouncement)
router.get('/getannouncement', Admin.getannouncement)
router.patch('/updateannouncement/:id', Admin.updateannouncement)

router.post('/addplan', Admin.addplan)
router.delete('/deleteplan/:id', Admin.delplan)
router.patch('/updateplan/:id', Admin.updateplan)
router.get('/getplan', Admin.getplan)

router.get('/getpaymenthistory', Admin.getpaymenthistory)
router.patch('/verifypayment/:did', Admin.verifypayment)

router.post('/upload', Admin.uploadImage)
router.get('/getimage', Admin.cloudImage)

router.post('/uploadprofilepic', Admin.uploadprofilepicture)

router.post('/uploadrehabimg', Admin.uploadrehabimg)
router.get('/cloudrehabimage/:id', Admin.cloudRehabImage)

router.get('/totalusers',Admin.getTotalUsers)

router.get('/getstatistics', auth,Admin.getStatistics);
module.exports= router;