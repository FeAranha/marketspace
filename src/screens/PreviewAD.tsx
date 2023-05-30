import {
  Center,
  Heading,
  Text,
  VStack,
  Image,
  Stack,
  HStack,
  ScrollView,
  Icon,
  useToast,
} from "native-base";
import bicicletaImg from "@assets/bicicleta.png";
import { Tag } from "phosphor-react-native";
import { AntDesign } from "@expo/vector-icons";
import { ReactElement, useState } from "react";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ProductDetails } from "@components/ProductDetails";
import { useAuth } from "@hooks/useAuth";


type RouteParams = {
    title: string;
    description: string;
    price: string;
    images: any[];
    paymentMethods: string[];
    isNew: boolean;
    acceptTrade: boolean;
  };


export const PreviewAD = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { user } = useAuth();

  const toast = useToast();

  const route = useRoute();
  const {
    title,
    description,
    price,
    images,
    paymentMethods,
    isNew,
    acceptTrade,
  } = route.params as RouteParams;

  
  const handleGoBack = () => {
    navigation.goBack();
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
        <ProductDetails/>

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
          onPress={handleGoBack} 
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
