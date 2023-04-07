import { Text, View, StatusBar } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import { NativeBaseProvider } from 'native-base';
import { Loading } from "@components/Loading";
import { THEME } from './src/theme';
import { SignIn } from "@screens/SignIn";

export default function App() {
  const [fontsLoader] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoader ? <SignIn/> : <Loading />}
    </NativeBaseProvider>
  );
}
