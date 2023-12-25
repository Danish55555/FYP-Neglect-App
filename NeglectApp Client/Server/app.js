const express = require('express');
var path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var guardianRouter = require('./routes/guardianR');
var doctorRouter = require('./routes/doctorR')
var genericRouter = require('./routes/genericR')
var Guardian = require('./models/guardianModel')
var Doctor = require('./models/doctorModel')
const multer = require('multer');
const auth = require('./middleware/userauth')
const morgan = require('morgan');
const cloudinary=require('cloudinary').v2;
const {cloudinaryStorage, CloudinaryStorage}=require('multer-storage-cloudinary');
cloudinary.config({
cloud_name:'drimnkool',
api_key:487655348572394,
api_secret:'upDGozIUn9ahAzRQG0ftev9Eus8'


})





var clodstore=new CloudinaryStorage(
  {
    folder:'profilepicsa',
    allowedFormats:['jpg','jpeg','png'],
    transformation:[{
      crop:"limit"
    }]
    ,cloudinary:cloudinary
  }
)

const multercloud=multer({storage:clodstore});








// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}




const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));



app.post('/guardian/updateprofileimage', auth, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.json({
          msg: 'Error: No File Selected!'
        });
      } else {

        Guardian.findOneAndUpdate({ _id: req.user.id }, { profilepic: `uploads/${req.file.filename}` }, (err, results) => {
          if (err) {
            next(err)
          }

          res.json({
            msg: 'File Uploaded!',
            filepath: `http://localhost:5000//uploads/${req.file.filename}`
          });
        })



      }
    }
  });
});



app.post('/doctor/updateprofileimage', auth, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.json({
          msg: 'Error: No File Selected!'
        });
      } else {

        Doctor.findOneAndUpdate({ _id: req.user.id }, { profilepic: `uploads/${req.file.filename}` }, (err, results) => {
          if (err) {
            next(err)
          }

          res.json({
            msg: 'File Uploaded!',
            filepath: `http://localhost:5000//uploads/${req.file.filename}`
          });
        })
      }
    }
  });
});






app.post('/testcloudinary',(req,res)=>{
console.log(req.body.ha)
  res.json({"msg":"Hello world"});
})


app.get('/', (req, res) => {
  res.json({ msg: "Hello from Danish" })
})
app.use('/guardian', guardianRouter);
app.use('/doctor', doctorRouter)
app.use('/user', genericRouter)

module.exports = app;