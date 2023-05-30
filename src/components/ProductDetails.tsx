import { HStack, Image, Text, Heading, Box, VStack } from "native-base";
import { Bank, Barcode, QrCode, Tag } from "phosphor-react-native";
import AvatarImg from "@assets/avatar.png";
import { useAuth } from "@hooks/useAuth";

export function ProductDetails() {
  const { user } = useAuth();
  return (
    <VStack m={6}>
      <HStack>
        <Image mr={2} source={AvatarImg} alt="avatar" size={6} />
        <Text fontFamily="body" fontSize="sm">
          {user.name}
        </Text>
      </HStack>

      <Box mt={6} h={4} w={12} alignItems="center" rounded="full" bg="blue.5">
        <Text fontFamily="heading" fontSize="ss" color="white">
          NOVO
        </Text>
      </Box>
      {/* API dados produto */}
      <HStack mt={2} alignItems="center" justifyContent="space-between">
        <Heading fontFamily="heading" fontSize="lg" color="gray.1">
          Bicicleta de corrida
        </Heading>
        <HStack alignItems="center">
          <Heading mr={1} fontFamily="heading" fontSize="sm" color="blue.5">
            R$
          </Heading>
          <Heading fontFamily="heading" fontSize="lg" color="blue.5">
            5.540,00
          </Heading>
        </HStack>
      </HStack>

      <Text mt={2} color="gray.2" fontFamily="body" fontSize="sm">
        Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae
        ante leo eget maecenas urna mattis cursus.{" "}
      </Text>

      <HStack mt={8} alignItems="center">
        <Heading fontSize="sm" fontFamily="heading" color="gray.2">
          Aceita troca?
        </Heading>
        <Text ml={2} fontSize="sm" fontFamily="body">
          Sim
        </Text>
      </HStack>
      {/* API meios de pagamento */}
      <Heading my={4} fontSize="sm" fontFamily="heading" color="gray.2">
        Meios de pagamento:
      </Heading>
      <HStack alignItems="center">
        <Barcode color="#1A181B" size={20} />
        <Text ml={2} color="gray.2" fontFamily="body" fontSize="sm">
          Boleto
        </Text>
      </HStack>
      <HStack alignItems="center">
        <QrCode color="#1A181B" size={20} />
        <Text ml={2} color="gray.2" fontFamily="body" fontSize="sm">
          Pix
        </Text>
      </HStack>
      <HStack alignItems="center">
        <Bank color="#1A181B" size={20} />
        <Text ml={2} color="gray.2" fontFamily="body" fontSize="sm">
          Depósito Bancário
        </Text>
      </HStack>
    </VStack>
  );
}
