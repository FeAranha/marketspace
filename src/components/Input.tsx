import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
    <NativeBaseInput
      bg="gray.7"
      h={11}
      px={4}
      mb={4}
      borderWidth={0}
      fontFamily="body"
      fontSize="sm"
      color="gray.2"
      placeholderTextColor="gray.4"
      isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
      _focus={{
        bg: "gray.7",
        borderWidth: 1,
        borderColor: "gray.3",
      }}
      {...rest}
    />
    <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
