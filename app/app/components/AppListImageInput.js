import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

function AppListImageInput({ images = [], onRemovedImage, onAddImage }) {
  const scrollView = useRef();
  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {images.map((image) => (
            <View key={image.uri} style={styles.list}>
              <ImageInput
                imageUri={image.uri}
                onChangeImage={() => onRemovedImage(image)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(image) => onAddImage(image)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  list: {
    marginRight: 10,
  },
});

export default AppListImageInput;
