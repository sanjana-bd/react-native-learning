import { Tabs } from "expo-router";

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{title: 'Home'}} />
            <Tabs.Screen name="add-todo" options={{title: 'Add todo'}} />
        </Tabs>
    )
}

export default TabsLayout;