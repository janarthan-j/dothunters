const onboardingQuestions = {
  "web-design-development": [
    {
      id: "q1",
      label: "Do you have an existing website?",
      options: ["Redesigning an existing site", "Starting fresh"],
    },
    {
      id: "q2",
      label: "Roughly how many pages do you need?",
      options: ["1–5 pages", "6–15 pages", "16+ pages", "Not sure"],
    },
  ],
  "ai-ml-development": [
    {
      id: "q1",
      label: "What are you trying to build?",
      options: ["Computer vision", "LLM / chatbot", "Automation / data pipeline", "Not sure"],
    },
    {
      id: "q2",
      label: "Do you have data ready to work with?",
      options: ["Ready to use", "Needs cleaning", "Don't have data yet"],
    },
  ],
  "3d-vr-game-development": [
    {
      id: "q1",
      label: "What kind of experience are you building?",
      options: ["VR / AR app", "3D web experience", "Game", "Not sure"],
    },
    {
      id: "q2",
      label: "What's the target platform?",
      options: ["Web", "Mobile", "VR headset", "PC / Console", "Not sure"],
    },
  ],
  "motion-graphics": [
    {
      id: "q1",
      label: "What do you need animated?",
      options: ["Explainer video", "Logo / brand animation", "Social content", "Not sure"],
    },
    {
      id: "q2",
      label: "Do you already have a script or storyboard?",
      options: ["Yes", "No", "Partial"],
    },
  ],
  "saas-product-development": [
    {
      id: "q1",
      label: "Where are you in the process?",
      options: ["Idea only", "Have a spec or designs", "Rebuilding an existing product", "Not sure"],
    },
    {
      id: "q2",
      label: "Do you need billing / subscriptions built in?",
      options: ["Yes", "No", "Not sure"],
    },
  ],
  "mobile-app-development": [
    {
      id: "q1",
      label: "Which platforms do you need?",
      options: ["iOS only", "Android only", "Both iOS & Android", "Not sure"],
    },
    {
      id: "q2",
      label: "Do you have designs already?",
      options: ["Yes", "No", "Partial"],
    },
  ],
  "video-production": [
    {
      id: "q1",
      label: "What type of video do you need?",
      options: ["Brand film", "Product video", "Social content", "Documentary / corporate", "Not sure"],
    },
    {
      id: "q2",
      label: "Do you need filming, or just editing?",
      options: ["We need filming", "We have footage, need editing", "Not sure"],
    },
  ],
};

export default onboardingQuestions;
