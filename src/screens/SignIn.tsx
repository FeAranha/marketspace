import { Center, Text, VStack, Heading } from "native-base";

import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.6" px={12}>
      <Center my={24}>
        <LogoSvg />{" "}
        <Text fontFamily="heading" fontSize='xx' color="gray.1">
          marketspace
        </Text>
        <Text fontFamily='body' fontSize='sm' color='gray.3'>Seu espaço de compra e venda</Text>

        <Text mt={20} mb={4} fontFamily='body' fontSize='sm' color='gray.2'>Acesse sua conta</Text>

        <Input placeholder="E-mail"/>
        <Input placeholder="Senha"/>

      </Center>
    </VStack>
  );
}
