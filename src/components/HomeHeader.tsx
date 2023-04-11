import { Heading, HStack, Text, VStack, Image, Icon } from "native-base";
import AvatarImg from "@assets/avatar.png";
import { Button } from "./Button";
import { AntDesign } from '@expo/vector-icons';

export function HomeHeader() {
  return (
    <HStack px={6} mt={12} alignItems="center" justifyContent="space-between">
      <Image mr={4} source={AvatarImg}  alt="avatar"/>
      <VStack>
        <Text fontFamily="body" fontSize="md" color="gray.1">
          Boas vindas,
        </Text>
        <Heading fontFamily="heading" fontSize="md" color="gray.1">
          Maria!
        </Heading>
      </VStack>
      <Button leftIcon={<Icon as={AntDesign} name='plus' color='gray.7'/>} ml={12} w={35} title="Criar anúncio" bgColor="gray.1" />
    </HStack>
  );
}
