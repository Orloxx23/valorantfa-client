import React from "react";
import AdminAppbar from "./components/AdminAppbar";
import AdminTabs from "./components/AdminTabs";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return (
    <>
      <AdminAppbar />
      <AdminTabs/>
    </>
  );
}
