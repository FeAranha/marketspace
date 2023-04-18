import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Box } from "native-base";

import BikeImg from "@assets/bicicleta.png";

import AvatarUserImg from "@assets/avatar.png";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = TouchableOpacityProps & {

};

export function ProductCard({ ...rest }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const UserAvatar = AvatarUserImg;

  function goAdDetails() {
    navigation.navigate("addetails");
  }

  return (
    <VStack mb={6}>
      <TouchableOpacity onPress={goAdDetails} style={{ padding: 4, }} {...rest}>
        <Image
          source={BikeImg}
          alt="Bicicleta de corrida preta com aro e guidão vermelho, ao fundo o por do sol de frente para água"
          h={100}
          w={40}
          rounded="md"
          resizeMode="contain"
          position="absolute"
        />
        <HStack justifyContent="space-between" flex={1} mb={20}>
          <Image source={UserAvatar} size={6} alt="avatar" />
          <Box mr={-7} h={4} w={10} alignItems="center" rounded="full" bg="blue.7">
            <Text fontFamily="heading" fontSize="ss" color="white">
              NOVO
            </Text>
          </Box>
        </HStack>
        <Text fontFamily="body" fontSize="sm">
          Bicicleta de corrida
        </Text>
        <HStack>
          <Heading mt={1} mr={1} fontFamily="heading" fontSize="xs">
            R$
          </Heading>
          <Heading fontFamily="heading" fontSize="md">
            5.540,00
          </Heading>
        </HStack>
      </TouchableOpacity>
    </VStack>
  );
}
