import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import FormErrorMessage from "./FormErrorMessage";

function PickerField({ name, placeholder, items, width }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        placeholder={placeholder}
        width={width}
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
      />
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default PickerField;
