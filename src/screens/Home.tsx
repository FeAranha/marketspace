import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Button,
  FlatList,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Modal,
  Switch,
  Checkbox,
  useToast,
} from "native-base";
import { ScrollView } from "react-native-virtualized-view";

import { FontAwesome, Octicons, AntDesign } from "@expo/vector-icons";
import { Sliders, XCircle } from "phosphor-react-native";

import { Input } from "@components/Input";
import { HomeHeader } from "@components/HomeHeader";
import { ProductCard } from "@components/ProductCard";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchAd, setSearchAd] = useState("");
  const [groupValues, setGroupValues] = useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isTraded, setisTraded] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isNew, setisNew] = useState(true);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [numberOfAds, setNumberOfAds] = useState(0);

  const toast = useToast();

  function goMyADs() {
    navigation.navigate("myads");
  }

  function handleCheck() {
    setisNew(!isNew);
  }

  function handleSearch() {
    console.log("searchAD:", searchAd);
  }

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const productsData = await api.get("/users/products");
          const generalProductsData = await api.get("/products");

          setProducts(generalProductsData.data);
          setNumberOfAds(productsData.data.length);
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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={6} bg="gray.6">
          <HomeHeader />

          <VStack my={8}>
            <Text mb={3}>Seus produtos anunciados para venda </Text>

            <TouchableOpacity onPress={goMyADs}>
              <HStack
                alignItems="center"
                background="blue.55"
                rounded="md"
                p={4}
                justifyContent="space-between"
              >
                <Icon as={<Octicons name="tag" />} size={6} color="blue.7" />
                {/* API count AD ativos */}
                <VStack>
                  <Heading fontFamily="heading" fontSize="lg" color="gray.2">
                    {numberOfAds}
                  </Heading>
                  <Text mr={12} fontFamily="body" fontSize="xs" color="gray.2">
                    anúncios ativos
                  </Text>
                </VStack>

                <Heading fontFamily="heading" fontSize="xs" color="blue.7">
                  Meus anúncios
                </Heading>
                <Icon
                  as={<AntDesign name="arrowright" />}
                  size={5}
                  color="blue.7"
                />
              </HStack>
            </TouchableOpacity>

            <Text mt={8} fontFamily="body" fontSize="sm" color="gray.3">
              Compre produtos variados
            </Text>

            <Modal
              isOpen={modalVisible}
              onClose={() => setModalVisible(false)}
              avoidKeyboard
              justifyContent="flex-end"
              bottom="4"
              size="full"
            >
              <Modal.Content pt={4}>
                <HStack alignItems="center">
                  <Modal.CloseButton color="gray.4" />
                  <Modal.Header borderBottomWidth={0}>
                    <Heading color="gray.1" fontFamily="heading" fontSize="lg">
                      Filtrar anúncios
                    </Heading>
                  </Modal.Header>
                </HStack>

                <Modal.Body alignItems="flex-start">
                  <HStack>
                    {isNew ? (
                      <Button
                        endIcon={
                          <Icon
                            as={
                              <XCircle
                                size={16}
                                color="#EDECEE"
                                weight="fill"
                              />
                            }
                            onPress={handleCheck}
                          />
                        }
                        h={7}
                        mr={2}
                        onPress={handleCheck}
                        bg="blue.5"
                        rounded="3xl"
                        _pressed={{
                          bg: "blue.5",
                        }}
                      >
                        <Text my={-2} color="gray.7">
                          Novo
                        </Text>
                      </Button>
                    ) : (
                      <Button
                        h={7}
                        mr={2}
                        onPress={handleCheck}
                        rounded="3xl"
                        bg="gray.5"
                        _pressed={{
                          bg: "gray.5",
                        }}
                      >
                        <Text my={-2} color="gray.7">
                          Novo
                        </Text>
                      </Button>
                    )}
                    {!isNew ? (
                      <Button
                        h={7}
                        mr={2}
                        onPress={handleCheck}
                        bg="blue.5"
                        rounded="3xl"
                        _pressed={{
                          bg: "blue.5",
                        }}
                      >
                        <Text my={-2} color="gray.7">
                          Usado
                        </Text>
                      </Button>
                    ) : (
                      <Button
                        h={7}
                        mr={2}
                        onPress={handleCheck}
                        bg="gray.5"
                        rounded="3xl"
                        _pressed={{
                          bg: "gray.5",
                        }}
                      >
                        <Text my={-2} color="gray.7">
                          Usado
                        </Text>
                      </Button>
                    )}
                  </HStack>

                  <Heading
                    mt={4}
                    color="gray.1"
                    fontFamily="heading"
                    fontSize="sm"
                  >
                    Aceita troca
                  </Heading>
                  <Switch
                    mt={-2}
                    size="lg"
                    onChange={() => setisTraded(!isTraded)}
                  />
                  {/* ⚛ Meios Pag */}
                  <Heading
                    mt={2}
                    fontFamily="heading"
                    fontSize="sm"
                    color="gray.2"
                  >
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
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    flex="1"
                    onPress={() => {
                      setModalVisible(false);
                      console.log(
                        "filtro => ",
                        "Novo:",
                        isNew,
                        ", Trocavél:",
                        isTraded,
                        ", Meios de pagamentos: ",
                        groupValues,
                        "Buscar anúncio por: ",
                        searchAd
                      );
                    }}
                  >
                    {/* TODO filtro: terminar Bottom */}
                    Aplicar filtro
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>

            <Input
              onChangeText={setSearchAd}
              value={searchAd}
              mt={3}
              mb={6}
              placeholder="Buscar anúncio"
              InputRightElement={
                <HStack>
                  <TouchableOpacity onPress={handleSearch}>
                    <Icon
                      as={<FontAwesome name="search" />}
                      size={5}
                      mr="2"
                      color="gray.2"
                    />
                  </TouchableOpacity>

                  <VStack borderRightWidth={0.5} bg="gray.4" mr={3} />

                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Icon as={<Sliders />} mr="2" />
                  </TouchableOpacity>
                </HStack>
              }
            />

            <FlatList
              data={products}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <HStack w="50%" ml={1}> 
                  <ProductCard
                    id={item.id}
                    image={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
                    price={item.price
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                    isNew={item.is_new}
                    title={item.name}
                    showProfile
                    profileImage={`${api.defaults.baseURL}/images/${item.user?.avatar}`}
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
        </VStack>
      )}
    </ScrollView>
  );
}
