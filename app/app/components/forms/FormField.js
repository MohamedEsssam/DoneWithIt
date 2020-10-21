import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import FormErrorMessages from "./FormErrorMessage";

function FormField({ name, ...otherProps }) {
  const { touched, errors, setFieldTouched, handleChange } = useFormikContext();
  return (
    <>
      <AppTextInput
        {...otherProps}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
      />
      <FormErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormField;
