import { Button, Icon } from "@blueprintjs/core";
import React, { useRef, useState } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { ParentToChildHandler } from "../CommonComponents/ParentToChildHandler";
import AddLeadNotes from "./AddLeadNotes";
import { CodeTypeValues } from "../CodeTypeValues/CodeTypeValues";
import { SpeedDial } from "primereact/speeddial";
import { Dock } from 'primereact/dock';

import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import LMDetailsPage from "./LMDetailsPage";
        
function LeadManagmentLandingPage() {
  const addChildRef = useRef<ParentToChildHandler>(null);
  const [selectedRowData, setSelectedRowData] = useState<CodeTypeValues>();
  const refreshData = () => {};

  const OnAddClickHandler = () => {
    addChildRef.current?.Action();
  };
  const items = [
    {
      label: "Add",
      icon: "pi pi-plus",
      command: () => {OnAddClickHandler()},
    },
    {
      label: "Update",
      icon: "pi pi-refresh",
      command: () => {},
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {},
    },
    {
      label: "React Website",
      icon: "pi pi-external-link",
      command: () => {
        window.location.href = "https://facebook.github.io/react/";
      },
    },
  ];
  return (
    <div>
      <LMDetailsPage/>
      <div style={{ position: "relative", height: "500px" }}>
        <SpeedDial
          model={items}
          radius={120}
          type="quarter-circle"
          direction="down-left"
          style={{ right: "2px", top: "5px" }}                             
        />         
      </div>
      <AddLeadNotes
        OnRefreshHandler={refreshData}
        ref={addChildRef}
        codeTypes={selectedRowData}
      />
    </div>
  );
}

export default LeadManagmentLandingPage;
