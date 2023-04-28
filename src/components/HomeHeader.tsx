import { Heading, HStack, Text, VStack, Image, Icon } from "native-base";
import AvatarImg from "@assets/avatar.png";
import { Button } from "./Button";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = {}

export function HomeHeader({...rest}: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  
  function goCreateAD(){
    navigation.navigate('createad')
  }
  return (
    <HStack mt={12} alignItems="center" justifyContent='space-between'>
      <Image source={AvatarImg} alt="avatar" size={45}/>
      <VStack>
        <Text fontFamily="body" fontSize="md" color="gray.1">
          Boas vindas,
        </Text>
        <Heading fontFamily="heading" fontSize="md" color="gray.1">
          {/* //API bem vindo user */}
          Maria!
        </Heading>
      </VStack>
      <Button
        leftIcon={<Icon as={AntDesign} name="plus" color="gray.7" />}
        ml={8}
        w={35}
        title="Criar anúncio"
        bgColor="gray.1"
        onPress={goCreateAD}
        {...rest}
      />
    </HStack>
  );
}
