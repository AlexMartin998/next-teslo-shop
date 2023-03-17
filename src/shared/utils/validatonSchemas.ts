import * as yup from 'yup';

export const loginFormSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email'
    )
    .required('Email is requiered')
    .min(2, 'Min 2 characteres')
    .max(24, 'Max 12 characteres'),
  password: yup
    .string()
    .required('Password is requiered')
    .min(2, 'Min 2 characteres')
    .max(33, 'Max 12 characteres'),
});
