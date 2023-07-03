import { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-virtualized-view";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  Icon,
  Text,
  Image,
  Center,
  VStack,
  HStack,
  Switch,
  Heading,
  useToast,
  TextArea,
  useTheme,
  Checkbox,
  InputLeftAddon,
  Button as NativeButton,
} from "native-base";
import { Radio } from "@components/Radio";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { AppError } from "@utils/AppError";
import { Plus } from "phosphor-react-native";
import { IProduct } from "src/interfaces/IProduct";
import { useAuth } from "@hooks/useAuth";
import { maskedPriceToNumber, toMaskedPrice } from "@utils/Masks";
import { IPaymentMethods } from "src/interfaces/IPaymentMethods";
import { IPhoto } from "src/interfaces/IPhoto";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const createAdSchema = yup.object({
  title: yup
    .string()
    .required("Informe um título.")
    .min(2, "O título deve ter no mínimo 2 letras."),
  description: yup
    .string()
    .required("Informe uma descrição.")
    .min(1, "A descrição deve ser detalhada!"),
  price: yup.string().required("Informe um preço."),
});
type FormDataProps = {
  name: string;
  description: string;
  price: string;
};
export function CreateAD() {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethods[]>([]);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [images, setImages] = useState<IPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { colors } = useTheme();
  const toast = useToast();
  const route = useRoute();
  const [description, setDescription] = useState("");
  const params = route.params as IProduct;
  const [isNew, setIsNew] = useState<string>("");
  const [price, setPrice] = useState("");
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
    resolver: yupResolver(createAdSchema),
  });
  function handleGoBack() {
    navigation.goBack();
  }

  async function handleProductImgSelect() {
    try {
      const imgSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (imgSelected.canceled) {
        return;
      }

      if (images.length > 2) {
        throw new AppError("Só pode selecionar 3 fotos!");
      }

      if (imgSelected.assets[0].uri) {
        const imgInfo = await FileSystem.getInfoAsync(
          imgSelected.assets[0].uri
        );
        if (imgInfo.size && imgInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem utrapassou o limite de 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = imgSelected.assets[0].uri.split(".").pop();

        const imgFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri: imgSelected.assets[0].uri,
          type: `${imgSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setImages((images) => {
          return [...images, imgFile];
        });

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
  }

  function goMyADs() {
    navigation.navigate("myads");
  }

  function handlePreviewAD() {
    if (images.length === 0) {
      return toast.show({
        title: "Selecione ao menos uma imagem!",
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

    if (paymentMethods.length === 0) {
      return toast.show({
        title: "Selecione ao menos um meio de pagamento!",
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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}
    >
      <VStack flex={1} p={6} bg="gray.6">
        <Center>
          <HStack>
            <Icon
              mt={12}
              as={Feather}
              name="arrow-left"
              color="gray.1"
              size={6}
              onPress={handleGoBack}
            />
            <ScreenHeader title="Criar anúncio" variant="goback" />
          </HStack>
        </Center>

        <Heading fontFamily="heading" fontSize="md" color="gray.2">
          Imagens
        </Heading>
        <Text mb={4} fontFamily="body" fontSize="sm" color="gray.3">
          Escolha até 3 imagens para mostrar o quanto seu produto é incrível!
        </Text>

        <HStack>
          {images.length > 0 &&
            images.map((imageData) => (
              <Image
                w={88}
                h={88}
                mr={2}
                source={{
                  uri: imageData.uri,
                }}
                alt="Imagem do produto"
                resizeMode="cover"
                borderRadius={8}
                key={imageData.uri}
              />
            ))}
          {images.length < 3 && (
            <NativeButton
              bg="gray.500"
              w={88}
              h={88}
              ml={2}
              _pressed={{
                borderWidth: 1,
                bg: "gray.500",
                borderColor: "gray.400",
              }}
              onPress={handleProductImgSelect}
            >
              <Plus color={colors.gray[400]} />
            </NativeButton>
          )}
        </HStack>

        <Heading mt={4} fontFamily="heading" fontSize="md" color="gray.2">
          Sobre o produto
        </Heading>

        <Input
          mt={4}
          placeholder="Título do anúncio"
          fontSize="md"
          onChangeText={setName}
          value={name}
        />

        <TextArea
          h={160}
          placeholder="Descrição do produto"
          w="full"
          maxW="full"
          autoCompleteType={undefined}
          fontFamily="body"
          fontSize="md"
          color="gray.2"
          bg="gray.7"
          rounded={8}
          borderWidth={0}
          _focus={{
            bg: "gray.7",
            borderWidth: 1,
            borderColor: "gray.3",
          }}
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

        <Heading mt={8} fontFamily="heading" fontSize="md" color="gray.2">
          Venda
        </Heading>
        <HStack mt={4} alignItems="center">
          <Controller
            control={control}
            name="price"
            rules={{ required: "Informe o preço!" }}
            render={({ field: { onChange, value } }) => (
              <Input
                InputLeftElement={
                  <InputLeftAddon
                    children={"R$"}
                    borderWidth={0}
                    fontFamily="body"
                    fontSize="md"
                    ml={1}
                  />
                }
                onChangeText={setPrice}
                value={price}
                placeholder="Valor do produto"
                fontFamily="body"
                fontSize="md"
                w={{
                  base: "100%",
                }}
              />
            )}
          />
        </HStack>
        <VStack alignItems="flex-start">
          <Heading mt={4} fontFamily="heading" fontSize="sm" color="gray.2">
            Aceita troca?
          </Heading>
          <Switch
            m={0}
            size="lg"
            onToggle={(value) => setAcceptTrade(value)}
            value={acceptTrade}
          />
        </VStack>

        <Heading mt={4} fontFamily="heading" fontSize="sm" color="gray.2">
          Meios de pagamento aceitos
        </Heading>
        <Checkbox.Group
          onChange={(value) => setPaymentMethods(value)}
          value={paymentMethods}
          accessibilityLabel="Escolha o método de pagamento."
        >
          <Checkbox value="boleto">
            <Text color="gray.2" fontSize={16}>
              Boleto
            </Text>
          </Checkbox>
          <Checkbox value="pix">
            <Text color="gray.2" fontSize={16}>
              Pix
            </Text>
          </Checkbox>
          <Checkbox value="cash">
            <Text color="gray.2" fontSize={16}>
              Dinheiro
            </Text>
          </Checkbox>
          <Checkbox value="card">
            <Text color="gray.2" fontSize={16}>
              Cartão de Crédito
            </Text>
          </Checkbox>
          <Checkbox value="deposit">
            <Text color="gray.2" fontSize={16}>
              Depósito Bancário
            </Text>
          </Checkbox>
        </Checkbox.Group>
      </VStack>

      <HStack
        bg="gray.7"
        w="full"
        h={90}
        alignItems="center"
        p={6}
        justifyContent="space-between"
      >
        <Button w={40} title="Cancelar" variant="solid" onPress={goMyADs} />

        <Button
          isLoading={isLoading}
          w={40}
          title="Avançar"
          bgColor="gray.1"
          onPress={handlePreviewAD}
        />
      </HStack>
    </ScrollView>
  );
}

// Procurando solução
LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);
