import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Box } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = TouchableOpacityProps & {
  id: string;
  title: string;
  description?: string;
  productImgs?: any[];
  price: string;
  isNew: boolean;
  isTraded?: boolean;
  paymentMethods?: string[];
  isActive?: boolean;
  image: string;

  showProfile?: boolean;
  profileImage?: any;
};

export function ProductCard({
  id,
  title,
  description,
  productImgs,
  price,
  paymentMethods,
  isNew = false,
  isTraded,
  isActive = true,
  image,
  profileImage,
  showProfile = false,
  ...rest
}: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoAd() {
    if (showProfile) {
      navigation.navigate("addetails", { id });
    } else {
      navigation.navigate("myaddetails", {
        id,
        title,
        description,
        productImgs,
        price,
        paymentMethods,
        isNew,
        isTraded,
        isActive,
      });
    }
  }
  return (
    <VStack mb={6}>
      <TouchableOpacity onPress={handleGoAd} style={{ padding: 4 }} {...rest}>
        <Image
          source={{ uri: image }}
          alt={`${title}`}
          borderWidth={1}
          borderRadius={10}
          blurRadius={isActive ? 0 : 10}
          h={100}
          w={40}
          rounded="md"
          resizeMode="contain"
          position="absolute"
        />
        <HStack justifyContent="space-between" mb={20} w={152}>
          {showProfile ? (
            <Image
              source={{ uri: profileImage }}
              size={6}
              alt="avatar"
            />
          ) : (
            <Box />
          )}
          <Box
            h={4}
            w={10}
            alignItems="center"
            rounded="full"
            bg={isNew ? "blue.5" : "gray.2"}
          >
            <Text fontFamily="heading" fontSize="ss" color="white">
              {isNew ? "NOVO" : "USADO"}
            </Text>
          </Box>
        </HStack>

        {!isActive && (
          <Box alignItems="center" justifyContent="center" w={120} mb={4}>
            <Heading
              w="100%"
              textTransform="uppercase"
              color="white"
              fontSize="ss"
              position="absolute"
              zIndex={100}
              bg="gray.3"
              p={1}
              borderRadius={10}
            >
              Anúncio Desativado
            </Heading>
          </Box>
        )}

        <Text fontFamily="body" fontSize="sm">
          {title}
        </Text>
        <HStack>
          <Heading mt={1} mr={1} fontFamily="heading" fontSize="xs">
            R${" "}
          </Heading>
          <Heading fontFamily="heading" fontSize="md">
            {price}
          </Heading>
        </HStack>
      </TouchableOpacity>
    </VStack>
  );
}
