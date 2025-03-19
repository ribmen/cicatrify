import {router, Stack} from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import  globalStyles from '@/src/constants/globalStyles'
import FontLoader from "@/src/components/FontLoader";

// verify is user isLogged
// give access to components to know isLogged

export default function RootLayout() {
  return (
    <FontLoader>
    <AuthProvider>
      <MainLayout/>
    </AuthProvider>
    </FontLoader>
  )
}

function MainLayout() {
  const { setAuth } = useAuth()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      
      if(session) {
        setAuth(session.user) // pega os dados da sessão
        router.replace('/(panel)/profile/PacientesScreen/page')
        return;
      }

      setAuth(null);
      router.replace('/(auth)/signin/LoginContainer');

    })
  }, [])

  return(
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(auth)/signin/LoginContainer"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(auth)/signup/CadastroContainer"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(panel)/profile/PacientesScreen/page"
        options={{ 
          headerShown: false
        }}
      />
      
      <Stack.Screen
        name="(panel)/profile/NovoPacienteScreen/page"
        options={{ 
          headerShown: false
        }}
      />

      <Stack.Screen
        name="(panel)/profile/PacienteScreen.tsx/page"
        options={{ 
          headerShown: false
        }}
      />

    </Stack>
  )
}