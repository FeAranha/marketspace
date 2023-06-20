import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  HStack,
  Icon,
  Image,
  Stack,
  Heading,
  ScrollView,
  useToast,
  VStack,
} from "native-base";
import { User, WhatsappLogo } from "phosphor-react-native";
import { AntDesign } from "@expo/vector-icons";
import bicicletaImg from "@assets/bicicleta.png";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "@components/Button";
import { ProductDetails } from "@components/ProductDetails";
import { ProductDTO } from "@dtos/ProductDTO";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";
import { string } from "yup";

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
  const { user } = useAuth();
  const toast = useToast();

  const {
    id,
    title,
    description,
    productImgs,
    price,
    paymentMethods,
    isNew,
    isTraded,
    isActive,
  } = route.params as RouteParams;

  const [product, setProduct] = useState({} as ProductDTO);
  const [ownerAd, setOwnerAd] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true);

  function handleGoBack() {
    navigation.goBack();
  }

  function goWhats() {
    //TODO function goWhats
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await api.get(`products/${id}`)
        setProduct(productData.data)
        setOwnerAd(productData.data.user.name)
        setIsLoading(false);
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
      }
    };
    loadData();
  }, [id]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {isLoading ? (
        <Loading />
      ) : (
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
            paymentMethods={product.payment_methods}
            isActive={product.is_active}
           
          />

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
      )}
    </ScrollView>
  );
};
