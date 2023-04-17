import {
  Center,
  Heading,
  Text,
  VStack,
  Image,
  Stack,
  HStack,
  Box,
  ScrollView,
  Icon,
} from "native-base";
import AvatarImg from "@assets/avatar.png";
import bicicletaImg from "@assets/bicicleta.png";
import { Bank, Barcode, QrCode, Tag } from "phosphor-react-native";
import { AntDesign } from "@expo/vector-icons";
import { ReactElement } from "react";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export const PreviewAD = (): ReactElement => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function goCreateAD(){
    navigation.navigate('createad')
  }


  function goMyAdDetaills(){
    navigation.navigate('myaddetails')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Stack bg="gray.6">
        <Center bg="blue.5" p={4}>
          <VStack mt={10} justifyContent="space-between">
            <Heading ml={5} fontFamily="heading" fontSize="md" color="gray.7">
              Pré visualização do anúncio
            </Heading>
            <Text fontFamily="body" fontSize="sm" color="gray.7">
              É assim que seu produto vai aparecer!
            </Text>
          </VStack>
        </Center>
        <Image
          source={bicicletaImg}
          alt="foto de um bicicleta de corrida"
          w="100%"
        />
        <VStack m={6}>
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

        <HStack
        bg="gray.7"
        w="full"
        h={90}
        alignItems="center"
        p={6}
        justifyContent="space-between"
      >
        <Button
          alignItems='center'
          leftIcon={<Icon as={AntDesign} name="arrowleft" color="gray.2" size={4} />}  
          w={40}  
          title="Voltar e editar" 
          variant="solid" 
          onPress={goCreateAD} 
          />

        <Button 
          alignItems='center'
          leftIcon={<Icon mr={2} as={<Tag color='#EDECEE' size={16} />} />}  
          w={40} 
          title="Publicar" 
          onPress={goMyAdDetaills} />
      </HStack>
      
      </Stack>
    </ScrollView>
  );
};
