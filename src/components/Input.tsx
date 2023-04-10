import { IInputProps, Input as NativeBaseInput } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="gray.7"
      h={11}
      px={12}
      mb={4}
      borderWidth={0}
      fontFamily="body"
      fontSize="sm"
      color='gray.2'
      placeholderTextColor='gray.4'
      _focus={{
        bg: 'gray.7',
        borderWidth: 1,
        borderColor: 'gray.3',
      }}
      {...rest}
    />
  );
}