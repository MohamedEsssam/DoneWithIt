import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import colors from "../config/colors";
import AppIcon from "./AppIcon";
import AppModel from "./AppModel";

function AppPicker({
  placeholder,
  width = "100%",
  items,
  onSelectItem,
  selectedItem,
}) {
  const [showModel, setShowModel] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setShowModel(true)}>
        <View style={[styles.container, { width }]}>
          <AppIcon
            name="apps"
            color={colors.white}
            backgroundColor={colors.primary}
          />
          <TextInput
            style={styles.textInput}
            defaultValue={selectedItem ? selectedItem : placeholder}
            editable={false}
          />
          <AppIcon
            name="chevron-down"
            color={colors.white}
            backgroundColor={colors.primary}
          />
        </View>
      </TouchableOpacity>
      <AppModel
        items={items}
        visible={showModel}
        handleClose={() => setShowModel(false)}
        handleSelect={onSelectItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    shadowColor: colors.light,
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  textInput: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
});

export default AppPicker;
