import {
  FlatList,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
  useToast,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import React, { useState, useCallback } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { ProductCard } from "@components/ProductCard";
import { ProductDTO } from "@dtos/ProductDTO";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { Loading } from "@components/Loading";

export function MyADs() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [filterIsOpen, setFilterIsOpen] = React.useState(false);
  const [adType, setAdType] = useState("all");

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  const items = [
    { label: "Todos", value: "all" },
    { label: "Ativo", value: "active" },
    { label: "Inativo", value: "inactive" },
  ];

  const filter = adType === "active" ? true : false;
  const productsByFilter = products.filter((product) => {
    if (adType === "all") {
      return true;
    }

    return product.is_active === filter;
  });

  function goCreateAD() {
    navigation.navigate("createad");
  }

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const productsData = await api.get(`/users/products`);

          setProducts(productsData.data);
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError
            ? error.message
            : "Não foi possível receber seus anúncios. Tente Novamente!";

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
    }, [])
  );

  return (
    <Stack my={8} flex={1} bg="gray.7">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HStack
            w="full"
            pb={2}
            pt={12}
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading ml={115} color="gray.1" fontSize="lg" fontFamily="heading">
              Meus anúncios
            </Heading>
            <Icon
              as={<AntDesign name="plus" />}
              size={5}
              mr="6"
              color="gray.1"
              onPress={goCreateAD}
            />
          </HStack>

          <VStack p={6}>
            <HStack justifyContent="space-between" mb={4}>
              <Text fontSize="md" color="gray.3">
                {products.length} anúncios
              </Text>

              <Stack w={111}>
                <DropDownPicker
                  items={items}
                  open={filterIsOpen}
                  setOpen={() => setFilterIsOpen(!filterIsOpen)}
                  value={adType}
                  setValue={(type) => setAdType(type)}
                  placeholder="Filtro"
                  selectedItemLabelStyle={{
                    color: "#1A181B",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                  maxHeight={120}
                  disableBorderRadius={false}
                  showTickIcon={false}
                  style={{ borderColor: "#D9D8DA" }}
                />
              </Stack>
            </HStack>

            <FlatList
              style={{ zIndex: -5 }}
              data={productsByFilter}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <HStack w="50%" ml={1}>
                  <ProductCard 
                    id={item.id}
                  />
                </HStack>
              )}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{
                paddingBottom: 20,
                padding: 1.5,
              }}
            />
          </VStack>
        </>
      )}
    </Stack>
  );
}
