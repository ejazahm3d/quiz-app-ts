import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
