import { Text, View, StatusBar } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

export default function App() {
  const [fontsLoader] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoader ? <Text>MARKETSPACE 💜</Text> : <View />}
    </View>
  );
}
