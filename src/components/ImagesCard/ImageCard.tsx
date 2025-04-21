import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import ImageCardIcon from './ImageCardIcon';

interface ImageCardProps {
  imageUrl: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl }} style={styles.image} resizeMode='cover' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#C9C6D7',
    paddingHorizontal: 10,
    width: 83,
    height: 83,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    aspectRatio: 1,
  },
});

export default ImageCard;
