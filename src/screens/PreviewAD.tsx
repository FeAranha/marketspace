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
  Box,
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import { Tag } from "phosphor-react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Dimensions } from "react-native";
import { generatePaymentMethods } from "@utils/generatePaymentMethods";

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
        accept_trade: isTraded,
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

        <VStack m={6}>
        <HStack>
        <Image
          mr={2}
          source={{
            uri: `${api.defaults.baseURL}/images/${user.avatar}`,
          }}
          alt="avatar"
          size={6}
        />
        <Text fontFamily="body" fontSize="sm">
          {user.name}
        </Text>
      </HStack>

      <Box mt={6} h={4} w={12} alignItems="center" rounded="full" bg="blue.5">
        <Text fontFamily="heading" fontSize="ss" color="white">
          {isNew ? "Novo" : "Usado"}
        </Text>
      </Box>

      <HStack mt={2} alignItems="center" justifyContent="space-between">
        <Heading fontFamily="heading" fontSize="lg" color="gray.1">
          {title}
        </Heading>
        <HStack alignItems="center">
          <Heading mr={1} fontFamily="heading" fontSize="sm" color="blue.5">
            R${""}
          </Heading>
          <Heading fontFamily="heading" fontSize="lg" color="blue.5">
            {price}
          </Heading>
        </HStack>
      </HStack>

      <Text mt={2} color="gray.2" fontFamily="body" fontSize="sm">
        {description}
      </Text>

      <HStack my={4} alignItems="center">
        <Heading fontSize="sm" fontFamily="heading" color="gray.2">
          Aceita troca?{""}
        </Heading>
        <Text ml={2} fontSize="sm" fontFamily="body">
          {isTraded ? "Sim" : "Não"}
        </Text>
      </HStack>

      {generatePaymentMethods(paymentMethods, '#1A181B')}
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
