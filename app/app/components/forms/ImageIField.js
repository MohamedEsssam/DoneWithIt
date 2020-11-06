import React from "react";
import { useFormikContext } from "formik";

import AppListImageInput from "../AppListImageInput";
import FormErrorMessage from "./FormErrorMessage";

function AppFormImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <AppListImageInput
        images={values[name]}
        onAddImage={handleAdd}
        onRemovedImage={handleRemove}
      />
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormImagePicker;
