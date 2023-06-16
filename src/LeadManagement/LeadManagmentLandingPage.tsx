import { Button, Icon } from "@blueprintjs/core";
import React, { useContext, useMemo, useRef, useState } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import {
  LeadManagementHandlerProps,
  ParentToChildHandler,
} from "../CommonComponents/ParentToChildHandler";
import AddLeadNotes from "./AddLeadNotes";
import { CodeTypeValues } from "../CodeTypeValues/CodeTypeValues";
import { SpeedDial } from "primereact/speeddial";
import { Dock } from "primereact/dock";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import LMDetailsPage from "./LMDetailsPage";
import LeadNotesTimeLinePage from "./LeadNotesTimeLinePage";
import { ListBox } from "primereact/listbox";
import "./LeadManagementPages.css";
import { appBaseURL } from "../CommonComponents/ApplicationConstants";
import Leads from "./Leads";
import { Badge } from "primereact/badge";
import AddLeadSchedules from "./LeadsScheduleAppointment/AddLeadSchedules";
import LinkLeadProperties from "./LeadPropertyDetails/LinkLeadProperties";
import { AppContext } from "../States/AppProvider";

function LeadManagmentLandingPage() {
  const { state } = useContext(AppContext);
  const addChildRef = useRef<ParentToChildHandler>(null);
  const notesChildRef = useRef<ParentToChildHandler>(null);
  const scheduleChildRef = useRef<ParentToChildHandler>(null);
  const linkPropertyChildRef = useRef<ParentToChildHandler>(null);
  const [paramLeadManagementHandlerProps, setLeadManagementHandlerProps] =
    useState<LeadManagementHandlerProps>();
  const [selectedCT, setSelectedCT] = useState<Leads>();
  const [rowData, setRowData] = useState<Leads[]>();
  const objrowdata = { ...selectedCT };
  const refreshData = () => {};
  const getLeadsData = () => {
    fetch(appBaseURL + "/api/LeadMgmt"+ `/${state.user.email}` + `/${state.user.role}`)
      .then((result) => result.json())
      .then((rowData: Leads[]) => setRowData(rowData))
      .catch((error) => console.log(error));
  };
  function onSelectionChanged(e: any) {
    var lead: Leads = {
      leadId: e.value.leadId,
      name: e.value.name,
      budget: e.value.budget,
      leadStatus: e.value.leadStatus,
      phNumber: e.value.phNumber,
    };

    if (lead !== null) {
      setSelectedCT(lead);
      setTimeout(() => {
        notesChildRef.current?.Action();        
      }, 1000);
    } else {
    }
  }
  useMemo(() => getLeadsData(), []);

  const OnAddClickHandler = () => {
    addChildRef.current?.Action();
  };
  const OnScheduleClickHandler = () => {
    scheduleChildRef.current?.Action();
  };
  const items = [
    {
      label: "Add",
      icon: "pi pi-plus",
      command: () => {
        OnAddClickHandler();
      },
    },
    {
      label: "Update",
      icon: "pi pi-calendar-plus",
      command: () => {
        OnScheduleClickHandler();
      },
    },
    {
      label: "Link",
      icon: "pi pi-link",
      command: () => {   linkPropertyChildRef.current?.Action();},
    },
  ];

  /*
  
  {
      label: "React Website",
      icon: "pi pi-external-link",
      command: () => {
        window.location.href = "https://facebook.github.io/react/";
      },
    },

  */

  const countryTemplate = (option: Leads) => {
    return (
      <div className="user-info">
        <div className="row">
          <div className="column">{option.name}</div>
          <div className="column">{option.phNumber}</div>
          {option.leadStatus !== "HOT" && (
            <div className="column">
              <Badge value="H" severity="danger" />
            </div>
          )}
        </div>
        <div className="row">
          <div className="column">
            <span>
              <Badge value="F" severity="info" />
              <span> </span>
              <i className="pi pi-money-bill"></i>
              <span> </span>
              <span>{option.budget}</span>
            </span>
          </div>
          <div className="column">2024-05-02 2 PM</div>
        </div>
      </div>
    );
  };
  return (
    <div className="container-main">
      <div className="left-side">
        <ListBox
          filter
          optionLabel="name"
          options={rowData}
          itemTemplate={countryTemplate}
          onChange={onSelectionChanged}
          listStyle={{ maxHeight: "90vh" }}
        />
      </div>
      <div className="right-side">
        <LMDetailsPage ref={notesChildRef} selectedLead={selectedCT} />
      </div>
      <div style={{ position: "relative", zIndex: 9999 }}>
        <SpeedDial
          model={items}
          radius={75}
          type="quarter-circle"
          direction="down-left"
          style={{ right: "2px", top: "5px" }}
        />
      </div>
      <AddLeadNotes ref={addChildRef} selectedLead={selectedCT} />
      <AddLeadSchedules ref={scheduleChildRef} selectedLead={selectedCT} />
      <LinkLeadProperties ref={linkPropertyChildRef} selectedLead={selectedCT} />
    </div>
  );
}

export default LeadManagmentLandingPage;
