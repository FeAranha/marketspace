import { ScreenHeader } from "@components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  Center,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Pressable,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export function CreateAD() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <VStack flex={1} p={4} bg="gray.6">
      <HStack>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            mt={12}
            as={Feather}
            name="arrow-left"
            color="gray.1"
            size={6}
          />
        </TouchableOpacity>
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
    </VStack>
  );
}
