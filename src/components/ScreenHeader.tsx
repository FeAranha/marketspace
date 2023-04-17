import { Center, HStack, Heading, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = {
  title: string;
  variant?: "plus" | "goback" | "edit";
};

export function ScreenHeader({ title, variant = "plus" }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function goCreateAD() {
    navigation.navigate("createad");
  }

  function noGo() {
    return;
  }

  return (
    <HStack
      w="full"
      bg="gray.6"
      pb={6}
      pt={12}
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading 
        ml={115} 
        color="gray.1" 
        fontSize="lg" 
        fontFamily="heading">
          
        {title}
      </Heading>
      <Icon
        as={<AntDesign name={variant === "plus" ? "plus" : "edit"} />}
        size={5}
        mr="6"
        color={variant === "goback" ? "gray.6" : "gray.1"}
        onPress={variant === "goback" ? noGo : goCreateAD}
      />
    </HStack>
  );
}
