import { ReactElement, useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import bicicletaImg from "@assets/bicicleta.png";
import { Tag } from "phosphor-react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@components/Button";
import { ProductDetails } from "@components/ProductDetails";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Dimensions } from "react-native";

type RouteParams = {
  title: string;
  description: string;
  price: string;
  productImgs: any[];
  paymentMethods: string[];
  isNew: boolean;
  isTraded: boolean;
};

export const PreviewAD = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const width = Dimensions.get("window").width;

  const { user } = useAuth();

  const toast = useToast();

  const route = useRoute();
  const {
    title,
    description,
    price,
    productImgs,
    paymentMethods,
    isNew,
    isTraded,
  } = route.params as RouteParams;

  const handleGoBack = () => {
    navigation.goBack();
  };

  function goCreateAD() {
    navigation.navigate("createad");
  }

  async function handlePublish() {
    setIsLoading(true);

    try {
      const product = await api.post("/products", {
        name: title,
        description,
        price: parseInt(price.replace(/[^0-9]/g, "")),
        payment_methods: paymentMethods,
        is_new: isNew,
        is_traded: isTraded,
      });

      const imgData = new FormData();

      productImgs.forEach((item) => {
        const imgFile = {
          ...item,
          name: user.name + "." + item.name,
        } as any;

        imgData.append("images", imgFile);
      });

      imgData.append("product_id", product.data.id)

      const imgsData = await api.post("/products/images", imgData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      navigation.navigate('myaddetails', {
        id: product.data.id,
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi publicado, tentar mais tarde'

        if (isAppError) {
          toast.show({
            title,
            placement: 'top',
            bgColor: 'red.500',
          })
        }
    } finally {
      setIsLoading(false)
    }
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

        <Carousel
            loop
            width={width}
            height={320}
            autoPlay={productImgs.length > 1}
            data={productImgs}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <Image
                w="full"
                h={80}
                source={{
                  uri: item.uri
                    ? item.uri
                    : `${api.defaults.baseURL}/images/${item.path}`,
                }}
                alt="Ad Image"
                resizeMode="cover"
                borderColor="gray.400"
                borderWidth={1}
              />
            )}
          />
        
        <ProductDetails />

        <HStack
          bg="gray.7"
          w="full"
          h={90}
          alignItems="center"
          p={6}
          justifyContent="space-between"
        >
          <Button
            alignItems="center"
            leftIcon={
              <Icon as={AntDesign} name="arrowleft" color="gray.2" size={4} />
            }
            w={40}
            title="Voltar e editar"
            variant="solid"
            onPress={goCreateAD}
          />

          <Button
            alignItems="center"
            leftIcon={<Icon mr={2} as={<Tag color="#EDECEE" size={16} />} />}
            w={40}
            title="Publicar"
            onPress={handlePublish}
          />
        </HStack>
      </Stack>
    </ScrollView>
  );
};
