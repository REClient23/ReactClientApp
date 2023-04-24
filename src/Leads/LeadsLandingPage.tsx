import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { error } from "console";
import CustomToolBar from "../CommonComponents/CustomToolBar";
import {appBaseURL} from "../CommonComponents/ApplicationConstants";
function LeadsLandingPage() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    { field: "leadId" },
    { field: "name" },
    { field: "phNumber" },
    { field: "budget" },
    { field: "criteria" },
    { field: "leadStatus" },
    { field: "previousSchedule" },
    { field: "nextSchedule" },
  ]);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,      
      flex: 1,
      filter: true,
      cellStyle: {textAlign:'left'}      
    }),
    []
  );

  const refreshData = () => {
    fetch(appBaseURL+"/api/RemaxLeadMgmt")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData))
      .catch((error) => console.log(error));
  };
  useEffect(() => refreshData(), []);

  const OnAddClickHandler = () => {};
  const onDeleteButtonClick = () => {};
  const onEditButtonClick = () => {};

  return (
    <div className="ag-theme-alpine" style={{ height: 900 }}>
      <CustomToolBar
        HeaderText="Leads"
        OnAddClickHandler={OnAddClickHandler}
        OnEditClickHandler={onEditButtonClick}
        OnDeleteClickHandler={onDeleteButtonClick}
        IsAddActionVisible={true}        
      />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
export default LeadsLandingPage;
