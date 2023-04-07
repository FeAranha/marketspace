import { IInputProps, Input as NativeBaseInput } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="gray.7"
      h={11}
      px={12}
      borderWidth={1}
      fontFamily="body"
      fontSize="sm"
      color='gray.2'
      mb={4}
      placeholderTextColor='gray.4'
      {...rest}
    />
  );
}