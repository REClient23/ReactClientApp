import React, {
    useMemo,
    forwardRef,
    useImperativeHandle,
    useState,
  } from "react";
  import { Timeline, TimelineProps } from "primereact/timeline";
  import { Card } from "primereact/card";
  import { Button } from "primereact/button";
  import "primereact/resources/primereact.min.css";
  import "primeicons/primeicons.css";
  import "primereact/resources/themes/lara-light-blue/theme.css";
  import "primereact/resources/primereact.min.css";
  import { appBaseURL } from "../../CommonComponents/ApplicationConstants";
  import { Tag } from "primereact/tag";
  import "../LeadManagementPages.css";
  import Leads from "../Leads";
  import {
    LeadManagementHandlerProps,
    ParentToChildHandler,
  } from "../../CommonComponents/ParentToChildHandler";
  class TimelineEvent implements TimelineProps {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
    name?: string;
    notes?: string;
    constructor(date: string, name: string, notes: string,type:string) {
      this.date = date;
      this.name = name;
      this.notes = notes;
      this.icon = renderSwitch(type);
    }
  }
 const renderSwitch=(param: any)=> {
    switch(param) {
      case 'CALL':        
        return 'pi pi-phone';
        case 'MEETING':        
        return 'pi pi-briefcase';
        case 'REMINDER':        
        return 'pi pi-bell';
        case 'SITEVISIT':        
        return 'pi pi-car';
      default:
        return 'pi pi-calendar-plus';
    }
  }
  
  const LeadSchedulesTimeLinePage = forwardRef<
    ParentToChildHandler,
    LeadManagementHandlerProps
  >((props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {
        console.log("In here leadnotes")
        refreshCTVData();
      },
    }));
    //const LeadNotesTimeLinePage=(param:Leads)=>
    const [rowData, setRowData] = useState<any[]>();
    const refreshCTVData = () => {    
      if(props!== undefined && props.selectedLead!== undefined && props.selectedLead.leadId!== undefined)
      {      
      fetch(appBaseURL + "/api/schedule/" + `${props.selectedLead.leadId}`)
        .then((result) => result.json())
        .then((subrowData) => clientMap(subrowData))
        .catch((error) => console.log(error));
      }
    };
    useMemo(() => refreshCTVData(), []);
    const clientMap = (param: any[]) => {
      if (rowData !== null) {
        const users = param.map(
          (data: any) =>
            new TimelineEvent(data.scheduleTime, data.createdBy, data.scheduleNotes, data.scheduleType)
        );
        setRowData(users);
      }
    };
  
    const customizedMarker = (item: TimelineEvent) => {
      return (
        <span className="circle">
          <i className={item.icon} style={{ fontSize: "1.7rem" }}></i>
        </span>
      );
    };
  
    const customizedContent = (item: TimelineEvent) => {
      return (
        <Card title={item.status} subTitle={item.date} style={{ margin: "10px" }}>
          {item.image && (
            <img
              src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`}
              alt={item.name}
              width={200}
              className="shadow-1"
            />
          )}
          <p>{item.notes}</p>
          <Tag value={item.name}></Tag>
        </Card>
      );
    };
    return (
      <div style={{ height: "80vh", overflowY: "auto", margin: "5px" }}>
        <Timeline
          value={rowData}
          align="alternate"
          className="customized-timeline"
          marker={customizedMarker}
          content={customizedContent}
        />
      </div>
    );
  });
  export default LeadSchedulesTimeLinePage;
  