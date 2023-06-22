import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  HStack,
  Icon,
  Heading,
  ScrollView,
  useToast,
  VStack,
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

type RouteParams = {
  id: string;
  title: string;
  description: string;
  productImgs: any[];
  price: string;
  paymentMethods: string[];
  isNew: boolean;
  isTraded: boolean;
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
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  function handleGoBack() {
    navigation.goBack();
  }

  function goWhats() {
    //TODO function goWhats
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
        setIsLoadingDetails(false)
      }
    };
    loadData();
  }, [id]);

  if (isLoading || isLoadingDetails) {
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
            price={product.price.toString()}
            isNew={product.is_new}
            acceptTrade={product.is_traded}
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
            {/* API product price */}
            <Heading fontFamily="heading" fontSize="xl" color="blue.7">
              {product.price}
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
            onPress={goWhats}
          />
          {/* TODO 📞 goWhats */}
        </HStack>
      </VStack>
    </ScrollView>
  );
};
