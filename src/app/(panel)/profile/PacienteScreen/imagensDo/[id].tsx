import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import GenericHeader from "@/src/components/GenericHeader";
import GalleryCard from "@/src/components/ImagesCard/GalleryCard";
import { PatientInfoCard } from "@/src/components/PatientInfoCard/PatientInfoCard";
import PlusButton from "@/src/components/PlusButton/PlusButton";
import { supabase } from "@/src/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ImageItem } from '@/src/utils/image';

interface Patient {
  name: string;
  regions: string[];
  nurse_id: string;
}

interface IndexedRegion {
  name: string;
  index: number;
}

export default function ImagesOfPatient() {
  const [loading, setLoading] = useState<boolean>(false);
  const [patientName, setPatientName] = useState<string>("");
  const [patientRegion, setPatientRegion] = useState<string>("");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [nurseId, setNurseId] = useState('');

  const { id, index } = useLocalSearchParams();
  
  async function fetchImages() {
    const { data, error } = await supabase
      .from('region_images')
      .select('*')
      .eq('patient_id', id)
      .eq('region', patientRegion)
      .order('created_at', {ascending: false});

    if (error) {
      console.error('Erro ao buscar imagens: ', error);
    } else if (data) {
      const signedImages = await Promise.all(
        data.map(async (item) => {
          const {data: signedUrlData } = await supabase
            .storage
            .from('cicatrify-images')
            .createSignedUrl(item.image_path, 60*60);

            return {
              ...item,
              image_url: signedUrlData?.signedUrl || '',
            };
        })
      );
      setImages(signedImages);
      console.log("Imagem setada!");
    }
  }

  useEffect(() => {
    if (patientRegion) {
      fetchImages();
    }
  }, [patientRegion]);

  // abre a câmera e tira a foto e salva no supabase
  async function handleNewPhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de acesso à câmera negada');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
      base64: true
    })

    if (!result.canceled) {
      const photo = result.assets[0];

      const fileName = `${Date.now()}-${photo.fileName || 'image'}.jpg`;
      const filePath = photo.uri;
      const base64 = photo.base64;
      console.log(photo.uri);

      const { data, error: uploadError } = await supabase.storage
        .from('cicatrify-images')
        .upload(fileName, decode(base64!), {
          contentType: 'image/jpeg',
          upsert: true,
        });

        if (uploadError) {
          console.error('Erro ao fazer upload no storage: ', uploadError);
          return
        }


        const { error: insertError } = await supabase
          .from('region_images')
          .insert([
            {
              patient_id: id,
              region: patientRegion,
              image_path: fileName,
              nurse_id: nurseId
            },
          ]);

        if (insertError) {
          console.error('Erro ao salvar no banco: ', insertError);
        } else {
          console.log('Imagem salva com sucesso');
          fetchImages();
        }
    }
  }

  async function fetchPatientData() {
    setLoading(true);

    if (!id) {
      setLoading(false);
      return;
    }

    const { data: patient, error } = await supabase
      .from("patients")
      .select("name, regions, nurse_id")
      .eq("id", id)
      .single<Patient>(); // Tipa o retorno com a interface `Patient`

    if (error) {
      console.error("Erro ao buscar paciente:", error);
    } else if (patient) {
      setPatientName(patient.name);
      setNurseId(patient.nurse_id);
      const indexedRegions: IndexedRegion[] = patient.regions.map((region, i) => ({
        name: region,
        index: i,
      }));

      const selectedRegion = indexedRegions.find((item) => item.index === Number(index));

      if (selectedRegion) {
        setPatientRegion(selectedRegion.name);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchPatientData();
  }, []);

  return (
    <View style={{ flexGrow: 1 }}>
      <GenericHeader hasArrowBack={true} title="Imagens" />
      <SafeAreaView style={styles.container}>
        <View style={styles.infoCards}>
          <PatientInfoCard icon="user" content={patientName} label="Paciente" />
          <PatientInfoCard icon="landPlot" content={patientRegion} label="Região" />
        </View>

        <GalleryCard images={images} />
        <PlusButton onPress={handleNewPhoto}/>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: 24,
  },

  infoCards: {
    gap: 16
  }
})
