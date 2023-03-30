import * as yup from 'yup';

// auth
const emailYupValidation = yup
  .string()
  .matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Invalid email'
  )
  .required('Email is requiered')
  .min(2, 'Min 2 characteres')
  .max(24, 'Max 12 characteres');

const passwordYupValidation = yup
  .string()
  .required('Password is requiered')
  .min(2, 'Min 2 characteres')
  .max(33, 'Max 12 characteres');

export const loginFormSchema = yup.object({
  email: emailYupValidation,
  password: passwordYupValidation,
});

export const registerFormSchema = yup.object({
  name: yup
    .string()
    .required('Full name is requiered')
    .min(2, 'Min 2 characteres')
    .max(30, 'Max 12 characteres'),
  email: emailYupValidation,
  password: passwordYupValidation,
});

// Orders
export const addressFormSchema = yup.object({
  firstName: yup
    .string()
    .required('First name requiered')
    .min(2, 'Min 2 characteres')
    .max(30, 'Max 12 characteres'),
  lastName: yup
    .string()
    .required('Last name requiered')
    .min(2, 'Min 2 characteres')
    .max(30, 'Max 12 characteres'),
  address: yup
    .string()
    .required('Address requiered')
    .min(2, 'Min 2 characteres')
    .max(30, 'Max 12 characteres'),
  address2: yup.string().max(30, 'Max 12 characteres'),
  city: yup
    .string()
    .required('City requiered')
    .min(2, 'Min 2 characteres')
    .max(21, 'Max 21 characteres'),
  zipCode: yup
    .string()
    .required('ZIP Code requiered')
    .min(2, 'Min 2 characteres')
    .max(18, 'Max 18 characteres'),
  country: yup
    .string()
    .required('Country requiered')
    .min(2, 'Min 2 characteres')
    .max(21, 'Max 21 characteres'),
  phone: yup
    .string()
    .required('Phone requiered')
    .min(2, 'Min 2 characteres')
    .max(24, 'Max 24characteres'),
});

export const newProductFormSchema = yup.object({
  title: yup
    .string()
    .required('Title requiered')
    .min(2, 'Min 2 characteres')
    .max(150, 'Max 150 characteres'),
  description: yup
    .string()
    .required('Title requiered')
    .min(2, 'Min 2 characteres')
    .max(810, 'Max 810 characteres'),
  inStock: yup
    .number()
    .typeError('Amount must be a number')
    .required('Stock requiered')
    .positive()
    .min(1, 'Min 1 product in stock'),
  price: yup
    .number()
    .typeError('Amount must be a number')
    .required('Price requiered')
    .positive()
    .min(0, 'Price required'),
  slug: yup
    .string()
    .required('Price requiered')
    .matches(/^\S+$/, 'Blanks not allowed')
    .min(3, 'Min 3 characteres'),
  sizes: yup.array().min(1, 'At least one option must be selected'),
});
