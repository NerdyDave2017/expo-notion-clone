import Ionicons from "@expo/vector-icons/Ionicons";
import { NotionFile } from "@prisma/client/react-native";
import { useState } from "react";
import { View, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { InnerNotionListItem } from "./DraggableNotionListItem";

interface NotionFileItemProps {
  drag?: () => void;
  isActive?: boolean;
  notionFile: NotionFile;
  iconColor: string;
}

const NotionFileItem = ({
  iconColor,
  isActive,
  notionFile,
  drag,
}: NotionFileItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onPress = () => {
    setIsOpen((value) => !value);
  };

  return (
    <View>
      {/* Render clickable item */}
      <TouchableOpacity
        style={styles.itemWrapper}
        activeOpacity={0.8}
        disabled={isActive}
        onLongPress={drag}
      >
        <View style={styles.textWrapper}>
          <Pressable onPress={onPress}>
            <Ionicons
              name={isOpen ? "chevron-down" : "chevron-forward-outline"}
              size={18}
              style={{ marginRight: 12 }}
              color={iconColor}
            />
          </Pressable>
          <ThemedText type="defaultSemiBold">
            {notionFile.icon} {notionFile.title}
          </ThemedText>
        </View>
        <View style={styles.iconWrapper}>
          <Pressable>
            <Ionicons name="ellipsis-horizontal" size={18} color={iconColor} />
          </Pressable>
          <Pressable>
            <Ionicons name="add" size={22} color={iconColor} />
          </Pressable>
        </View>
      </TouchableOpacity>

      {/* Render items inside this item if any */}
      {isOpen ? (
        <View style={styles.childrenWrapper}>
          <InnerNotionListItem parentId={notionFile.id} />
        </View>
      ) : null}
    </View>
  );
};

export default NotionFileItem;

const styles = StyleSheet.create({
  itemWrapper: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  childrenWrapper: {
    marginLeft: 24,
  },
});
