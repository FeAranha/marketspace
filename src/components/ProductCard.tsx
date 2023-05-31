import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Box } from "native-base";

import BikeImg from "@assets/bicicleta.png";

import AvatarUserImg from "@assets/avatar.png";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";

type Props = TouchableOpacityProps & {
  title?: string;
  price?: string;
  used?: boolean;
  active?: boolean;
  image?: string;
  id: string;
  showProfile?: boolean;
  profileImage?: string;
};

export function ProductCard({
  title,
  price,
  used,
  active = true,
  image,
  profileImage,
  showProfile = false,
  id,
  ...rest
}: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const UserAvatar = AvatarUserImg; //API user avatar

  function handleGoAd() {
    if (showProfile) {
      navigation.navigate("addetails", { id });
    }
    navigation.navigate("myaddetails", { id });
  }

  return (
    <VStack mb={6}>
      <TouchableOpacity onPress={handleGoAd} style={{ padding: 4 }} {...rest}>
        <Image
          source={{
            uri: image,
          }}
          alt={title}
          borderWidth={1}
          borderRadius={10}
          blurRadius={active ? 0 : 10}
          h={100}
          w={40}
          rounded="md"
          resizeMode="contain"
          position="absolute"
        />
        <HStack justifyContent="space-between" flex={1} mb={20}>
          {showProfile && (
            <Image
              source={{
                uri: profileImage,
              }}
              size={6}
              alt="avatar"
            />
          )}

          {/*
          source={{
          uri: `${api.defaults.baseURL}/images/${user.avatar}`,
        }} 
        */}
          {active && (
            <Box
              mr={-7}
              h={4}
              w={10}
              alignItems="center"
              rounded="full"
              bg="blue.7"
            >
              <Text fontFamily="heading" fontSize="ss" color="white">
                {used ? "USADO" : "NOVO"}
              </Text>
            </Box>
          )}
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
