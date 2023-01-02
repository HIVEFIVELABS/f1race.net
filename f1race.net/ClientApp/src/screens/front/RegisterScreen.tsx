// Register.jsx

import React from "react";
import SingleColumnLayout from "../../components/SingleColumnLayout.jsx";
import RegisterForm from "../../components/RegisterForm.jsx";
import FormContainer from "../../components/FormContainer.jsx";

const RegisterScreen = () => (
  <SingleColumnLayout>
    <div className="-mx-6 sm:mx-0">
      <div className="mx-auto flex w-full flex-col sm:max-w-xl">
        <FormContainer>
          <RegisterForm />
        </FormContainer>
      </div>
    </div>
  </SingleColumnLayout>
);

export default RegisterScreen;
