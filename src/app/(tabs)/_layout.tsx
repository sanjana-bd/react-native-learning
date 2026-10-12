import { Tabs } from "expo-router";
import { ColorValue, Image, ImageSourcePropType, View } from "react-native";
import { TAB_SCREENS } from "@/constants/tabs";

type TabsIconProps = {
  focused: boolean;
  icon: ImageSourcePropType;
  color?: ColorValue;
};

const TabsIconLayout = ({ focused, icon, color }: TabsIconProps) => (
  <View className="items-center justify-center">
    <Image
      source={icon}
      resizeMode="contain"
      style={{
        width: 24,
        height: 24,
        tintColor: color,
      }}
    />
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      {TAB_SCREENS.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ focused, color }) => (
              <TabsIconLayout focused={focused} icon={screen.icon} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;