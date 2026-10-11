import { icons } from "@/constants/icons";
import { ImageSourcePropType } from "react-native";

export type TabScreenItem = {
  name: string;
  title: string;
  icon: ImageSourcePropType;
}

export const TAB_SCREENS: TabScreenItem[] = [
  {
    name: "index",
    title: "Home",
    icon: icons.homeIcon,
  },
  {
    name: "add-todo",
    title: "Add todo",
    icon: icons.plusIcon,
  },
];
