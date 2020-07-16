import React from "react";
import { Router } from "./router";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import { AppLayout } from "./components/Layout";

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <AppLayout>
        <Router />
      </AppLayout>
    </ReduxProvider>
  );
};

export default App;
