export const websiteDataList = [
  {
    websiteId: "1",
    websiteName: "Website #1",
    baseUrl: "http://www.example.com",
    isCompleted: true,
    phase: "Finished",
    feedback: [],
  },
  {
    websiteId: "2",
    websiteName: "Website #2",
    baseUrl: "http://www.example.com",
    isCompleted: false,
    phase: "Initial",
    feedback: [],
  },
  {
    websiteId: "3",
    websiteName: "Website #3",
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
    websiteId: "4",
    websiteName: "Website #4",
    baseUrl: "http://www.example.com",
    isCompleted: false,
    phase: "Initial",
    feedback: [],
  },
  {
    websiteId: "5",
    websiteName: "Website #5",
    baseUrl: "http://www.example.com",
    isCompleted: false,
    phase: "Initial",
    feedback: [],
  },
];
