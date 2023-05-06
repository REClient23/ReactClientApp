import {
  Alignment,
  Button,
  Classes,
  Icon,
  Navbar,
  Tab,
  Tabs,
} from "@blueprintjs/core";
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import {
  LeadManagementHandlerProps,
  ParentToChildHandler,
} from "../CommonComponents/ParentToChildHandler";
import AddLeadNotes from "./AddLeadNotes";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import LeadNotesTimeLinePage from "./LeadNotesTimeLinePage";
import Leads from "./Leads";
import LeadsProfileLandingPage from "./LeadsProfile/LeadsProfileLandingPage";
import LeadSchedulesTimeLinePage from "./LeadsScheduleAppointment/LeadSchedulesTimelinePage";

const LMDetailsPage = forwardRef<
  ParentToChildHandler,
  LeadManagementHandlerProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({
    Action() {
      addChildRef.current?.Action();
      profileChildRef.current?.Action();
    },
  }));
  const addChildRef = useRef<ParentToChildHandler>(null);
  const profileChildRef = useRef<ParentToChildHandler>(null);
  return (
    <div>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Tabs id="navbar" fill={true}>
            <Tab
              id="Profile"
              title="Profile"
              icon="user"
              panel={
                <LeadsProfileLandingPage
                  ref={profileChildRef}
                  selectedLead={props.selectedLead}
                />
              }
            />
            <Tab
              id="Activity"
              title="Activity"
              icon="chat"
              panel={
                <LeadNotesTimeLinePage
                  ref={addChildRef}
                  selectedLead={props.selectedLead}
                />
              }
            ></Tab>
            <Tab
              id="Appointments"
              title="Appointments"
              icon="timeline-events"
              tagContent="2"
              tagProps={{ round: true, intent: "danger" }}
              panel={
                <LeadSchedulesTimeLinePage
                  ref={addChildRef}
                  selectedLead={props.selectedLead}
                />
              }
            />
            <Tab
              id="Properties"
              title="Properties"
              icon="home"
              tagContent="7"
              tagProps={{ round: true, intent: "danger" }}
            />
            <Tab id="Analytics" title="Analytics" icon="chart" />
            <Tab id="Funnel" title="Funnel" icon="filter" />
          </Tabs>
        </Navbar.Group>
      </Navbar>
    </div>
  );
});

export default LMDetailsPage;
