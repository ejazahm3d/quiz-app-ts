import React from "react";
import { Router } from "./router";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
interface Answer {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <Router />
    </ReduxProvider>
  );
};

export default App;
