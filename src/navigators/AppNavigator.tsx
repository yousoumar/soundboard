import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { navigatorTheme } from "../config/navigatorTheme";
import SampleListScreen from "../features/sampler/SampleListScreen";
import SamplerScreen from "../features/sampler/SamplerScreen";

const Tab = createBottomTabNavigator();

const AppNavigator: FC = () => {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          component={SamplerScreen}
          name="Sampler"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "music-circle" : "music-circle-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          component={SampleListScreen}
          name="Samples"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "list-circle" : "list-circle-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;