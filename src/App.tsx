import React, { useState } from "react";
import { Router } from "./router";

interface Answer {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
