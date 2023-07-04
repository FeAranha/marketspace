import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  HStack,
  Icon,
  Heading,
  ScrollView,
  useToast,
  VStack,
  Modal,
  Input,
  KeyboardAvoidingView,
} from "native-base";
import { WhatsappLogo } from "phosphor-react-native";
import { AntDesign } from "@expo/vector-icons";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "@components/Button";
import { ProductDetails } from "@components/ProductDetails";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";
import React from "react";
import { Linking, Platform, TextInput } from "react-native";
import { toMaskedPrice } from "@utils/Masks";

type RouteParams = {
  id: string;
  title: string;
  description: string;
  productImgs: any[];
  price: string;
  paymentMethods: string[];
  isNew: boolean;
  acceptTrade: boolean;
  isActive: boolean;
};

export const AdDetails = (): ReactElement => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as RouteParams;

  const [product, setProduct] = useState({} as ProductDTO);
  const [ownerAd, setOwnerAd] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageWpp, setMessageWpp] = useState("");
  const [inputHeight, setInputHeight] = useState(40); 

  function handleGoBack() {
    navigation.goBack();
  }

  function handleInputChange(text: string) {
    setMessageWpp(text);
  }

  function goWhats() {
    const phoneNumber = product.user?.tel;

    if (phoneNumber) {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        messageWpp
      )}`;
      Linking.openURL(url);
    } else {
      toast.show({
        title: "Contato não disponível",
        placement: "top",
        bgColor: "red.500",
      });
    }
    setIsModalOpen(false);
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await api.get(`products/${id}`);
        setProduct(productData.data);
        setOwnerAd(productData.data.user.name);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError
          ? error.message
          : "Não foi possível receber os dados do anúncio. Tente Novamente!";

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
    loadData();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (id !== product.id) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack bg="gray.6">
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

        {id === product.id && (
          <ProductDetails
            AdOwner={ownerAd}
            profileImage={`${api.defaults.baseURL}/images/${product.user?.avatar}`}
            id={product.id}
            title={product.name}
            description={product.description}
            price={product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            isNew={product.is_new}
            acceptTrade={product.accept_trade}
            productImgs={product.product_images}
            paymentMethods={product.payment_methods.map((item) => item.key)}
            isActive={product.is_active}
          />
        )}

        <HStack
          alignItems="center"
          justifyContent="space-between"
          h={90}
          bg="gray.7"
          w="full"
          mt={26}
          px={6}
        >
          <HStack alignItems="center">
            <Heading mr={1} fontFamily="heading" fontSize="sm" color="blue.7">
              R$
            </Heading>

            <Heading fontFamily="heading" fontSize="xl" color="blue.7">
              {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </Heading>
          </HStack>

          <Button
            startIcon={
              <Icon
                as={<WhatsappLogo size={16} color="#EDECEE" weight="fill" />}
              />
            }
            mt={2}
            title="Entrar em contato"
            onPress={() => setIsModalOpen(true)}
          />
        </HStack>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          flex={1}
        >
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            avoidKeyboard={false}
            justifyContent="flex-start"
            top="8"
            size="full"
          >
            <Modal.Content pt={4}>
              <HStack alignItems="center">
                <Modal.CloseButton color="gray.4" />
                <Modal.Header borderBottomWidth={0}>
                  <Heading color="gray.1" fontFamily="heading" fontSize="lg">
                    Escreva algo para o anunciante:
                  </Heading>
                </Modal.Header>
              </HStack>

              <Modal.Body alignItems="center">
                <Input
                  value={messageWpp}
                  onChangeText={handleInputChange}
                  placeholder="Digite sua mensagem"
                  borderWidth={1}
                  borderColor="gray"
                  borderRadius={4}
                  p={2}
                  width="100%"
                  minHeight={inputHeight}
                  flexGrow={1}
                  multiline
                  textAlignVertical="top"
                  onContentSizeChange={
                    (event) =>
                      setInputHeight(event.nativeEvent.contentSize.height)
                  }
                />
                <Button
                  mx={6}
                  my={12}
                  onPress={goWhats}
                  title={"Enviar mensagem"}
                />
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </KeyboardAvoidingView>
      </VStack>
    </ScrollView>
  );
};
