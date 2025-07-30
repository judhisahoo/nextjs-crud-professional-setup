import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().required('name is required'),
  email: yup.string().required('Email is required.').email('it must be valid email'),
  phone: yup.string().min(10, 'Phone must be at least 10 digits'),
  dob: yup.date().typeError('DOB must be a valid date').required('DOB is required'),
  age: yup.number().min(0),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password must be at least 15 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  status: yup.string().oneOf(['Active', 'InActive']),
});
