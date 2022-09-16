import React, { FormEventHandler, useEffect, useState } from "react";
import { Input, Box, Text, Button, Flex } from "@quaantum/components";

interface TagsManagerProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagsManager: React.FC<TagsManagerProps> = ({ tags, onChange }) => {
  const [newTag, setNewTag] = useState("");
  const [tagsState, setTagsState] = useState(tags);

  const handleAdd: FormEventHandler = (e) => {
    e.preventDefault();
    if (newTag.length > 0) {
      setTagsState([...tagsState, newTag]);
      setNewTag("");
    }
  };

  const handleDelete = (tag: string) => {
    setTagsState(tagsState.filter((t) => t !== tag));
  };

  useEffect(() => {
    onChange(tagsState);
  }, [tagsState]);

  return (
    <Box>
      <Flex
        bgColor="white"
        r="8px"
        p="8px"
        gap="4px"
        align="center"
        wrap="wrap"
      >
        {tagsState.map((tag) => (
          <Flex
            key={tag}
            bgColor="primary"
            align="center"
            gap="8px"
            r="4px"
            p="4px"
          >
            <Text m="0">{tag}</Text>
            <Button
              onClick={() => handleDelete(tag)}
              height="fit-content"
              bgColor="primary"
              p="4px"
              r="100%"
              c="white"
              d="grid"
              w="24px"
              h="24px"
              placeItems="center"
            >
              x
            </Button>
          </Flex>
        ))}
        <Box as="form" onSubmit={handleAdd}>
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            bgColor="transparent"
            p="0"
            height="24px"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default TagsManager;
