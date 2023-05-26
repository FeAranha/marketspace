import { ReactNode, createContext, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";
import { storageUserSave } from "@storage/storageUser";
import { storageAuthTokenSave } from "@storage/storageAuthToken";

import { api } from "@services/api";

export type AuthContextDataProps = {
  user: UserDTO;
  singIn:(email: string, password: string) => void;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
  
  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  const storageUserAndTokenSave = async (userData: UserDTO, token: string) => {
    try {
      setIsLoadingUserStorageData(true);

      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const userAndTokenUpdate = (userData: UserDTO, token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(userData);
  };

  const singIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  return (
    <AuthContext.Provider value={{user, singIn, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
