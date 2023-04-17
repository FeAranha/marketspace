import {
  CheckIcon,
  HStack,
  Heading,
  Icon,
  Select,
  Stack,
  Text,
  VStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import React from "react";
import { Input } from "@components/Input";

export function MyADs() {
  const [service, setService] = React.useState("");

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const contAD = 9;
  function goCreateAD() {
    navigation.navigate("createad");
  }

  return (
    <Stack flex={1} bg="gray.7">
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
        <HStack justifyContent="space-between">
          <Text fontSize="sm">{contAD} anúncios</Text>

          <Select
            borderWidth={1}
            borderColor='gray.4'
            height={34}
            minWidth={112}
            borderRadius={8}
            fontSize="sm"
            selectedValue={service}
            accessibilityLabel="Filtro"
            placeholder="Ativos ou Inativos"
            _selectedItem={{
              bg: "gray.7",
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(itemValue: React.SetStateAction<string>) =>
              setService(itemValue)
            }
          >
            <Select.Item label="Todos" value="all" />
            <Select.Item label="Ativos" value="active" />
            <Select.Item label="Inative" value="cross" />
          </Select>
        </HStack>
      </VStack>
    </Stack>
  );
}
