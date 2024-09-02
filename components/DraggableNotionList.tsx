import { baseClient, extendedClient } from "@/myDbModule";
import { NotionFile } from "@prisma/client/react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import DraggableNotionListItem from "./DraggableNotionListItem";
import { useEffect, useState } from "react";

const DraggableNotionList = () => {
  const files = extendedClient.notionFile.useFindMany({
    where: {
      parentFile: {
        is: null,
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  const [sortedFiles, setSortedFiles] = useState<NotionFile[]>([]);

  const handleDrag = async (data: NotionFile[]) => {
    setSortedFiles(data);
    const updates = data.map((file, index) => {
      return baseClient.notionFile.update({
        where: { id: file.id },
        data: { order: index },
      });
    });

    await baseClient.$transaction(updates);
    await extendedClient.$refreshSubscriptions();
  };

  useEffect(() => {
    if (files) {
      setSortedFiles(files);
    }
  }, [files]);

  return (
    <DraggableFlatList
      data={sortedFiles}
      containerStyle={{ flex: 1 }}
      onDragEnd={({ data }) => handleDrag(data)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={DraggableNotionListItem}
    />
  );
};

export default DraggableNotionList;
