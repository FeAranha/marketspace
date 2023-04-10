import { Center, Text, VStack, Heading, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Button } from "@components/Button";

export function SignIn() {
  const [show, setShow] = useState(false);

  function handleLogon() {
    return console.log("Click on Entrar");
  }

  return (
    <VStack flex={1}>
      <VStack bg="gray.6" px={12} borderBottomRadius={24}>
        <Center mt={24}>
          <LogoSvg />{" "}
          <Heading fontFamily="heading" fontSize="xx" color="gray.1">
            marketspace
          </Heading>
          <Text fontFamily="body" fontSize="sm" color="gray.3">
            Seu espaço de compra e venda
          </Text>
          <Text
            mt={20}
            mb={4}
            fontFamily="body"
            fontSize="sm"
            color="gray.2"
          >
            Acesse sua conta
          </Text>
          <Input placeholder="E-mail" mb={4} />
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
          <Button title="Entrar" mt={8} onPress={handleLogon} mb={16} />
        </Center>
      </VStack>

      <VStack bg="gray.7" px={12}>
        <Center>
          <Text pt={16} fontFamily="body" fontSize="sm" color="gray.2">
            Ainda não tem acesso?
          </Text>
          <Button mt={4} title="Criar uma conta" variant='solid'/>
        </Center>
      </VStack>
    </VStack>
  );
}
