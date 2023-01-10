import { configureStore } from "@reduxjs/toolkit";

import { combineEpics, createEpicMiddleware } from "redux-observable";
import skillsReducer from "../reducers/skills";
import { changeSearchEpic, searchSkillsEpic } from "../epics";

const epic = combineEpics(changeSearchEpic, searchSkillsEpic);

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    skills: skillsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

epicMiddleware.run(epic);

export default store;
