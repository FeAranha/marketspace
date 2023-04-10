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
    return console.log('Click on Entrar')
  }

  return (
    <VStack flex={1} bg="gray.6" px={12} borderBottomRadius='md'>
      <Center my={24}>

        <LogoSvg />{" "}
        <Heading fontFamily="heading" fontSize="xx" color="gray.1">
          marketspace
        </Heading>
        <Text fontFamily="body" fontSize="sm" color="gray.3">
          Seu espaço de compra e venda
        </Text>

        <Heading mt={20} mb={4} fontFamily="body" fontSize="sm" color="gray.2">
          Acesse sua conta
        </Heading>

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

        <Button
          title="Entrar"
          mt={8}
          onPress={handleLogon}
        />

      </Center> 
    </VStack>
    
  );
}
