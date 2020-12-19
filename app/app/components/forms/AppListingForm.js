import React, { useContext } from "react";
import * as Yup from "yup";
import UserContext from "../../auth/context";
import { useNavigation } from "@react-navigation/native";
import listingApi from "../../services/listings";
import imageApi from "../../services/image";

import AppScreen from "../AppScreen";
import FromContainer from "./FormContainer";
import FormField from "./FormField";
import PickerField from "./PickerField";
import SubmitButton from "./SubmitButton";
import colors from "../../config/colors";
import ImageField from "./ImageIField";

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, "You must insert at least image."),
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
  { label: "Games", id: 5 },
];

function AppListingForm(props) {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const onSubmit = async (values, { resetForm }) => {
    const { data: listing, ok: response } = await listingApi.addListing({
      ...values,
      userId: user.userId,
    });
    if (!response) return;

    const { ok } = await imageApi.PostImage(
      listing.listingId,
      values.images[0].base64
    );
    if (!ok) return console.log("error");

    navigation.navigate("Listings");

    resetForm();
  };
  return (
    <AppScreen>
      <FromContainer
        initialValues={{
          images: [],
          title: "",
          price: "",
          category: null,
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <>
          <ImageField name="images" />
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
            autoCorrect={true}
            keyboardType="default"
            placeholder="Description"
          />
          <SubmitButton title="Post" color={colors.primary} />
        </>
      </FromContainer>
    </AppScreen>
  );
}

export default AppListingForm;
