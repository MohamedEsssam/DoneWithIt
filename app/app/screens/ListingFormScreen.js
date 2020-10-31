import React from "react";
import { ScrollView } from "react-native-gesture-handler";

import AppListingForm from "../components/forms/AppListingForm";
import colors from "../config/colors";

function AppListingFormScreen(props) {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.light }}
      showsVerticalScrollIndicator={false}
    >
      <AppListingForm />
    </ScrollView>
  );
}

export default AppListingFormScreen;
