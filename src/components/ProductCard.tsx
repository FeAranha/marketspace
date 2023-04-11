import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Icon, Box } from "native-base";

import { Entypo } from "@expo/vector-icons";

import BikeImg from "@assets/bicicleta.png";

import AvatarUserImg from "@assets/avatar.png";

type Props = TouchableOpacityProps & {};

export function ProductCard({ ...rest }: Props) {
  const UserAvatar = AvatarUserImg;
  return (
    <VStack flex={1} bg="gray.600">
      <TouchableOpacity
        {...rest}
        style={{ backgroundColor: "#f1f"}}
      >
        <Image
          source={BikeImg}
          alt="Bicicleta de corrida preta com aro e guidão vermelho, ao fundo o por do sol de frente para água"
          w={150}
          h={100}
          rounded="md"
          resizeMode="contain"
          position="absolute"
          
        />

        <Image source={UserAvatar} size={6} alt="avatar"/>
        <Box bg='gray.4'>
            <Text>USADO</Text>
        </Box>

        <Text>Bicicletafff</Text>
      </TouchableOpacity>
    </VStack>
  );
}
