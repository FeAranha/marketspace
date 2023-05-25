import { ReactNode, createContext, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";
import { storageUserSave } from "@storage/storageUser";

export type AuthContextDataProps = {
  user: UserDTO;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  
  
async function updateUserProfile(userUpdated: UserDTO) {
  try {
    setUser(userUpdated)
    await storageUserSave(userUpdated)
  } catch (error) {
    throw error
  }
}

  return (
    <AuthContext.Provider
      value={{
        user: {
          id: "a74960d7-8b71-4d19-b482-c2e6a7f9f8ed",
          avatar: "e09dbbb58be1644d7509-3x4.png",
          name: "felipe",
          email: "felipe@rocketseat.com.br",
          tel: "1234567890",
          //updateUserProfile, 
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
