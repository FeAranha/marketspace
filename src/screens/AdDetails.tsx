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
import { Bank, Barcode, QrCode, WhatsappLogo } from "phosphor-react-native";
import { AntDesign } from "@expo/vector-icons";
import bicicletaImg from "@assets/bicicleta.png";
import AvatarImg from "@assets/avatar.png";
import { ReactElement } from "react";
import { Button } from "@components/Button";

export const AdDetails = (): ReactElement => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  function goWhats() {
    console.log('click in Buttom 📞 Entrar em contato')
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
        <VStack px={6}>
          <HStack>
            <Image mr={2} source={AvatarImg} alt="avatar" size={6} />
            <Text fontFamily="body" fontSize="sm">
              Maria Gomes
            </Text>
          </HStack>

          <Box
            mt={6}
            h={4}
            w={12}
            alignItems="center"
            rounded="full"
            bg="blue.5"
          >
            <Text fontFamily="heading" fontSize="ss" color="white">
              NOVO
            </Text>
          </Box>

          <HStack mt={2} alignItems="center" justifyContent="space-between">
            <Heading fontFamily="heading" fontSize="lg" color="gray.1">
              Bicicleta de corrida
            </Heading>
            <HStack alignItems="center">
              <Heading mr={1} fontFamily="heading" fontSize="sm" color="blue.5">
                R$
              </Heading>
              <Heading fontFamily="heading" fontSize="lg" color="blue.5">
                5.540,00
              </Heading>
            </HStack>
          </HStack>

          <Text mt={2} color="gray.2" fontFamily="body" fontSize="sm">
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
            Vitae ante leo eget maecenas urna mattis cursus.{" "}
          </Text>

          <HStack mt={8} alignItems="center">
            <Heading fontSize="sm" fontFamily="heading" color="gray.2">
              Aceita troca?
            </Heading>
            <Text ml={2} fontSize="sm" fontFamily="body">
              Sim
            </Text>
          </HStack>

          <Heading my={4} fontSize="sm" fontFamily="heading" color="gray.2">
            Meios de pagamento:
          </Heading>
          <HStack alignItems="center">
            <Barcode color="#1A181B" size={20} />
            <Text ml={2} color="gray.2" fontFamily="body" fontSize="sm">
              Boleto
            </Text>
          </HStack>
          <HStack alignItems="center">
            <QrCode color="#1A181B" size={20} />
            <Text ml={2} color="gray.2" fontFamily="body" fontSize="sm">
              Pix
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Bank color="#1A181B" size={20} />
            <Text ml={2} color="gray.2" fontFamily="body" fontSize="sm">
              Depósito Bancário
            </Text>
          </HStack>

        </VStack>

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
