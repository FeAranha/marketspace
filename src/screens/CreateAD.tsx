import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Pressable,
  TextArea,
  InputLeftAddon,
  Switch,
  Checkbox,
  Center,
  useToast,
} from "native-base";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ProductImg } from "@components/ProductImg";
import { ScrollView } from "react-native-virtualized-view";
import { ScreenHeader } from "@components/ScreenHeader";
import { CheckboxCircle } from "@components/CheckboxCircle";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export function CreateAD() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isSelected, setSelection] = useState(false);
  const [isNew, setisNew] = useState(false);
  const [isTraded, setisTraded] = useState(false);
  const [groupValues, setGroupValues] = useState([]);
  const [productImg, setProductImg] = useState("notnull🙄");
  const [isNewImgProduct, setIsNewImgProduct] = useState(false);
  const toast = useToast();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleProductImgSelect() {
    setIsNewImgProduct(true);

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

      if (imgSelected.assets[0].uri) {
        const imgInfo = await FileSystem.getInfoAsync(
          imgSelected.assets[0].uri
        );//⚠ size não afeta
        if (imgInfo.size && imgInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem utrapassou o limite de 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }
        setProductImg(imgSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsNewImgProduct(false);
    }
  }

  function handleCheck() {
    setSelection(!isSelected);
    setisNew(!isNew);
  }

  function goMyADs() {
    navigation.navigate("myads");
  }

  function goPreviewAD() {
    navigation.navigate("previewad");
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
        {/* TODO carrossel de imagens */}
        <HStack>
          {isNewImgProduct ? (
            <>
              <ProductImg
                size={100}
                source={{ uri: productImg }}
                alt="Imagem do produto"
              />
              <Pressable
                ml={2}
                background={productImg}
                mb={8}
                justifyContent="space-between"
                alignContent="center"
                alignItems="center"
                w={100}
                h={100}
                bg="gray.5"
                rounded={6}
                onPress={handleProductImgSelect}
              >
                <Icon
                  as={<AntDesign name="plus" />}
                  size={8}
                  color="gray.4"
                  mt={8}
                />
              </Pressable>
            </>
          ) : (
            <>
              <ProductImg
                size={100}
                source={{ uri: productImg }}
                alt="Imagem do produto"
              />
              <Pressable
                ml={2}
                background={productImg}
                mb={8}
                justifyContent="space-between"
                alignContent="center"
                alignItems="center"
                w={100}
                h={100}
                bg="gray.5"
                rounded={6}
                onPress={handleProductImgSelect}
              >
                <Icon
                  as={<AntDesign name="plus" />}
                  size={8}
                  color="gray.4"
                  mt={8}
                />
              </Pressable>
            </>
          )}
        </HStack>

        <Heading fontFamily="heading" fontSize="md" color="gray.2">
          Sobre o produto
        </Heading>
        <Input mt={4} placeholder="Título do anúncio" fontSize="md" />
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
        />
        <HStack
          alignItems="center"
          direction={{ base: "row", md: "row" }}
          justifyContent="space-between"
        >
          <HStack alignItems="center">
            <CheckboxCircle onPress={handleCheck} checked={isSelected} />
            <Text fontFamily="body" fontSize="md" color="gray.2">
              Produto novo
            </Text>
          </HStack>
          <HStack alignItems="center">
            <CheckboxCircle onPress={handleCheck} checked={!isSelected} />
            <Text fontFamily="body" fontSize="md" color="gray.2">
              Produto usado
            </Text>
          </HStack>
        </HStack>
        <Heading mt={8} fontFamily="heading" fontSize="md" color="gray.2">
          Venda
        </Heading>
        <HStack mt={4} alignItems="center">
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
            placeholder="Valor do produto"
            fontFamily="body"
            fontSize="md"
            w={{
              base: "100%",
            }}
          />
        </HStack>
        <VStack alignItems="flex-start">
          <Heading mt={4} fontFamily="heading" fontSize="sm" color="gray.2">
            Aceita troca?
          </Heading>
          <Switch size="lg" onChange={() => setisTraded(!isTraded)} />
        </VStack>
        <Heading mt={4} fontFamily="heading" fontSize="sm" color="gray.2">
          Meios de pagamento aceitos
        </Heading>

        <Checkbox.Group
          onChange={setGroupValues}
          value={groupValues}
          accessibilityLabel="choose numbers"
        >
          <Checkbox value="boleto" my={1}>
            <Text fontFamily="body" fontSize="md">
              Boleto
            </Text>
          </Checkbox>
          <Checkbox value="pix" my={1}>
            <Text fontFamily="body" fontSize="md">
              Pix
            </Text>
          </Checkbox>
          <Checkbox value="dinheiro" my={1}>
            <Text fontFamily="body" fontSize="md">
              Dinheiro
            </Text>
          </Checkbox>
          <Checkbox value="cartaoCredito" my={1}>
            <Text fontFamily="body" fontSize="md">
              Cartão de Crédito
            </Text>
          </Checkbox>
          <Checkbox value="depBancario" my={1}>
            <Text fontFamily="body" fontSize="md">
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

        <Button w={40} title="Avançar" bgColor="gray.1" onPress={goPreviewAD} />
      </HStack>
    </ScrollView>
  );
}
