import React from "react";
import { useParams } from "react-router-dom";

const WebsiteViewPage = () => {
  const { webId } = useParams();
  return <div>{webId}</div>;
};

export default WebsiteViewPage;
