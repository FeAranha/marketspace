import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'dark';
};

export function Button({ title, variant, ...rest }: Props) {
  return (
    <ButtonNativeBase 
      w='full'
      h={11}
      bg={variant === 'solid' ? 'gray.5' : 'blue.5'}
      rounded='md'
      _pressed={{
        bg: variant === 'solid' ? 'gray.5' : 'blue.5',
        opacity: 80
      }} 
      {...rest}
    >
    <Text
      color={variant === 'solid' ? 'gray.2' : 'gray.7' }
      fontFamily='heading'
      fontSize='sm'
    >
      {title}
    </Text>
    </ButtonNativeBase>
  );
}