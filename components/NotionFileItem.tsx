import Ionicons from "@expo/vector-icons/Ionicons";
import { NotionFile } from "@prisma/client/react-native";
import { useState } from "react";
import { View, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { InnerNotionListItem } from "./DraggableNotionListItem";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { extendedClient } from "@/myDbModule";

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
  const { showActionSheetWithOptions } = useActionSheet();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDropdownAction = () => {
    setIsOpen((value) => !value);
  };

  const handleOptionsAction = (id: number) => {
    const options = ["Delete", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case destructiveButtonIndex: {
            extendedClient.notionFile.delete({
              where: {
                id: id,
              },
            });
            break;
          }
          case cancelButtonIndex: {
          }
        }
      }
    );
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
          <Pressable onPress={handleDropdownAction}>
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
          <Pressable onPress={() => handleOptionsAction(notionFile.id)}>
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
