import { Center, Heading, Text, VStack, Image, Stack } from "native-base";
import { ScreenHeader } from '@components/ScreenHeader';

import bicicletaImg from "@assets/bicicleta.png"

export function PreviewAD() {
  return (
    <Stack>
    <Center bg='blue.5' p={4}>
    <VStack mt={10} justifyContent='space-between'>
        <Heading ml={5} fontFamily='heading' fontSize='md' color='gray.7'>Pré visualização do anúncio</Heading>
        <Text fontFamily='body' fontSize='sm' color='gray.7'>É assim que seu produto vai aparecer!</Text>
    </VStack>
    

    </Center>
    <Image source={bicicletaImg} alt="" w='full' />
    </Stack>
  );
}
