import { useTheme } from "native-base";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { CreateAD } from "@screens/CreateAD";
import { PreviewAD } from "@screens/PreviewAD";
import { AdDetails } from "@screens/AdDetails";
import { MyAdDetails } from "@screens/MyAdDetails";
import { EditAd } from "@screens/EditAd";
import { IProduct } from "src/interfaces/IProduct";
import React from "react";
import { HomeTabsRoutes } from "./home.tabs.routes";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

type AppRoutes = {
  homeTabs: undefined;
  createad: undefined | IProduct;
  previewad: IProduct & {
    imagesToDelete: string[];
  };
  addetails: {
    id: string;
  };
  myaddetails: {
    id: string;
  };
  editad: undefined | IProduct;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Screen name="homeTabs" component={HomeTabsRoutes} />

      <Screen name="createad" component={CreateAD} />
      <Screen name="previewad" component={PreviewAD} />
      <Screen name="editad" component={EditAd} />
      <Screen name="myaddetails" component={MyAdDetails} />
      <Screen name="addetails" component={AdDetails} />
    </Navigator>
  );
}
