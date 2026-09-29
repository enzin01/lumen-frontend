import { createContext, useContext, useState } from "react";
import { counts, emptyRegistration, emptyReport } from "./utils";

const LumenContext = createContext(null);

function initialModel() {
  let stored = {};
  try {
    stored = JSON.parse(localStorage.getItem("lumen-demo-data") || "{}") || {};
  } catch {
    // Invalid demo storage should not prevent the application from opening.
  }
  return {
    data: {
      users: [],
      reports: [],
      notifications: [],
      currentUser: null,
      ...stored,
    },
    registration: emptyRegistration(),
    reportDraft: emptyReport(),
    listScope: "mine",
    listFilter: "Todos",
  };
}

export function LumenProvider({ children }) {
  const [model, setModel] = useState(initialModel);
  const value = {
    ...model,
    setModel,
    name: () => model.data.currentUser?.name?.split(" ")[0] || "Cidadão",
    myReports: () =>
      model.data.reports.filter(
        (report) =>
          report.userId && report.userId === model.data.currentUser?.email,
      ),
    counts: (reports = model.data.reports) => counts(reports),
  };
  return (
    <LumenContext.Provider value={value}>{children}</LumenContext.Provider>
  );
}

export function useLumen() {
  return useContext(LumenContext);
}
