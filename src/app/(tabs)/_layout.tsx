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
    <View
      className={`w-11 h-11 rounded-full items-center justify-center ${
        focused ? "bg-indigo-500/20" : "bg-transparent"
      }`}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 22,
          height: 22,
          tintColor: focused ? "#818CF8" : "#94A3B8",
        }}
      />
    </View>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 24,
          left: 48,
          right: 48,
          height: 64,
          backgroundColor: "#0F172A",
          borderRadius: 32,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#0F172A",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          paddingTop: 10,
          paddingBottom: 10,
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