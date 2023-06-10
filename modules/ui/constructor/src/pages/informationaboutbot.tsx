import React from 'react';
import { useParams } from 'react-router';

const InformationAboutBotPage = () => {
  const { name } = useParams();

  return <div>{name}</div>;
};

export default InformationAboutBotPage;
