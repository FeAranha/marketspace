import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { HStack, Icon, Stack, useToast, ScrollView } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { Loading } from "@components/Loading";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ProductDTO } from "../dtos/ProductDTO";
import { ProductDetails } from "@components/ProductDetails";
import { useAuth } from "@hooks/useAuth";

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

export const MyAdDetails = (): ReactElement => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [adActive, setAdActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const { user } = useAuth();
  const route = useRoute();
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

  const handleGoBack = useCallback(() => {
    navigation.navigate("myads");
  }, [navigation]);

  const handleGoEditAd = () => {
    // navigation.navigate("createAD", {
    //   title: product.name,
    //   description: product.description,
    //   price: product.price.toString(),
    //   images: product.product_images,
    //   paymentMethods: product.payment_methods.map((item) => item.key),
    //   isNew: product.is_new,
    //   acceptTrade: product.accept_trade,
    //   id: product.id,
    // });
  };

  const handleChangeActive = useCallback(async () => {
    try {
      setAdActive(true);
      const data = await api.patch(`products/${id}`, {
        is_active: !product.is_active,
      });

      setProduct((state) => {
        return {
          ...state,
          is_active: !state.is_active,
        };
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível deletar. Tente Novamente!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
      setAdActive(false);
    }
  }, [id, product.is_active]);

  const handleDeleteAd = useCallback(async () => {
    try {
      setIsDeletingLoading(true);
      await api.delete(`products/${id}`);

      navigation.navigate("myads");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível deletar. Tente Novamente!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    }
  }, [id, navigation]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await api.get(`products/${id}`);
        setProduct(productData.data);
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
        <Stack flex={1} bg="gray.6">
          <HStack
            h={25}
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

            <Icon
              mt={2}
              as={<AntDesign />}
              name="edit"
              color="gray.1"
              size={6}
              onPress={handleGoBack}
            />
          </HStack>
          {product && (
            <ProductDetails
              id={id}
              AdOwner={user.name}
              title={title}
              description={description}
              price={price}
              isNew={isNew}
              acceptTrade={isTraded}
              productImgs={product.product_images}
              paymentMethods={product.payment_methods.map((item) => item.key)}
              isActive={isActive}
              profileImage={`${api.defaults.baseURL}/images/${user.avatar}`}
            />
          )}
        </Stack>
      )}
    </ScrollView>
  );
};
