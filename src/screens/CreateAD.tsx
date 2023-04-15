import { ScreenHeader } from "@components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Pressable,
  TextArea,
  InputLeftAddon,
  Switch,
  Checkbox,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "@components/Input";
import { useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { CheckboxCircle } from "@components/CheckboxCircle";
import { Button } from "@components/Button";

export function CreateAD() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isSelected, setSelection] = useState(false);
  const [isNew, setisNew] = useState(false);
  const [isTraded, setisTraded] = useState(false);
  const [groupValues, setGroupValues] = useState([]);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleCheck() {
    setSelection(!isSelected);
    setisNew(!isNew);
  }

  function goMyADs(){
    navigation.navigate('myads')
  }

  function goPreviewAD() {}

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}
    >
      <VStack flex={1} p={6} bg="gray.6">
        <HStack>
          <Icon
            mt={12}
            as={Feather}
            name="arrow-left"
            color="gray.1"
            size={6}
            onPress={handleGoBack}
          />
          <ScreenHeader title="Criar anúncio" variant="goback" />
        </HStack>
        <Heading fontFamily="heading" fontSize="md" color="gray.2">
          Imagens
        </Heading>
        <Text mb={4} fontFamily="body" fontSize="sm" color="gray.3">
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>
        <Pressable
          mb={8}
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
          w={100}
          h={100}
          bg="gray.5"
          rounded={6}
        >
          <Icon as={<AntDesign name="plus" />} size={8} color="gray.4" mt={8} />
        </Pressable>
        <Heading fontFamily="heading" fontSize="md" color="gray.2">
          Sobre o produto
        </Heading>
        <Input mt={4} placeholder="Título do anúncio" fontSize="md" />
        <TextArea
          h={160}
          placeholder="Descrição do produto"
          w="full"
          maxW="full"
          autoCompleteType={undefined}
          fontFamily="body"
          fontSize="md"
          color="gray.2"
          bg="gray.7"
          rounded={8}
          borderWidth={0}
          _focus={{
            bg: "gray.7",
            borderWidth: 1,
            borderColor: "gray.3",
          }}
        />
        <HStack
          alignItems="center"
          direction={{ base: "row", md: "row" }}
          justifyContent="space-between"
        >
          <HStack alignItems="center">
            <CheckboxCircle onPress={handleCheck} checked={isSelected} />
            <Text fontFamily="body" fontSize="md" color="gray.2">
              Produto novo
            </Text>
          </HStack>
          <HStack alignItems="center">
            <CheckboxCircle onPress={handleCheck} checked={!isSelected} />
            <Text fontFamily="body" fontSize="md" color="gray.2">
              Produto usado
            </Text>
          </HStack>
        </HStack>
        <Heading mt={8} fontFamily="heading" fontSize="md" color="gray.2">
          Venda
        </Heading>
        <HStack mt={4} alignItems="center">
          <Input
            InputLeftElement={
              <InputLeftAddon
                children={"R$"}
                borderWidth={0}
                fontFamily="body"
                fontSize="md"
                ml={1}
              />
            }
            placeholder="Valor do produto"
            fontFamily="body"
            fontSize="md"
            w={{
              base: "100%",
            }}
          />
        </HStack>
        <VStack alignItems="flex-start">
          <Heading mt={4} fontFamily="heading" fontSize="sm" color="gray.2">
            Aceita troca?
          </Heading>
          <Switch size="lg" onChange={() => setisTraded(!isTraded)} />
          {console.log("É trocavel? ", isTraded)}
        </VStack>
        <Heading mt={4} fontFamily="heading" fontSize="sm" color="gray.2">
          Meios de pagamento aceitos
        </Heading>

        <Checkbox.Group
          onChange={setGroupValues}
          value={groupValues}
          accessibilityLabel="choose numbers"
        >
          <Checkbox value="boleto" my={1}>
            <Text fontFamily="body" fontSize="md">
              Boleto
            </Text>
          </Checkbox>
          <Checkbox value="pix" my={1}>
            <Text fontFamily="body" fontSize="md">
              Pix
            </Text>
          </Checkbox>
          <Checkbox value="dinheiro" my={1}>
            <Text fontFamily="body" fontSize="md">
              Dinheiro
            </Text>
          </Checkbox>
          <Checkbox value="cartaoCredito" my={1}>
            <Text fontFamily="body" fontSize="md">
              Cartão de Crédito
            </Text>
          </Checkbox>
          <Checkbox value="depBancario" my={1}>
            <Text fontFamily="body" fontSize="md">
              Depósito Bancário
            </Text>
          </Checkbox>
        </Checkbox.Group>
      </VStack>

      <HStack
        bg="gray.7"
        w="full"
        h={90}
        alignItems="center"
        p={6}
        justifyContent="space-between"
      >
        <Button w={40}  title="Cancelar" variant="solid" onPress={goMyADs} />

        <Button w={40} title="Acançar" bgColor="gray.1" onPress={goPreviewAD} />
      </HStack>
    </ScrollView>
  );
}
