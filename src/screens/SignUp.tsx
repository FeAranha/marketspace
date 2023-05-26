import {
  Center,
  Text,
  VStack,
  Heading,
  Icon,
  ScrollView,
  Image,
  HStack,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Button } from "@components/Button";
import EditButtonSVG from "@assets/buttonEdit.svg";
import userPhotoDefault from "@assets/userPhotoDefault.png";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { UserDTO } from "@dtos/UserDTO";
import { Loading } from "@components/Loading";

type userImageSelectedProps = {
  selected: boolean;
  photo: {
    uri: string;
    name: string;
    type: string;
  };
};

type FormDataProps = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  phoneNumber: yup.string().required("Informe seu número."),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere"),
});

export function SignUp() {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  
  const [userImageSelected, setUserImageSelected] = useState({
    selected: false,
  } as userImageSelectedProps);
  const toast = useToast();
  
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      password_confirm: "",
    },
    resolver: yupResolver(signUpSchema),
  });
  
  const userForm = new FormData();
  
  function handleGoBack() {
    navigation.goBack();
  }

  const { signIn } = useAuth();

  const handleUserPhotoSelect = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );
        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem utrapassou o limite de 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }
        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setUserImageSelected({
          selected: true,
          photo: { ...photoFile },
        })

        toast.show({
          title: "Foto selecionada!",
          placement: "top",
          bgColor: "green.500",
        });
      }

    } catch (error) {
      console.log(error);
      toast.show({
        title: "Erro! Tente novamente mais tarde!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleSignUp = async ({
    name,
    email,
    password,
    phoneNumber,
  }: FormDataProps) => {
    try {
      if (!userImageSelected.selected) {
        return toast.show({
          title: "Por favor selecione uma imagem!",
          placement: "top",
          bgColor: "red.500",
        })
      }

      const { name } = getValues();

      const userImage = {
        ...userImageSelected.photo,
        name: `${name}.${userImageSelected.photo.name}`.toLowerCase(),
      };

      userForm.append("avatar", userImage);
      userForm.append("name", name.toLowerCase());
      userForm.append("email", email.toLowerCase());
      userForm.append("tel", phoneNumber);
      userForm.append("password", password);

      setIsLoading(true);

      await api.post("/users", userForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      await signIn(email, password)
    }catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
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
          <Center mt={20}>
            <LogoSvg width={80} height={60} />
            <Heading my={3} fontFamily="heading" fontSize="lg" color="gray.1">
              Boas vindas!
            </Heading>
            <Text fontFamily="body" fontSize="sm" color="gray.2">
              Crie sua conta e use o espaço para comprar
            </Text>
            <Text fontFamily="body" fontSize="sm" color="gray.2">
              itens variados e vender seus produtos
            </Text>

            <HStack
              justifyContent="space-between"
              w="full"
              alignItems="flex-end"
              mb={4}
            >
              {userImageSelected.selected ? (
              <Image
                mt={8}
                ml={24}
                w="20"
                h="20"
                borderRadius="full"
                borderWidth="2"
                borderColor="blue.5"
                source={{
                  uri: userImageSelected.photo.uri,
                }}
                alt="User Image"
              />
            ) : (
              <Image ml={24} mt={8} source={userPhotoDefault} alt="User Image" />
            )}
              <TouchableOpacity onPress={handleUserPhotoSelect}>
                <EditButtonSVG />
              </TouchableOpacity>
            </HStack>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
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
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Telefone"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.phoneNumber?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
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

            <Controller
              control={control}
              name="password_confirm"
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
                  placeholder="Confirmar senha"
                  //secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />

            <Button
              title="Criar"
              bgColor="gray.1"
              mt={6}
              mb={12}
              onPress={handleSubmit(handleSignUp)}
            />

            <Text fontFamily="body" fontSize="sm" color="gray.2">
              Já tem uma conta?
            </Text>
            <Button
              my={4}
              title="Ir para o login"
              variant="solid"
              onPress={handleGoBack}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
