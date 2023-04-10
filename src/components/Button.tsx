import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase 
      w='full'
      h={10}
      bg='blue.5'
      rounded='md'
      _pressed={{
        bg: 'blue.5',
        opacity: 80
      }} 
      {...rest}
    >
    <Text
      color='gray.7'
      fontFamily='heading'
      fontSize='sm'
    >
      {title}
    </Text>
    </ButtonNativeBase>
  );
}