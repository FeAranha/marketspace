import { HStack, Image, Text, Heading, Box, VStack } from "native-base";
import { Bank, Barcode, QrCode, Tag } from "phosphor-react-native";
import { useAuth } from "@hooks/useAuth";
import { generatePaymentMethods } from "@utils/generatePaymentMethods";

type Props = {
  variant?: "adActive" | "adInactive";
  id?: string;
  title: string;
  description: string;
  price: string;
  isNew: boolean;
  acceptTrade: boolean;
  productImgs?: any[];
  paymentMethods?: any[];
  
  isActive?: boolean;
  showProfile?: boolean;
  profileImage?: string;
};

export function ProductDetails({
  variant,
  id,
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

  return (
    <VStack m={6}>
      <HStack>
        <Image mr={2} source={{uri: profileImage }} alt="avatar" size={6} />
        <Text fontFamily="body" fontSize="sm">
          {user.name}
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
            R${' '}
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
          Aceita troca?{' '}
        </Heading>
        <Text ml={2} fontSize="sm" fontFamily="body">
          {acceptTrade ? 'Sim' : 'Não' }
        </Text>
      </HStack>
      
      {/* {generatePaymentMethods(paymentMethods, '#1A181B')} */}
      
    </VStack>
  );
}
