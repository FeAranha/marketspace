import { useState } from "react";
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
import { Tag } from "phosphor-react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { generatePaymentMethods } from "@utils/generatePaymentMethods";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { IPhoto } from "src/interfaces/IPhoto";
import { IProduct } from "src/interfaces/IProduct";
import { toMaskedPrice } from "@utils/Masks";

export function PreviewAD() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { user, fetchUserProducts } = useAuth();

  const toast = useToast();

  const route = useRoute();

  const params = route.params as IProduct & { imagesToDelete: string[] };

  const handleGoEditAd = () => {
      navigation.navigate("editad");
  };
  async function handlePublish() {
    try {
      setIsLoading(true);

      const { data } = await api.post("/products", {
        name: params.name,
        description: params.description,
        price: Number(params.price.toFixed(0)),
        payment_methods: params.payment_methods,
        is_new: params.is_new,
        accept_trade: params.accept_trade,
      });

      const formData = new FormData();
      formData.append("product_id", data.id);

      params.product_images.map((photo) => {
        formData.append("images", photo as any);
      });
      await api.post("/products/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchUserProducts();

      navigation.navigate("myaddetails", { id: data.id });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível publicar, tente novamente mais tarde";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate() {
    try {
      setIsLoading(true);

      if (params.imagesToDelete.length > 0) {
        await api.delete(`/products/images/`, {
          data: { productImagesIds: params.imagesToDelete },
        });
      }
      await api.put(`/products/${params.id}`, {
        name: params.name,
        description: params.description,
        is_new: params.is_new,
        price: Number(params.price.toFixed(0)),
        accept_trade: params.accept_trade,
        payment_methods: params.payment_methods,
      });

      let imagesToUpload = [] as IPhoto[];
      params.product_images.map((photo) => {
        if (!photo.uri.match(`${api.defaults.baseURL}/images/`)) {
          imagesToUpload = [...imagesToUpload, photo];
        }
      });
      if (imagesToUpload.length > 0) {
        const formData = new FormData();
        formData.append("product_id", params.id as string);

        imagesToUpload.map((photo) => {
          if (!photo.uri.match(`${api.defaults.baseURL}/images/`)) {
            formData.append("images", photo as any);
          }
        });
        await api.post("/products/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      await fetchUserProducts()
      navigation.navigate('myaddetails', { id: params.id as string });

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi publicado, tentar mais tarde";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const width = Dimensions.get("window").width;
console.log('id prod=>', params.id)
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
          autoPlay={params.product_images.length > 1}
          data={params.product_images}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image
              w="full"
              h={80}
              source={{
                uri: item.uri
                  ? item.uri
                  : `${api.defaults.baseURL}/images/${item.uri}`,
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
              {params.user.name}
            </Text>
          </HStack>

          <Box
            mt={6}
            h={4}
            w={12}
            alignItems="center"
            rounded="full"
            bg={params.is_new ? "blue.5" : "gray.2"}
          >
            <Text fontFamily="heading" fontSize="ss" color="white">
              {params.is_new ? "Novo" : "Usado"}
            </Text>
          </Box>

          <HStack mt={2} alignItems="center" justifyContent="space-between">
            <Heading fontFamily="heading" fontSize="lg" color="gray.1">
              {params.name}
            </Heading>
            <HStack alignItems="center">
              <Heading mr={1} fontFamily="heading" fontSize="sm" color="blue.5">
                R${""}
              </Heading>
              <Heading fontFamily="heading" fontSize="lg" color="blue.5">
              {toMaskedPrice(String(params.price))}
                {}
              </Heading>
            </HStack>
          </HStack>

          <Text mt={2} color="gray.2" fontFamily="body" fontSize="sm">
            {params.description}
          </Text>

          <HStack my={4} alignItems="center">
            <Heading fontSize="sm" fontFamily="heading" color="gray.2">
              Aceita troca?{" "}
            </Heading>
            <Text ml={2} fontSize="sm" fontFamily="body">
              {params.accept_trade ? "Sim" : "Não"}
            </Text>
          </HStack>

          {generatePaymentMethods(params.payment_methods, "#1A181B")}
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
            onPress={handleGoEditAd}
          />

          <Button
            alignItems="center"
            leftIcon={<Icon mr={2} as={<Tag color="#EDECEE" size={16} />} />}
            w={40}
            title="Publicar"
            onPress={!!params.id ? handleUpdate : handlePublish}
          />
        </HStack>
      </Stack>
    </ScrollView>
  );
};
