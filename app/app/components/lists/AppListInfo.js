import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../../config/colors";
import AppIcon from "../AppIcon";
import AppText from "../AppText";

function AppListInfo({
  image,
  title,
  subTitle,
  iconType,
  iconSize,
  iconColor,
  iconBackground,
  touchable,
  style,
  onPress,
  disabled = false,
  renderRightActions,
  renderLeftActions,
}) {
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
    >
      <TouchableOpacity
        onPress={onPress}
        underlayColor={colors.light}
        disabled={disabled}
      >
        <View style={[styles.container, style]}>
          {image && <Image source={image} style={styles.image} />}
          {iconType && (
            <AppIcon
              name={iconType}
              size={iconSize}
              backgroundColor={iconBackground}
              color={iconColor}
            />
          )}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{title}</AppText>
            {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
          </View>
          {touchable && (
            <AppIcon
              name="chevron-right"
              size={30}
              backgroundColor={colors.light}
              color={colors.white}
            />
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: colors.white,
    marginVertical: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  detailsContainer: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default AppListInfo;
