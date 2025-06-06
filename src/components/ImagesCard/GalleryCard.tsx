import * as React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import colors from "@/src/constants/colors";
import SearchFilterComponent from "./SearchFilter/SearchFilterComponent";
import ImageCard from "./ImageCard";

interface GalleryCardProps {
  images: {id: string; image_url: string }[];
  onImagePress: (id: string) => void;
}


const GalleryCard: React.FC<GalleryCardProps> = ({ images, onImagePress }) => {
  return (
    <View style={styles.container}>
      <SearchFilterComponent />
      <View style={styles.divider} />
      <FlatList
        data={images}
        numColumns={3}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
        <ImageCard
          imageUrl={item.image_url}
          imageId={item.id}
          onPress={() => onImagePress(item.id)}
        />
      )} 
      />
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
  grid: {
    gap: 16,
  },
  row: {
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});

export default GalleryCard;
