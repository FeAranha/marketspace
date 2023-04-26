import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  Heading,
  Box,
  VStack,
  ScrollView,
} from "native-base";
import { Bank, Barcode, QrCode, Tag } from "phosphor-react-native";
import { AntDesign } from "@expo/vector-icons";
import bicicletaImg from "@assets/bicicleta.png";
import AvatarImg from "@assets/avatar.png";
import { ReactElement, useState } from "react";
import { Button } from "@components/Button";
import { ProductDetails } from "@components/ProductDetails";

export const MyAdDetails = (): ReactElement => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [adIsActive, setadIsActive] = useState(true);

  function goPreviewAD() {
    navigation.navigate("previewad");
  }

  function goCreateAD() {
    navigation.navigate("createad");
  }

  function handleDisableAD() {
    setadIsActive(false);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Stack flex={1} bg="gray.6">
        <HStack
          px={6}
          pb={4}
          pt={12}
          alignItems="center"
          justifyContent="space-between"
        >
          <Icon
            mt={2}
            as={AntDesign}
            name="arrowleft"
            color="gray.1"
            size={6}
            onPress={goPreviewAD}
          />

          <Icon
            mt={2}
            as={<AntDesign />}
            name="edit"
            color="gray.1"
            size={6}
            onPress={goCreateAD}
          />
        </HStack>

        <Image
          source={bicicletaImg}
          alt="foto de um bicicleta de corrida"
          w="100%"
          mb={5}
        />
        <ProductDetails/>
      </Stack>
    </ScrollView>
  );
};
