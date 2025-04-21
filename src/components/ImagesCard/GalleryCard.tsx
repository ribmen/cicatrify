import * as React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ImageNewCard from "./ImageCard";
import colors from "@/src/constants/colors";
import SearchFilterComponent from "./SearchFilter/SearchFilterComponent";
import ImageCard from "./ImageCard";

interface InputDesignProps {
  // Component can be extended with props in the future if needed
}

const GalleryCard: React.FC<InputDesignProps> = () => {
  return (
    <View style={styles.container}>
      <SearchFilterComponent />
      <View style={styles.divider} />
      <View style={styles.images}>
        <FlatList  renderItem={<ImageCard />}/>
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    borderRadius: 10,
    backgroundColor: colors.white,
    display: "flex",
    gap: 24,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: "column",
    overflow: "hidden",
    justifyContent: "center",
    margin: 24,
    boxShadow: "0px 2px 16px 0px rgba(191, 172, 200, 0.30)"
  },
  divider: {
    borderColor: "rgba(191, 172, 200, 0.3)",
    borderStyle: "solid",
    borderWidth: 1,
    minHeight: 1,
    width: "100%",
  },
  images: {
  }
});

export default GalleryCard;
