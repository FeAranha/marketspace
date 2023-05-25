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
import { Alert, TouchableOpacity } from "react-native";
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
import axios from "axios";

type FormDataProps = {
  avatar: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
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
  const { user, updateUserProfile } = useAuth();
  const toast = useToast();
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

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
        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: "Essa imagem utrapassou o limite de 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }
        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        const userPhotoUploadForm = new FormData();

        userPhotoUploadForm.append("avatar", photoFile);

        const avatarUpdatedResponse = await api.patch("/users/avatar", userPhotoUploadForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const userUpdated = user;

        userUpdated.avatar = avatarUpdatedResponse.data.avatar;

        await updateUserProfile(userUpdated);

        toast.show({
          title: "Foto atualizada!",
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }

  }

  async function handleSignUp({
    avatar,
    name,
    email,
    phone,
    password,
  }: FormDataProps) {
    try {
      const response = await api.post('/users', {name, email, password, avatar, phone });
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
    }
  }

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
              <Image
                mt={8}
                mb={4}
                ml={24}
                source={userPhotoDefault}
                alt="user photo default"
              />
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
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Telefone"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.phone?.message}
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
                  //secureTextEntry
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
