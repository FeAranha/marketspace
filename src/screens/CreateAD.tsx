import { ScreenHeader } from "@components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Pressable,
  TextArea,
  Checkbox,
  Stack,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "@components/Input";
import { useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { CheckCircle, Circle } from "phosphor-react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function CreateAD() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [textAreaValue, setTextAreaValue] = useState("Value Controlled");

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}
    >
      <VStack flex={1} p={6} bg="gray.6">
        <HStack>
          <Icon
            mt={12}
            as={Feather}
            name="arrow-left"
            color="gray.1"
            size={6}
            onPress={handleGoBack}
          />
          <ScreenHeader title="Criar anúncio" variant="goback" />
        </HStack>
        <Heading fontFamily="heading" fontSize="md" color="gray.2">
          Imagens
        </Heading>
        <Text mb={4} fontFamily="body" fontSize="sm" color="gray.3">
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>

        <Pressable
          mb={8}
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
          w={100}
          h={100}
          bg="gray.5"
          rounded={6}
        >
          <Icon as={<AntDesign name="plus" />} size={8} color="gray.4" mt={8} />
        </Pressable>

        <Heading fontFamily="heading" fontSize="md" color="gray.2">
          Sobre o produto
        </Heading>

        <Input mt={4} placeholder="Título do anúncio" fontSize="md" />

        <TextArea
          h={160}
          placeholder="Descrição do produto"
          w="full"
          maxW="full"
          autoCompleteType={undefined}
          fontFamily="body"
          fontSize="md"
          color="gray.2"
          bg="gray.7"
          rounded={8}
          borderWidth={0}
          _focus={{
            bg: "gray.7",
            borderWidth: 1,
            borderColor: "gray.3",
          }}
        />

        <HStack
          alignItems="center"
          direction={{ base: "row", md: "row" }}
          justifyContent="space-between"
        >
          <Checkbox
            value="newProduct"
            colorScheme="gray.6"
            size="md"
            icon={<Icon as={<Circle color="#9F9BA1" />} />}
            defaultIsChecked
            _checked={{
              icon: <CheckCircle />,
              bg: "#000",
            }}
          >
            <Text fontFamily="body" fontSize="md" color="gray.2">
              Produto novo
            </Text>
          </Checkbox>
          <Checkbox
            value="newProduct"
            colorScheme="gray.6"
            size="md"
            icon={
              <Icon
                as={<MaterialCommunityIcons name="check-circle" color="#9F9BA1" />}
              />
            }
            defaultIsChecked
             _checked={{
               icon: <MaterialCommunityIcons name="check"/>
             }}
          >
            <Text fontFamily="body" fontSize="md" color="gray.2">
              Produto usado
            </Text>
          </Checkbox>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
