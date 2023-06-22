import { HStack, Image, Text, Heading, Box, VStack, Stack } from "native-base";
import { Bank, Barcode, QrCode, Tag } from "phosphor-react-native";
import { useAuth } from "@hooks/useAuth";
import { generatePaymentMethods } from "@utils/generatePaymentMethods";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { api } from "@services/api";

type Props = {
  variant?: "adActive" | "adInactive";
  id: string;
  AdOwner: string;
  title: string;
  description: string;
  price: string;
  isNew: boolean;
  acceptTrade: boolean;
  productImgs: any[];
  paymentMethods: string[];

  isActive?: boolean;
  showProfile?: boolean;
  profileImage: string;
};

export function ProductDetails({
  variant,
  id,
  AdOwner,
  title,
  description,
  price,
  isNew = false,
  acceptTrade,
  productImgs,
  paymentMethods,
  isActive = true,
  profileImage,
  showProfile = false,
}: Props) {
  const { user } = useAuth();
  const width = Dimensions.get("window").width;

  return (
    <>
      <Stack m={0}>
        <Carousel
          loop
          width={width}
          height={320}
          autoPlay={productImgs.length > 1}
          data={productImgs}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image
              blurRadius={isActive ? 0 : 10}
              w="full"
              h={80}
              source={{
                uri: item.uri
                  ? item.uri
                  : `${api.defaults.baseURL}/images/${item.path}`,
              }}
              alt="Ad Image"
              resizeMode="cover"
              borderColor="gray.400"
              borderWidth={1}
            />
          )}
        />
      </Stack>
      <VStack m={6}>
        <HStack>
          <Image mr={2} source={{ uri: profileImage }} alt="avatar" size={6} />
          <Text fontFamily="body" fontSize="sm">
            {AdOwner}
          </Text>
        </HStack>

        <Box
          mt={6}
          h={4}
          w={12}
          alignItems="center"
          rounded="full"
          bg={isNew ? "blue.5" : "gray.2"}
        >
          <Text fontFamily="heading" fontSize="ss" color="white">
            {isNew ? "NOVO" : "USADO"}
          </Text>
        </Box>
        {/* API dados produto */}
        <HStack mt={2} alignItems="center" justifyContent="space-between">
          <Heading fontFamily="heading" fontSize="lg" color="gray.1">
            {title}
          </Heading>
          <HStack alignItems="center">
            <Heading mr={1} fontFamily="heading" fontSize="sm" color="blue.5">
              R${" "}
            </Heading>
            <Heading fontFamily="heading" fontSize="lg" color="blue.5">
              {price}
            </Heading>
          </HStack>
        </HStack>

        <Text mt={2} color="gray.2" fontFamily="body" fontSize="sm">
          {description}
        </Text>

        <HStack mt={8} alignItems="center">
          <Heading fontSize="sm" fontFamily="heading" color="gray.2">
            Aceita troca?{" "}
          </Heading>
          <Text ml={2} fontSize="sm" fontFamily="body">
            {acceptTrade ? "Sim" : "Não"}
          </Text>
        </HStack>

        {generatePaymentMethods(paymentMethods, "#1A181B")}
      </VStack>
    </>
  );
}
