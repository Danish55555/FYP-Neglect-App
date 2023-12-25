var express = require('express');
const auth=require('../middleware/userauth')
var doctorC = require('../controllers/doctorC');
var router = express.Router();










/* GET users listing. */
router.post('/register', doctorC.doctorRegister);
router.post('/login', doctorC.login);
router.post('/activation',doctorC.activateEmail)
router.post('/refresh_token',doctorC.getAccessToken)
router.post('/forgot',doctorC.forgetPassword)
router.post('/reset',auth,doctorC.resetPassword)
router.get('/infor',auth, doctorC.getDoctorInfo)
router.get('/logout',auth, doctorC.logout);
router.get('/:id/deletedoctor',auth, doctorC.deleteUser);
router.patch('/updateDoctor',auth,doctorC.updateDoctor)
router.post('/review',auth,doctorC.addReview);
router.get('/review',auth,doctorC.getAllReviews);
router.patch('/:userid/review/:id', auth,doctorC.postReply);
router.delete('/:userid/review/:id', auth,doctorC.deleteReview)
router.delete('/review/:id/reply/:replyid', auth,doctorC.deleteReply)
router.patch('/review/:id',auth,doctorC.editReview);
//router.get('/getallusers',auth,adminAuth, guardianC.getAllUser)
router.patch('/addpatient/:sid',auth,doctorC.addPatient);
router.get('/patient/:id',auth,doctorC.getPatient);
router.delete('/patient/:id',auth,doctorC.deletePatient);
router.get('/allrequest',auth,doctorC.getAllRequest);
router.patch('/request/:id',auth,doctorC.acceptRequest);
router.get('/queries',auth,doctorC.getAllQueries);
router.get('/replies/:id',auth,doctorC.getAllReplies)
router.patch('/replies/:id',auth,doctorC.postReply);
router.post('/:did/plan/:pid', doctorC.payments )
router.get('/plans', doctorC.getplan )
router.get('/paymenthistory/:did', doctorC.getpaymenthistory)


router.post('/appointment',auth,doctorC.addAppointment);
router.get('/getappointments', auth, doctorC.getAllAppointments)
router.patch('/updateappointment/:id', auth, doctorC.updateAppointment)
router.delete('/deleteappointment/:id', auth, doctorC.deleteAppointment)


router.get('/myrehabpatients/:id', doctorC.getrehabpatients)


router.post('/uploadprofilepic', doctorC.uploadprofilepicture)
router.post('/postscore',auth,doctorC.uploadStatistics)
router.get('/getstatistics',auth,doctorC.getStatistics);
router.post('/postobservation', auth, doctorC.postobservation)
router.get('/faq', doctorC.faq)

module.exports = router;