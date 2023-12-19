import React from "react";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import Card from "../components/WebsiteCard";

const websiteDataList = [
  {
    id: "1",
    name: "Website #1",
    isCertified: true,
    feedback: [],
  },
  {
    id: "2",
    name: "Website #2",
    isCertified: false,
    feedback: [],
  },
  {
    id: "3",
    name: "Website #3",
    isCertified: false,
    feedback: [
      {
        feedback_id: "301",
        feedback_type: "misdirection",
        feedback_description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut commodi officiis distinctio!",
        snaps: [],
        expert_id: "ex101",
        link: "https://dummy_link.com",
      },
    ],
  },
  {
    id: "4",
    name: "Website #4",
    isCertified: false,
    feedback: [],
  },
  {
    id: "5",
    name: "Website #5",
    isCertified: false,
    feedback: [],
  },
];

const Dashboard = () => {
  return (
    <>
      <div className="flex justify-end mb-2">
        <Link
          to="project/new"
          className="inline-flex justify-center rounded-full bg-primary text-white py-2 px-4 hover:bg-opacity-90"
        >
          <MdAdd size={25} />
          Add Website for Certification
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-5">
        {websiteDataList.map((website) => (
          <Card
            key={website.id}
            id={website.id}
            title={website.name}
            isCertified={website.isCertified}
            feedback={website.feedback}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
