import * as yup from "yup";

/**
 * Common validations
 */
const validationSchemas = {
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required")
    .matches(
      /^([a-z][a-z0-9_]*|(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/,
      "Enter valid email"
    ),
  password: yup
    .string()
    // .min(8, 'Password should be of minimum 8 characters length')
    .required("Password is required"),
  fullName: yup.string().required("Full name is required"),
  search: yup.string().required("Search query is required"),
};

export default validationSchemas;
