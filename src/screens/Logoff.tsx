import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { Center, Text } from "native-base";

export function Logoff() {
  const { user, signOut } = useAuth()
  
  return (
    <Center flex={1}>
      <Text>Deseja sair? </Text> 
        <Button mt={4} h={10} title="SIM" onPress={signOut} />
    </Center>
  )
}
