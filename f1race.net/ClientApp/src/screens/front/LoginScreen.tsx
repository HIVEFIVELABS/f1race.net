// Login.jsx

import React from "react";
import SingleColumnLayout from "../../components/SingleColumnLayout.jsx";
import FormContainer from "../../components/FormContainer.jsx";
import LoginForm from "../../components/LoginForm.jsx";

const Register = () => (
  <SingleColumnLayout>
    <div className="-mx-6 sm:mx-0">
      <div className="mx-auto flex w-full flex-col sm:max-w-xl">
        <FormContainer>
          <LoginForm />
        </FormContainer>
      </div>
    </div>
  </SingleColumnLayout>
);

export default Register;
