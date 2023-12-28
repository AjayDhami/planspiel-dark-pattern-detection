export const websiteDataList = [
  {
    id: "1",
    name: "Website #1",
    baseUrl: "http://www.example.com",
    isCompleted: true,
    phase: "Finished",
    feedback: [],
  },
  {
    id: "2",
    name: "Website #2",
    baseUrl: "http://www.example.com",
    isCompleted: false,
    phase: "Initial",
    feedback: [],
  },
  {
    id: "3",
    name: "Website #3",
    baseUrl: "http://www.example.com",
    isCompleted: true,
    phase: "Feedback",
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
    baseUrl: "http://www.example.com",
    isCompleted: false,
    phase: "Initial",
    feedback: [],
  },
  {
    id: "5",
    name: "Website #5",
    baseUrl: "http://www.example.com",
    isCompleted: false,
    phase: "Initial",
    feedback: [],
  },
];
