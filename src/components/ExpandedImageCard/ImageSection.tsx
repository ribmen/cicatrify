import { Image, StyleSheet, View } from "react-native"

interface ImageSectionProps {
  image: string;
}

export const ImageSection = ({image}: ImageSectionProps) => {
  return (
    <View style={styles.container}>
      {
        image ?
          <Image 
            source={{uri: image}}
            style={styles.image}
            resizeMode="contain"
          />
        : 
          <Image
            source={{uri:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/8f80f1478b44615b752d106008ae1efaa2e0587c?placeholderIfAbsent=true&apiKey=821418cb2ac14e9da485fa0fb89cca5b"
            }}
            style={styles.image}
            resizeMode="contain"
          />
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 6,
    borderColor: '#f1f1f1',
    minHeight: 345,
    width: '100%',
    backgroundColor: '#C9C6D7',
    overflow: 'hidden',
    aspectRatio: 3 / 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});