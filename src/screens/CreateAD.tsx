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
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "@components/Input";
import { useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { Checkbox } from "@components/Checkbox";

export function CreateAD() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isSelected, setSelection] = useState(false);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleCheck() {
    setSelection(!isSelected);
    console.log('=> ',isSelected)

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
          <HStack alignItems='center'>
          <Checkbox onPress={handleCheck} checked={!isSelected} />
          {console.log()}
          <Text fontFamily="body" fontSize="md" color="gray.2">
            Produto novo
          </Text>
          </HStack>
          <HStack alignItems='center'>
          <Checkbox onPress={handleCheck} checked={isSelected} />
          <Text fontFamily="body" fontSize="md" color="gray.2">
            Produto usado
          </Text>
          </HStack>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
