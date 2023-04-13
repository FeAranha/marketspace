import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Box } from "native-base";

import BikeImg from "@assets/bicicleta.png";

import AvatarUserImg from "@assets/avatar.png";

type Props = TouchableOpacityProps & {

};

export function ProductCard({ ...rest }: Props) {
  const UserAvatar = AvatarUserImg;
  return (
    <VStack w={155} bg="gray.6" mb={6} mr={8}>
      <TouchableOpacity style={{ padding: 4 }} {...rest}>
        <Image
          source={BikeImg}
          alt="Bicicleta de corrida preta com aro e guidão vermelho, ao fundo o por do sol de frente para água"
          w={150}
          h={100}
          rounded="md"
          resizeMode="contain"
          position="absolute"
        />
        <HStack justifyContent="space-between" mb={20}>
          <Image source={UserAvatar} size={6} alt="avatar" />
          <Box h={4} w={10} alignItems="center" rounded="full" bg="blue.7">
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
            2.800,00
          </Heading>
        </HStack>
      </TouchableOpacity>
    </VStack>
  );
}