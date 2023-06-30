import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  HStack,
  Icon,
  Stack,
  useToast,
  ScrollView,
  Heading,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { ReactElement, useCallback, useState } from "react";
import { Loading } from "@components/Loading";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ProductDTO } from "../dtos/ProductDTO";
import { ProductDetails } from "@components/ProductDetails";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@components/Button";
import { Power } from "phosphor-react-native";
import { IProduct } from "src/interfaces/IProduct";
import { ProductMap } from "../mappers/ProductMap";
import { toMaskedPrice } from "@utils/Masks";

type ParamsProps = {
  id: string;
};

export const MyAdDetails = (): ReactElement => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [adActive, setAdActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const { user, fetchUserProducts } = useAuth();
  const route = useRoute();
  const toast = useToast();
  const [data, setData] = useState<IProduct>({} as IProduct);
  //const [is_active, setIs_active] = useState(true);

  const { id } = route.params as ParamsProps;

  const [product, setProduct] = useState({} as ProductDTO);
  
  const params = route.params as ParamsProps;

  const handleGoBack = useCallback(() => {
    navigation.navigate("myads");
  }, [navigation]);

  const handleGoEditAd = () => {
    navigation.navigate("editad", data)
    console.log('data for edit=> ', data,
    'id=>', data.id,
    'params ID:', params.id
    )
  };

  async function handleChangeActive() {
    try {
      await api.patch(`products/${params.id}`, {
        is_active: !adActive,
      });

      await fetchUserProducts()
      let dataState = data
      dataState.is_active = !adActive
      setData(dataState)
      setAdActive((prev) => !prev)
      toast.show({
        title: `Anúncio ${
          !adActive ? "ativado" : "desativado"
        } com sucesso!`,
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar o status do anúncio. Tente novamente mais tarde";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
      //setAdActive(false);
    }
  };

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

  async function fetchData() {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/products/${id}`);

      setData(ProductMap.toIProduct(data));
      setAdActive(data.is_active)
      console.log('myadsDetails data=> ', data,
      '----------------',
      data.id
      )
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o anúncio. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
      console.log('fix', id)
    }, [id])
  );

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
            pb={8}
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
              onPress={handleGoEditAd}
            />
          </HStack>
          {!adActive && (
            <Heading
              bg="gray.3"
              flex={1}
              textTransform="uppercase"
              color="white"
              fontSize="lg"
              position="absolute"
              zIndex={100}
              fontWeight="bold"
              textAlign="center"
              p={1}
              w={240}
              borderRadius={10}
              top="30%"
              left="20%"
            >
              ANÚNCIO DESATIVADO
            </Heading>
          )}

          {product && (
            <ProductDetails
              id={data.id}
              AdOwner={data.user.name}
              title={data.name}
              description={data.description}
              price= {toMaskedPrice(String(data.price))}
              isNew={data.is_new}
              acceptTrade={data.accept_trade}
              productImgs={data.product_images}
              paymentMethods={data.payment_methods}
              isActive={adActive}
              profileImage={`${api.defaults.baseURL}/images/${user.avatar}`}
            />
          )}
          <HStack mx={6}>
            <Button
              w="full"
              bgColor={adActive ? "gray.1" : "#647AC7"}
              startIcon={
                <Icon
                  as={<Power size={20} color="#EDECEE" weight="regular" />}
                />
              }
              mt={2}
              title={
                adActive ? "Desativar anúncio" : "Reativar anúncio"
              }
              onPress={handleChangeActive}
            />
          </HStack>
        </Stack>
      )}
    </ScrollView>
  );
};
