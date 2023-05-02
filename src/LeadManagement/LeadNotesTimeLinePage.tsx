import React, { useMemo, useState } from "react";
import { Timeline, TimelineProps } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { appBaseURL } from "../CommonComponents/ApplicationConstants";
import { Tag } from 'primereact/tag';
import "./LeadManagementPages.css";
class TimelineEvent implements TimelineProps {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
  name?: string;
  notes?:string;
  constructor(date: string, name: string, notes: string) {
    this.date=date;
    this.name = name;
    this.notes=notes;
    this.icon="pi pi-comments";
  }
}

export default function LeadNotesTimeLinePage() {
  const [rowData, setRowData] = useState<any[]>();
  const refreshCTVData = () => {
    fetch(appBaseURL + "/api/LeadNotes")
      .then((result) => result.json())
      .then((subrowData) => clientMap(subrowData))
      .catch((error) => console.log(error));
  };
  useMemo(() => refreshCTVData(), []);
  const clientMap = (param:any[]) => {
    if (rowData !== null) {      
        const users= param.map(
        (data: any) => new TimelineEvent(data.createdDateTime,data.createdBy,data.notes)        
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
      <Card title={item.status} subTitle={item.date}>
        {item.image && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`}
            alt={item.name}
            width={200}
            className="shadow-1"
          />
        )}
        <p>
          {item.notes}
        </p>
        <Tag value={item.name}></Tag>
      </Card>
    );
  };
  return (
    <div style={{ height:"100vh", overflowY: 'auto' }}>      
      <Timeline
        value={rowData}
        align="alternate"
        className="customized-timeline"
        marker={customizedMarker}
        content={customizedContent}       
      />      
    </div>
  );
}
