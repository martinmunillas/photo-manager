import { Box, Button, Flex, Grid, Text } from "@quaantum/components";
import React, { useState } from "react";
import { IoMdCreate, IoMdGrid } from "react-icons/io";
import DefaultProfile from "renderer/components/DefaultProfile";
import Layout from "renderer/components/Layout";
import PersonForm from "renderer/components/PersonForm";
import { usePeople } from "renderer/hooks/usePeople";
import { Person } from "types";

interface PeopleProps {}

const basePerson: Omit<Person, "id"> = {
  name: "",
  nickname: "",
  tags: [],
};

const People: React.FC<PeopleProps> = ({}) => {
  const { loading, people } = usePeople();
  const [person, setPerson] = useState<Partial<Person>>();
  if (loading) return <Text c="white">Loading...</Text>;

  const clear = () => setPerson(undefined);

  return (
    <Layout
      sidebar={person && <PersonForm person={person} onSave={clear} />}
      onCloseSidebar={clear}
    >
      <Button onClick={() => setPerson(basePerson)}>Create</Button>
      <Grid
        templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        gap="16px"
        placeItems="center"
        my="40px"
      >
        {people.map((p) => (
          <Flex
            key={p.id}
            direction="column"
            c="white"
            align="center"
            gap="8px"
            position="relative"
            p="8px"
            border="1px solid"
            borderColor={p.id === person?.id ? "white.dark" : "transparent"}
            r="8px"
            customCss={`
            &:hover .hoverControls {
              display: flex;
            }
            `}
          >
            <Box
              className="hoverControls"
              position="absolute"
              w="100%"
              h="100%"
              display="none"
              bgColor="#00000020"
            >
              <Flex w="100%" h="100%" align="center" justify="center" gap="8px">
                <Button
                  bgColor="primary"
                  color="white"
                  onClick={() => setPerson(p)}
                  d="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="8px"
                >
                  Edit <IoMdCreate />
                </Button>
                <Button
                  bgColor="secondary"
                  color="white"
                  d="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="8px"
                >
                  View <IoMdGrid />
                </Button>
              </Flex>
            </Box>
            <DefaultProfile size="100px" />
            <Text m="0" textAlign="center">
              {p.nickname || p.name}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Layout>
  );
};

export default People;
