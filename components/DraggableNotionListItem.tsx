import { RenderItemParams } from "react-native-draggable-flatlist";
import { NotionFile } from "@prisma/client/react-native";
import NotionFileItem from "./NotionFileItem";
import InnerNotionListItem from "./InnerNotionListItem";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
export { NotionFileItem, InnerNotionListItem };

const DraggableNotionListItem = ({
  drag,
  isActive,
  item,
}: RenderItemParams<NotionFile>) => {
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "light" ? Colors.light.icon : Colors.dark.icon;

  return (
    <NotionFileItem
      iconColor={iconColor}
      isActive={isActive}
      notionFile={item}
      drag={drag}
    />
  );
};

export default DraggableNotionListItem;
