import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";

import {
  ScrollView,
  VStack,
  Heading,
  Text,
  HStack,
  Image,
  Button as NativeButton,
  useTheme,
  Pressable,
  Checkbox,
  Switch,
  useToast,
  Stack,
} from "native-base";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { Plus, X } from "phosphor-react-native";
import { AppError } from "@utils/AppError";

import { api } from "@services/api";
import { IProduct } from "src/interfaces/IProduct";
import { maskedPriceToNumber, toMaskedPrice } from "@utils/Masks";
import { IPaymentMethods } from "src/interfaces/IPaymentMethods";
import { IPhoto } from "src/interfaces/IPhoto";
import { useAuth } from "@hooks/useAuth";

export const EditAd = () => {
  const route = useRoute();
  const { user } = useAuth();
  const params = route.params as IProduct;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isNew, setIsNew] = useState<string>("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethods[]>([]);
  const [acceptTrade, setAcceptTrade] = useState<boolean>(false);
  const [images, setImages] = useState<IPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();

  const toast = useToast();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.navigate("myads");
  };

  function handleGoPreview() {
    if (images.length === 0) {
      return toast.show({
        title: "Selecione ao menos uma imagem!",
        placement: "top",
        bgColor: "red.500",
      });
    }

    if (paymentMethods.length === 0) {
      return toast.show({
        title: "Selecione ao menos um meio de pagamento!",
        placement: "top",
        bgColor: "red.500",
      });
    }
    const rawPrice = Number(maskedPriceToNumber(price)) * 100;

    if (price === "" || rawPrice <= 0) {
      return toast.show({
        title: "Informe o valor do seu produto.",
        placement: "top",
        bgColor: "red.500",
      });
    }

    navigation.navigate("previewad", {
      user,
      product_images: images,
      name,
      description,
      is_new: isNew === "Produto novo",
      price: rawPrice,
      accept_trade: acceptTrade,
      payment_methods: paymentMethods,
      imagesToDelete: imagesToDelete,
      id: params?.id,
      is_active: isActive,
    });
  }

  const handleAdPhotoSelect = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (images.length > 2) {
        throw new AppError("Só pode selecionar 3 fotos!");
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setImages((prevImages) => [...prevImages, photoFile]);

        toast.show({
          title: "Foto selecionada!",
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível selecionar a imagem. Tente novamente!";

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
  };

  function handleRemovePhoto(photo: IPhoto) {
    setImages((prev) =>
      prev.filter((item) => {
        if (
          item.name === photo.name &&
          photo.uri.match(`${api.defaults.baseURL}/images/`)
        ) {
          setImagesToDelete((prev) => [...prev, photo.name]);
        }
        return item.name !== photo.name;
      })
    );
  }

  useEffect(() => {
    if (params) {
      setImages(params.product_images);
      setName(params.name);
      setDescription(params.description);
      setIsNew(params.is_new ? "Produto novo" : "Produto usado");
      setPrice(toMaskedPrice(String(params.price)));
      setAcceptTrade(params.accept_trade);
      setPaymentMethods(params.payment_methods);
      setIsActive(params?.is_active ?? true);
      setImagesToDelete([]);
    }
  }, [params]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Editar Anúncio" variant="goback" />

        <VStack p={5} flex={1} alignItems="flex-start">
          <Heading color="gray.2" fontSize={18}>
            Imagens
          </Heading>
          <Text color="gray.3" fontSize={14}>
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          <HStack my={5}>
            {images.length > 0 &&
              images.map((imageData, index) => (
                <Stack key={index}>
                  <Image
                    key={index}
                    w={88}
                    h={88}
                    mr={2}
                    source={{ uri: imageData.uri }}
                    alt="Imagem do novo AD"
                    resizeMode="cover"
                    borderRadius={8}
                  />
                  <Pressable
                    w="4"
                    h="4"
                    rounded="full"
                    bg="gray.600"
                    alignItems="center"
                    justifyContent="center"
                    position="absolute"
                    top={1}
                    right={1}
                    onPress={() => handleRemovePhoto(imageData)}
                  >
                    <X size={12} color={"white"} />
                  </Pressable>
                </Stack>
              ))}

            {images.length < 3 && (
              <NativeButton
                bg="gray.5"
                w={88}
                h={88}
                ml={2}
                _pressed={{
                  borderWidth: 1,
                  bg: "gray.5",
                  borderColor: "gray.4",
                }}
                onPress={handleAdPhotoSelect}
              >
                <Plus color={colors.gray[400]} />
              </NativeButton>
            )}
          </HStack>

          <Heading color="gray.2" fontSize={18} my={2}>
            Sobre o produto
          </Heading>

          <Input placeholder="Título" onChangeText={setName} value={name} />

          <Input
            placeholder="Descrição"
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
            onChangeText={setDescription}
            value={description}
          />

          <Radio
            mt={4}
            data={["Produto novo", "Produto usado"]}
            name="Estado do produto"
            accessibilityLabel="Escolha o estado do produto"
            value={isNew}
            onChange={(newValue) => {
              setIsNew(newValue);
            }}
          />

          <Heading color="gray.2" fontSize={16} mb={2} mt={5}>
            Venda
          </Heading>

          <Input
            leftElement={
              <Text color="gray.2" fontFamily="body" fontSize="md" ml="4">
                R$
              </Text>
            }
            placeholder="Valor do produto"
            h="14"
            mb={0}
            value={price}
            onChangeText={(text) => {
              if (text === "0,0" || text === "0,") {
                setPrice("");
                return;
              }
              const firstMaskedText = toMaskedPrice(text);
              const firstMaskedTextConvertToNumber =
                maskedPriceToNumber(firstMaskedText);
              const cleanMaskedText = toMaskedPrice(
                firstMaskedTextConvertToNumber
              );
              setPrice(cleanMaskedText);
            }}
          />

          <Heading color="gray.2" fontSize={16} my={2}>
            Aceita troca?
          </Heading>

          <Switch
            size="sm"
            alignSelf="flex-start"
            offTrackColor="gray.3"
            onTrackColor="blue.5"
            isChecked={acceptTrade}
            onToggle={setAcceptTrade}
          />

          <Heading color="gray.2" fontSize={16} my={2}>
            Meios de pagamento
          </Heading>

          <Checkbox.Group onChange={setPaymentMethods} value={paymentMethods}>
            <Checkbox value="boleto">
              <Text color="gray.3" fontSize={16}>
                Boleto
              </Text>
            </Checkbox>
            <Checkbox value="pix">
              <Text color="gray.3" fontSize={16}>
                Pix
              </Text>
            </Checkbox>
            <Checkbox value="cash">
              <Text color="gray.3" fontSize={16}>
                Dinheiro
              </Text>
            </Checkbox>
            <Checkbox value="card">
              <Text color="gray.3" fontSize={16}>
                Cartão de Crédito
              </Text>
            </Checkbox>
            <Checkbox value="deposit">
              <Text color="gray.3" fontSize={16}>
                Depósito Bancário
              </Text>
            </Checkbox>
          </Checkbox.Group>
        </VStack>
      </ScrollView>
      <HStack
        w="full"
        py={2}
        px={5}
        bg="white"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="solid"
          title="Cancelar"
          alignItems="center"
          justifyContent="center"
          w="47%"
          h={12}
          onPress={handleGoBack}
        />
        <Button
          title="Avançar"
          alignItems="center"
          justifyContent="center"
          w="47%"
          h={12}
          onPress={handleGoPreview}
        />
      </HStack>
    </>
  );
};

// Procurando solução
LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);
