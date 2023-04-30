import { Alignment, Button, Icon, Navbar, Tab, Tabs } from "@blueprintjs/core";
import React, { useRef, useState } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { ParentToChildHandler } from "../CommonComponents/ParentToChildHandler";
import AddLeadNotes from "./AddLeadNotes";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function LMDetailsPage() {
  return (
    <div>
      {" "}
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading>
            Page: <strong>Lead Management</strong>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Tabs id="navbar">
            <Tab id="Profile" title="Profile" icon="user" />
            <Tab id="Activity" title="Activity" icon="chat" />
            <Tab id="Appointments" title="Appointments" icon="timeline-events" 
             tagContent="2"
             tagProps={{ round: true,intent:"danger" }}/>
            <Tab
              id="Properties"
              title="Properties"
              icon="home"
              tagContent="7"
              tagProps={{ round: true,intent:"danger" }}
            />
            <Tab id="Analytics" title="Analytics" icon="chart" />
            <Tab id="Funnel" title="Funnel" icon="filter" />
          </Tabs>
        </Navbar.Group>
      </Navbar>
    </div>
  );
}

export default LMDetailsPage;
