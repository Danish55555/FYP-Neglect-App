import * as Yup from 'yup';
import React,{ useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { showErrMsg,showSuccessMsg } from '../../../utils/Notifications/Notification';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

import axios from 'axios';
//import { showErrorMessage,showSuccessMessage } from './Utilities/Notification';
import {dispatchLogin} from '../..//../redux/actions/authAction';
import {useDispatch} from 'react-redux';



const initialState={

  email:'',
  password:'',
  err:'',
  success:''
}





export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });




  const { errors, touched, values, isSubmitting, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };






  const [admin, setadmin] = useState(initialState)
  const dispatch=useDispatch();


  const {email,password,err,success}=admin;
  const handleChangeInput=e=>{
    const {name,value}=e.target;
    setadmin({...admin,[name]:value,err:'',success:''})
  }
const handleLoginSubmit=async e=>{
e.preventDefault();
try {
  const res=await axios.post('/admin/login',{email,password})
  setadmin({...admin,err:'',success:res.data.msg})
  console.log(res)
  localStorage.setItem('firstLogin',true)
  dispatch(dispatchLogin())
  navigate('/dashboard', { replace: true });

} catch (err) {
  err.response.data.msg && setadmin({...admin,err:err.response.data.msg,success:''})
}
}












  return (
    <FormikProvider value={formik}>
      <div className="heelo" style={{marginBottom:'20px', color:'white'}}>
      {err && showErrMsg(err)}
  {success && showSuccessMsg(success)}
        
      </div>
            
      <Form autoComplete="off" noValidate onSubmit={handleLoginSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            onChange={handleChangeInput}
            value={email}

          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}

            onChange={handleChangeInput}
            value={password}

          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="/forgetpassword">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}