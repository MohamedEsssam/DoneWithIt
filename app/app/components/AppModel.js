import React from "react";
import { View, StyleSheet, Modal, FlatList, Button } from "react-native";

import AppScreen from "./AppScreen";
import PickerItem from "./PickerItem";

function AppModel({ items, visible, handleClose, handleSelect }) {
  return (
    <Modal visible={visible} animationType="slide">
      <AppScreen>
        <Button title="Close" onPress={handleClose} />
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PickerItem
              label={item.label}
              onPress={() => {
                handleSelect(item.label);
                handleClose();
              }}
            />
          )}
        />
      </AppScreen>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppModel;
