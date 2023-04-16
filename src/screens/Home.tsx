import { HomeHeader } from "@components/HomeHeader";
import {
  FlatList,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "native-base";
import { ScrollView } from 'react-native-virtualized-view';
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { FontAwesome } from "@expo/vector-icons";
import { Sliders } from "phosphor-react-native";
import { ProductCard } from "@components/ProductCard";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [produts, setProducts] = useState([
    "Bicicleta",
    "Sofa",
    "Tenis",
    "Armario",
    "Luminaria",
    "Bota",
    "Camisa",
  ]);

  function goMyADs(){
    navigation.navigate('myads')
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsHorizontalScrollIndicator={false}>
      <VStack flex={1} px={6} bg="gray.6">
        <HomeHeader/>

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

              <VStack>
                <Heading fontFamily="heading" fontSize="lg" color="gray.2">
                  4
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

          <Input
            mt={3}
            mb={6}
            placeholder="Buscar anúncio"
            InputRightElement={
              <HStack>
                <TouchableOpacity>
                  <Icon
                    as={<FontAwesome name="search" />}
                    size={5}
                    mr="2"
                    color="gray.2"
                  />
                </TouchableOpacity>

                <VStack borderRightWidth={0.5} bg="gray.4" mr={3} />

                <TouchableOpacity>
                  <Icon as={<Sliders />} mr="2" />
                </TouchableOpacity>
              </HStack>
            }
          />

            <FlatList
              data={produts}
              numColumns={2}
              keyExtractor={(item) => item}
              renderItem={({ item }) => <HStack w='50%' ml={1}><ProductCard /></HStack>}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{
                paddingBottom: 20,
                padding: 1.5,
              }}
            />
          </VStack>
        </VStack>
      
    </ScrollView>
  );
}
