// registerValidation.jsx

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nickname: Yup.string()
    .required("This field is required!")
    .test(
      "len",
      "The nickname must be between 3 and 20 characters.",
      (val) => val && val.toString().length >= 3 && val.toString().length <= 20
    )
    .matches(
      "^[a-zA-Z0-9_]+$",
      "The nickname must contain only letters, numbers and underscores."
    ),
  email: Yup.string()
    .required("This field is required!")
    .email("This is not a valid email."),
  password: Yup.string()
    .required("This field is required!")
    .test(
      "len",
      "The password must be between 6 and 40 characters.",
      (val) => val && val.toString().length >= 6 && val.toString().length <= 40
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default validationSchema;
