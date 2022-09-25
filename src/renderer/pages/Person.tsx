import { Heading } from "@quaantum/components";
import React from "react";
import { useParams } from "react-router-dom";
import Gallery from "renderer/components/Gallery";
import Layout from "renderer/components/Layout";
import { usePerson } from "renderer/hooks/usePerson";

interface PersonProps {}

const Person: React.FC<PersonProps> = ({}) => {
  const personId = Number(useParams().personId);
  const person = usePerson(personId);
  return (
    <Layout>
      <Heading>{person?.name}</Heading>
      <Gallery />
    </Layout>
  );
};

export default Person;
