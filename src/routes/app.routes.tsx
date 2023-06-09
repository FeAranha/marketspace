import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { MyADs } from "@screens/MyADs";
import { Logoff } from "@screens/Logoff";
import { CreateAD } from "@screens/CreateAD";
import { PreviewAD } from "@screens/PreviewAD";
import { AdDetails } from "@screens/AdDetails"
import { MyAdDetails } from "@screens/MyAdDetails"

import HomeSvg from "@assets/home.svg"
import ADSvg from "@assets/AD.svg"
import LogoffSvg from "@assets/logout.svg"
import { useTheme } from "native-base";

type AppRoutes = {
  home: undefined;
  myads: undefined;
  logoff: undefined;
  createad: undefined;
  previewad: undefined;
  addetails: undefined;
  myaddetails: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];
  
  return (
    <Navigator screenOptions={{ 
      headerShown: false, 
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray[200],
      tabBarInactiveTintColor: colors.gray[400],
      tabBarStyle: {
        height: 72,
        backgroundColor: colors.gray[700],
        borderTopWidth: 0
      }

      }}>
      <Screen 
        name="home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color}) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize}/>
          ),
        }}  
      /> 
      <Screen 
        name="myads" 
        component={MyADs} 
        options={{
          tabBarIcon: ({ color}) => (
            <ADSvg fill={color} width={iconSize} height={iconSize}/>
          ),
        }} 
      />
      <Screen 
        name="logoff" 
        component={Logoff} 
        options={{
          tabBarIcon: ({ color}) => (
            <LogoffSvg fill={color} width={iconSize} height={iconSize}/>
          ),
        }}   
      />

      <Screen name="createad" component={CreateAD} options={{ tabBarButton: () => null }} />
      <Screen name='previewad' component={PreviewAD} options={{ tabBarButton: () => null }} />
      <Screen name='myaddetails' component={MyAdDetails} options={{ tabBarButton: () => null }} />
      <Screen name ='addetails' component={AdDetails} options={{ tabBarButton: () => null }} />
      
    </Navigator>
  );
}