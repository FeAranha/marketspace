import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";

import HomeSvg from "@assets/home.svg";
import ADSvg from "@assets/AD.svg";
import LogoffSvg from "@assets/logout.svg";


import { Home } from "@screens/Home";
import { MyADs } from "@screens/MyADs";
import { Logoff } from "@screens/Logoff";

type HomeTabsRoutes = {
  home: undefined;
  myads: undefined;
  signout: undefined;
};

export type HomeTabsNavigatorRoutesProps =  BottomTabNavigationProp<HomeTabsRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<HomeTabsRoutes>();

export function HomeTabsRoutes() {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[6];

  return(
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          height: 72,
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="myads"
        component={MyADs}
        options={{
          tabBarIcon: ({ color }) => (
            <ADSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="signout"
        component={Logoff}
        options={{
          tabBarIcon: ({ color }) => (
            <LogoffSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      </Navigator>
  )
}