import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  HStack,
  Icon,
  Image,
  Stack,
  Heading,
  ScrollView,
} from "native-base";
import { WhatsappLogo } from "phosphor-react-native";
import { AntDesign } from "@expo/vector-icons";
import bicicletaImg from "@assets/bicicleta.png";
import { ReactElement } from "react";
import { Button } from "@components/Button";
import { ProductDetails } from "@components/ProductDetails";

export const AdDetails = (): ReactElement => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  function goWhats() {
    
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
            onPress={handleGoBack}
          />
        </HStack>

        <Image
          source={bicicletaImg}
          alt="foto de um bicicleta de corrida"
          w="100%"
          mb={5}
        />
        <ProductDetails/>

        <HStack alignItems="center" justifyContent='space-between' h={90} bg='gray.7' w='full' mt={26} px={6}>
            <HStack alignItems="center">
              <Heading mr={1} fontFamily="heading" fontSize="sm" color="blue.7">
                R$
              </Heading>
              <Heading fontFamily="heading" fontSize="xl" color="blue.7">
                5.540,00
              </Heading>
              </HStack>

          <Button
            startIcon={
              <Icon as={<WhatsappLogo size={16} color="#EDECEE" weight="fill"/>}   />
            }
            mt={2}
            title="Entrar em contato"
            onPress={goWhats}
          />
          </HStack>
      </Stack>
    </ScrollView>
  );
};
