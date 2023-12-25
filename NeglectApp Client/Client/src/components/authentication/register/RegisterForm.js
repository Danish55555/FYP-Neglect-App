import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import axios from 'axios';
import { showErrorMessage,showSuccessMessage } from '../../../utils/Notification';
import { isEmail, isEmpty,isLength, isMatch } from '../../../utils/Validation';
const initialState={
      name:'',
      email:'',
      password:'',
      cf_password:'',
      role:'',
      err:'',
      success:''
}







// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, isSubmitting, getFieldProps } = formik;


  const [user,setUser]=useState(initialState);
  const [userrole,setrole]=useState(0);

  const {name,email,password,cf_password,role,err,success}=user;
  const handleChangeInput=e=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value,err:'',success:''})
  }

  const onChangeUser=e=> {
    if(e.target.value==='guardian'){
      setrole(1)
      setUser({...user,role:1,err:'',success:''})
      console.log(e.target.value);
      console.log(userrole)
      return
    }
    setrole(1)
    setUser({...user,role:2,err:'',success:''})
    console.log(e.target.value);
    console.log(userrole)
    
  }


const handleSignupSubmit=async e=>{
e.preventDefault();


if(isEmpty(name) || isEmpty(password)){
  return  setUser({...user,err:'Please fill in all fields',success:''})
 }
if(!isEmail(email)){
 return setUser({...user,err:'Please enter a valid Email',success:''})
}
if(isLength(password)){
 return setUser({...user,err:'Please enter a password with length atleast 5',success:''})
}
if(!isMatch(password,cf_password)){
 return setUser({...user,err:'Verify password and password donot match',success:''})
}







try {
 
const res=await axios.post('/user/register',{
  name,email,password,role
})

setUser({...user,err:'',success:res.data.msg})

} catch (err) {
  err.response.data.msg && setUser({...user,err:err.response.data.msg,success:''})
}
}










  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSignupSubmit}>


      {err && showErrorMessage(err)}
              {success && showSuccessMessage(success)}


        <Stack spacing={3}>
          
        <TextField id="name"  name="name"
                placeholder="Your Name"
        
        onChange={handleChangeInput}
        value={name}
        
        />

           
          

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
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
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


<TextField
            fullWidth
            type="password"
            id="cf_password" name="cf_password" 
            placeholder="Confirm Password"
            onChange={handleChangeInput}
            value={cf_password}
          />



<div>
        <input type="radio" value="guardian" name="usertype" 
        
        
        onChange={onChangeUser}
        /> Guardian
        <input type="radio" value="doctor" name="usertype" 
        
        onChange={onChangeUser}
        /> Doctor
        
      </div>





          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
