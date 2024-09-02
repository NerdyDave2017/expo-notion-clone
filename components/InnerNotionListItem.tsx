import { extendedClient } from "@/myDbModule";
import { NotionFile } from "@prisma/client/react-native";
import React from "react";
import { useColorScheme, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import { NotionFileItem } from "./DraggableNotionListItem";

interface InnerNotionListItemProps {
  parentId: number | undefined;
}

const InnerNotionListItem = ({ parentId }: InnerNotionListItemProps) => {
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "light" ? Colors.light.icon : Colors.dark.icon;

  const children = extendedClient.notionFile.useFindMany({
    where: {
      parentFileId: parentId,
    },
  });

  if (children.length === 0) {
    return <ThemedText style={{ color: "grey" }}>No pages inside!</ThemedText>;
  }

  return (
    <View>
      {children.map((notionFile: NotionFile) => (
        <NotionFileItem
          key={notionFile.id}
          iconColor={iconColor}
          notionFile={notionFile}
        />
      ))}
    </View>
  );
};

export default InnerNotionListItem;
