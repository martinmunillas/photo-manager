import { Button, Flex, Input, Text } from "@quaantum/components";
import React, { useEffect, useState } from "react";
import { usePeople } from "renderer/hooks/usePeople";

interface PeopleSelectorProps {
  value?: number[];
  onChange?: (value: number[]) => void;
}

const PeopleSelector: React.FC<PeopleSelectorProps> = ({ value, onChange }) => {
  const [state, setState] = useState<number[]>(value ?? []);
  const { people, loading } = usePeople();

  useEffect(() => {
    onChange?.(state);
  }, [state]);

  const personsSelected = state.map(
    (personId) => people.find((p) => p.id === personId)!
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Flex direction="column">
      <Input
        as="select"
        onChange={(e) => {
          if (e.target.value === "none") return;
          setState([...state, Number(e.target.value)]);
          e.target.value = "none";
        }}
      >
        <option value="none">Add person</option>
        {people
          .filter((person) => !state.includes(person.id))
          .map((person) => (
            <option value={person.id} key={person.id}>
              {person.name}
            </option>
          ))}
      </Input>
      <Flex wrap="wrap" py="16px" gap="8px">
        {personsSelected.map((person) => (
          <Flex
            bgColor="secondary.dark"
            align="center"
            p="4px"
            r="4px"
            gap="4px"
            key={person.id}
          >
            <Text maxW="120px" overflowX="scroll" whiteSpace="nowrap" m="0">
              {person.name}
            </Text>
            <Button
              height="fit-content"
              onClick={() => setState(state.filter((id) => id !== person.id))}
              p="4px 8px"
            >
              x
            </Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default PeopleSelector;
