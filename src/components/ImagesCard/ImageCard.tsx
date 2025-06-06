import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImageCardIcon from './ImageCardIcon';

interface ImageCardProps {
  imageUrl: string;
  imageId: string;
  onPress: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        { imageUrl ?
            <Image 
              source={{uri: imageUrl }} 
              style={styles.image} 
              resizeMode='cover' />
          : 
            <ImageCardIcon />
        }  
      </TouchableOpacity>
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
    width: 96,
    height: 96,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    aspectRatio: 1,
  },
});

export default ImageCard;
