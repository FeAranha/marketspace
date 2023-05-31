import { Text, HStack, useTheme } from "native-base";

import {
  Barcode,
  QrCode,
  Bank,
  Money,
  CreditCard,
} from "phosphor-react-native";

export const generatePaymentMethods = ( paymentMethods: string[], color:string ) => {
  return (
    <>
      {paymentMethods.includes("boleto") && (
        <HStack alignItems="center">
          <Barcode size={20} color={color} />
          <Text ml={2} color="gray.3">
            Boleto
          </Text>
        </HStack>
      )}
      {paymentMethods.includes("pix") && (
        <HStack alignItems="center">
          <QrCode size={20} color={color} />
          <Text ml={2} color="gray.3">
            Pix
          </Text>
        </HStack>
      )}
      {paymentMethods.includes("deposit") && (
        <HStack alignItems="center">
          <Bank size={20} color={color} />
          <Text ml={2} color="gray.3">
            Depósito Bancário
          </Text>
        </HStack>
      )}
      {paymentMethods.includes("cash") && (
        <HStack alignItems="center">
          <Money size={20} color={color} />
          <Text ml={2} color="gray.3">
            Dinheiro
          </Text>
        </HStack>
      )}
      {paymentMethods.includes("card") && (
        <HStack alignItems="center">
          <CreditCard size={20} color={color} />
          <Text ml={2} color="gray.3">
            Cartão de Crédito
          </Text>
        </HStack>
      )}
    </>
  );
}
