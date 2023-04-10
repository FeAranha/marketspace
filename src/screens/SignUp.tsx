import {
  Center,
  Text,
  VStack,
  Heading,
  Icon,
  ScrollView,
  Image,
  HStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Button } from "@components/Button";
import EditButtonSVG from "@assets/buttonEdit.svg";
import userPhotoDefault from "@assets/userPhotoDefault.png";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const [show, setShow] = useState(false);
  const navigation = useNavigation()

  function handleGoBack(){
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}
    >
      <VStack flex={1}>
        <VStack bg="gray.6" px={12} borderBottomRadius={24}>
          <Center mt={20}>
            <LogoSvg width={80} height={60} />
            <Heading my={3} fontFamily="heading" fontSize="lg" color="gray.1">
              Boas vindas!
            </Heading>
            <Text fontFamily="body" fontSize="sm" color="gray.2">
              Crie sua conta e use o espaço para comprar
            </Text>
            <Text fontFamily="body" fontSize="sm" color="gray.2">
              itens variados e vender seus produtos
            </Text>

            <HStack
              justifyContent="space-between"
              w="full"
              alignItems="flex-end"
              mb={4}
            >
              <Image
                mt={8}
                mb={4}
                ml={24}
                source={userPhotoDefault}
                alt="user photo default"
              />
              <TouchableOpacity>
                <EditButtonSVG />
              </TouchableOpacity>
            </HStack>

            <Input placeholder="Nome" />

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input placeholder="Telefone" />

            <Input
              type={show ? "text" : "password"}
              InputRightElement={
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="4"
                    color="muted.400"
                  />
                </TouchableOpacity>
              }
              placeholder="Senha"
            />

            <Input
              type={show ? "text" : "password"}
              InputRightElement={
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="4"
                    color="muted.400"
                  />
                </TouchableOpacity>
              }
              placeholder="Confirmar senha"
            />

            <Button title="Criar" bgColor='gray.1' mt={6} mb={12} />

            <Text fontFamily="body" fontSize="sm" color="gray.2">
              Já tem uma conta?
            </Text>
            <Button my={4} title="Ir para o login" variant="solid" onPress={handleGoBack}/>
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
