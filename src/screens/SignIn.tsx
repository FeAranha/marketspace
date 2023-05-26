import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

import {
  Center,
  Text,
  VStack,
  Heading,
  Icon,
  ScrollView,
  useToast,
} from "native-base";

import { MaterialIcons } from "@expo/vector-icons";
import LogoSvg from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
});

export function SignIn() {
  const [show, setShow] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const { signIn } = useAuth();

  const toast = useToast();

  const handleSignIn = async ({ email, password }: FormDataProps) => {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não possível foi entrar. Por favor tente novamente mais tarde.";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}
    >
      <VStack flex={1}>
        <VStack bg="gray.6" px={12} borderBottomRadius={24}>
          <Center mt={24}>
            <LogoSvg />
            <Heading fontFamily="heading" fontSize="xx" color="gray.1">
              marketspace
            </Heading>
            <Text fontFamily="body" fontSize="sm" color="gray.3">
              Seu espaço de compra e venda
            </Text>

            <Text mt={20} mb={4} fontFamily="body" fontSize="sm" color="gray.2">
              Acesse sua conta
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Informe o e-mail" }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{ required: "Informe a senha" }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={show ? "text" : "password"}
                  InputRightElement={
                    <TouchableOpacity onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="4"
                        color="muted.400"
                      />
                    </TouchableOpacity>
                  }
                  placeholder="Senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              title="Entrar"
              mt={8}
              mb={16}
              isLoading={isLoading}
              onPress={handleSubmit(handleSignIn)}
            />
          </Center>
        </VStack>

        <VStack bg="gray.7" px={12} mb={10}>
          <Center>
            <Text pt={16} fontFamily="body" fontSize="sm" color="gray.2">
              Ainda não tem acesso?
            </Text>
            <Button
              mt={4}
              title="Criar uma conta"
              variant="solid"
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
