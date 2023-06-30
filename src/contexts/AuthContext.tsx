import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "@storage/storageUser";

import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from "@storage/storageAuthToken";

import { api } from "@services/api";
import { IProduct } from '../interfaces/IProduct';
import { ProductMap } from '../mappers/ProductMap';
import { ProductDTO } from "@dtos/ProductDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  fetchUserProducts: () => Promise<void>;
  signIn: (email: string, password: string) => void;
  token: string;
  signOut: () => void;
  isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [token, setToken] = useState<string>("");
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  const [userProducts, setUserProducts] = useState<IProduct[]>(
    [] as IProduct[]
  );
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

  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", { email, password });
      console.log("Token=> ", data.token);
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

  async function fetchUserProducts() {
    try {
      const { data } = await api.get("/users/products");
      setUserProducts(
        data.map((item: ProductDTO) => ProductMap.toIProduct(item))
      );
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        fetchUserProducts,
        signIn,
        token,
        signOut,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
