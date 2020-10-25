import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import AppScreen from "../AppScreen";
import FromContainer from "./FormContainer";
import FormField from "./FormField";
import PickerField from "./PickerField";
import SubmitButton from "./SubmitButton";
import colors from "../../config/colors";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().label("Price"),
  description: Yup.string().required().label("Description"),
  category: Yup.string().required().nullable().label("Category"),
});

const categories = [
  { label: "Furniture", id: 1 },
  { label: "Clothing", id: 2 },
  { label: "Camera", id: 3 },
  { label: "Mobile", id: 4 },
];

function AppListingForm(props) {
  return (
    <AppScreen>
      <FromContainer
        initialValues={{
          title: "",
          price: "",
          category: null,
          description: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <>
          <FormField
            name="title"
            iconType="format-title"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            keyboardType="default"
            placeholder="Title"
          />
          <FormField
            name="price"
            iconType="dollar"
            width="42%"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            keyboardType="numeric"
            placeholder="Price"
          />
          <PickerField
            name="category"
            placeholder="Categories"
            items={categories}
            width="60%"
          />
          <FormField
            name="description"
            iconType="subtitles-outline"
            multiline
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            placeholder="Description"
          />
          <SubmitButton title="Post" color={colors.primary} />
        </>
      </FromContainer>
    </AppScreen>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
export default AppListingForm;
