import { 
  Animated, 
  Dimensions, 
  Easing, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Keyboard 
} from "react-native";
import { ImageSection } from "./ImageSection";
import { DescriptionSection } from "./DescriptionSection";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { BlurView } from 'expo-blur';
import colors from "@/src/constants/colors";
import { supabase } from "@/src/lib/supabase";

interface ExpandedImageCardProps {
  image: string;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const ExpandedImageCard = ({ image, onClose }: ExpandedImageCardProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const [imageDate, setImageDate] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      onClose();
    });
  };

  const fetchImageInfo = async () => {
    const { data, error} = await supabase
      .from('region_images')
      .select('created_at, comment')
      .eq('image_url', image);
    if (error) {
      console.log('Erro ao buscar data e comentário', error);
    } else if (data) {
      
    }
  }

  return (
    <Animated.View style={[styles.overlay, {opacity: fadeAnim}]}>
      <TouchableWithoutFeedback onPress={handleClose}>
      <BlurView intensity={10} tint="dark" style={StyleSheet.absoluteFill} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.container, { transform: [{scale: scaleAnim }] }]}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color="red" />
        </TouchableOpacity>

        <ImageSection image={image} />
        <DescriptionSection photoDate={""} photoDescription={""} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: -140, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 999,
  },
  container: {
    maxWidth: 345,
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 0,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 16,
    padding: 4,
  },
});

export default ExpandedImageCard;
