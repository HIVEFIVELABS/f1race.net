// loginValidation.jsx

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("This field is required!")
    .email("This is not a valid email."),
  password: Yup.string()
    .required("This field is required!")
    .test(
      "len",
      "The password must be between 6 and 40 characters.",
      (val) =>
        val && val.toString().length >= 6 && val.toString().length <= 40
    )
});

export default validationSchema;