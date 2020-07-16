import React from "react";
import { Router } from "./router";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <Router />
    </ReduxProvider>
  );
};

export default App;
