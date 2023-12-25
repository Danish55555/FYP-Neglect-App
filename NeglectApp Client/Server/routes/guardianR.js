var express = require('express');
const auth=require('../middleware/userauth')
//const adminAuth=require('../middleware/authAdmin');

var guardianC = require('../controllers/guardianC');

var router = express.Router();









/* GET users listing. */
router.post('/register', guardianC.guardianRegister);
router.post('/login', guardianC.login);
router.post('/activation',guardianC.activateEmail)
router.post('/refresh_token',guardianC.getAccessToken)
router.post('/forgot',guardianC.forgetPassword)
router.post('/reset',auth,guardianC.resetPassword)
router.get('/infor',auth, guardianC.getGuardianInfo)
router.get('/logout', guardianC.logout);
router.get('/:id/deleteguardian',auth, guardianC.deleteUser);
router.patch('/updateGuardian',auth, guardianC.updateGuardian)
router.post('/resetpass',auth,guardianC.resetpass)
router.post('/review',auth,guardianC.addReview);

router.get('/review',auth,guardianC.getAllReviews);
router.patch('/:userid/review/:id', auth,guardianC.postReply);
router.delete('/:userid/review/:id', auth,guardianC.deleteReview)
router.delete('/review/:id/reply/:replyid', auth,guardianC.deleteReply)
router.patch('/review/:id',auth,guardianC.editReview);
router.post('/patient',guardianC.addPatient);
router.get('/patient',auth,guardianC.getAllPatients);
router.get('/patient/:id',auth,guardianC.getPatient);
router.patch('/patient/:id',auth,guardianC.updatePatient);
router.patch('/patient/:id/setneglect',auth,guardianC.setNeglectType)
//router.get('/getallusers',auth,adminAuth, guardianC.getAllUser)
router.get('/doctors',auth,guardianC.getAllDoctors);
router.get('/doctor/:id',auth,guardianC.getDoctor);
router.post('/rehabrequest',auth,guardianC.postRequest);
router.post('/sendquery',auth,guardianC.sendQuery);
router.get('/:gid/allreplies/:did',auth,guardianC.getAllReplies);
router.get('/allrequest',auth,guardianC.getAllRequest);
router.post('/uploadprofilepic', guardianC.uploadprofilepicture)
router.get('/getappointments/:gid', auth, guardianC.getAllAppointments)
router.get('/getstats',auth,guardianC.getStatistics);
router.get('/faq', guardianC.faq)
router.get('/myrehabpatients/:id', guardianC.getrehabpatients)
module.exports = router;