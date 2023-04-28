import {
  FlatList,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { ProductCard } from "@components/ProductCard";

export function MyADs() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const contAD = 9;

  const items = [
    { label: "Todos", value: "all" },
    { label: "Ativo", value: "active" },
    { label: "Inativo", value: "inactive" },
  ];

  const [produts, setProducts] = useState([
    "Bicicleta",
    "Sofa",
    "Tenis",
    "Armario",
    "Luminaria",
    "Bota",
    "Camisa",
  ]);

  function goCreateAD() {
    navigation.navigate("createad");
  }

  return (
    <Stack my={8} flex={1} bg="gray.7">
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
            {contAD} anúncios
          </Text>

          <Stack w={111} >
            <DropDownPicker //⚠ DropDownPicker filtro ativo/inativo
              items={items}
              open={isOpen}
              setOpen={() => setIsOpen(!isOpen)}
              value={currentValue}
              setValue={(val) => setCurrentValue(val)}
              
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
          style={{ zIndex: -5}}
          data={produts}
          numColumns={2}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <HStack w="50%" ml={1}>
              <ProductCard />
            </HStack>
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
            padding: 1.5,
          }}
        />
      </VStack>
    </Stack>
  );
}
