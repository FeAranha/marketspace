import { useState } from "react";
import { LogBox } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
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
  Radio,
} from "native-base";

import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { AppError } from "@utils/AppError";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Plus } from "phosphor-react-native";

const createAdSchema = yup.object({
  title: yup
    .string()
    .required("Informe um título.")
    .min(2, "O título deve ter no mínimo 2 letras."),
  description: yup
    .string()
    .required("Informe uma descrição.")
    .min(12, "A descrição deve ser detalhada!"),
  price: yup.string().required("Informe um preço."),
});

type FormDataProps = {
  title: string;
  description: string;
  price: string;
};

export function CreateAD() {
  const [isNew, setIsNew] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [isTraded, setisTraded] = useState(false);
  const [productImgs, setProductImg] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { colors } = useTheme();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      title: "",
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

      if (productImgs.length > 2) {
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

        setProductImg((productImgs) => {
          return [...productImgs, imgFile];
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

  function handlePreviewAD({ title, description, price }: FormDataProps) {
    if (productImgs.length === 0) {
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

    navigation.navigate("previewad", {
      title,
      description,
      productImgs,
      price,
      paymentMethods,
      isNew,
      isTraded,
    });
  }

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
          {productImgs.length > 0 &&
            productImgs.map((imageData) => (
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
          {productImgs.length < 3 && (
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

        <Controller
          control={control}
          name="title"
          rules={{ required: "Informe o título" }}
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              placeholder="Título do anúncio"
              fontSize="md"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.title?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{ required: "Informe a descrição" }}
          render={({ field: { onChange, value } }) => (
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
              onChangeText={onChange}
              value={value}
              //errorMessage={errors.description?.message}
            />
          )}
        />

        <Radio.Group
          name="productCondition"
          value={isNew ? "new" : "used"}
          onChange={(nextValue) => {
            setIsNew(nextValue === "new" ? true : false);
          }}
        >
          <HStack>
            <Radio value="new" my="2" size="sm">
              <Text color="gray.2" fontSize={14}>
                Produto novo
              </Text>
            </Radio>
            <Radio value="used" my="2" ml={5} size="sm">
              <Text color="gray.2" fontSize={14}>
                Produto usado
              </Text>
            </Radio>
          </HStack>
        </Radio.Group>

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
                onChangeText={onChange}
                value={value}
                errorMessage={errors.price?.message}
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
            onToggle={(value) => setisTraded(value)}
            value={isTraded}
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
            <Text color="gray.300" fontSize={16}>
              Boleto
            </Text>
          </Checkbox>
          <Checkbox value="pix">
            <Text color="gray.300" fontSize={16}>
              Pix
            </Text>
          </Checkbox>
          <Checkbox value="cash">
            <Text color="gray.300" fontSize={16}>
              Dinheiro
            </Text>
          </Checkbox>
          <Checkbox value="card">
            <Text color="gray.300" fontSize={16}>
              Cartão de Crédito
            </Text>
          </Checkbox>
          <Checkbox value="deposit">
            <Text color="gray.300" fontSize={16}>
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
          onPress={handleSubmit(handlePreviewAD)}
        />
      </HStack>
    </ScrollView>
  );
}

// Procurando solução
LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);
