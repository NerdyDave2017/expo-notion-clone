import { RenderItemParams } from "react-native-draggable-flatlist";
import { NotionFile } from "@prisma/client/react-native";
import NotionFileItem from "./NotionFileItem";
import InnerNotionListItem from "./InnerNotionListItem";
export { NotionFileItem, InnerNotionListItem };

const DraggableNotionListItem = ({
  drag,
  isActive,
  item,
}: RenderItemParams<NotionFile>) => {
  return (
    <NotionFileItem
      iconColor=""
      isActive={isActive}
      notionFile={item}
      drag={drag}
    />
  );
};

export default DraggableNotionListItem;
