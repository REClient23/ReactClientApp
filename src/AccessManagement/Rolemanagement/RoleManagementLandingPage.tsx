import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { error } from "console";
import { Button } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { IconName } from "@blueprintjs/icons";
import CustomToolBar from "../../CommonComponents/CustomToolBar";
import { appBaseURL } from "../../CommonComponents/ApplicationConstants";

import {
  ParentToChildHandler,
  ParentChildHandlerProps,
} from "../../CommonComponents/ParentToChildHandler";
import { CodeTypes } from "../../CodeTypes/CodeTypesInterface";
import { ErrorToaser } from "../../CommonComponents/Toast";
import DeleteCodeType from "../../CodeTypes/DeleteCodeType";
import EditCodeType from "../../CodeTypes/EditCodeType";
import AddNewCodeType from "../../CodeTypes/AddNewCodeType";
import AssignRoles from "./AssignRoles";
import { CodeTypeValues } from "../../CodeTypeValues/CodeTypeValues";

export default function RoleManagementLandingPage() {
  
  const addChildRef = useRef<ParentToChildHandler>(null);
  const [rowData, setRowData] = useState<CodeTypeValues[]>();
  const [selectedRowData, setSelectedRowData] = useState<CodeTypeValues>();
  const gridRef = useRef<AgGridReact<CodeTypeValues>>(null);
  const newdata= useState<CodeTypeValues>();

  function onSelectionChanged(event: any) {
    var selectedRows = event.api.getSelectedRows();
    if (selectedRows[0] != null) setSelectedRowData(selectedRows[0]);
    else{
      const codetype: CodeTypeValues = {  shortCode: "", description: "",codeTypeShortCode:"", codeTypeDesc:"" };
      setSelectedRowData(codetype);
    }
     
  }

  /*
  const ActionCellRenderer = (params: any) => {
    if (params.value != null) {
      return (
        <div>
          <Button
            intent="warning"
            icon="trash"
            onClick={onDeleteButtonClick}
            style={{ marginRight: "10px" }}
          />
          <Button intent="primary" icon="edit" onClick={onEditButtonClick} />
        </div>
      );
    }
    return <div></div>;
  };
*/
  const onDeleteButtonClick = () => {
    if(selectedRowData === undefined || selectedRowData?.shortCode==="")
    {
      ErrorToaser("Please select a row to delete");
    }
    else
    {
      
    }
  };
  const onEditButtonClick = () => {
    if( selectedRowData === undefined  || selectedRowData?.shortCode==="")
    {
      ErrorToaser("Please select a Role to add Permissions");
    }
    else
    {
      addChildRef.current?.Action();  
    }
  };

  const [columnDefs, setColumnDefs] = useState([
    { field: "shortCode" },
    { field: "description" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1,
      filter: true,
      cellStyle: { textAlign: "left" },
    }),
    []
  );
  const refreshData = ()=>{
    refreshDatactv("ROLES");
  };
  const refreshDatactv = (ctShortCode: any) => {
    fetch(appBaseURL + "/api/CodeTypeValues/" + `${ctShortCode}`)
      .then((result) => result.json())
      .then((subrowData: CodeTypeValues[]) => setRowData(subrowData))
      .catch((error) => console.log(error));
  };

  useEffect(() => refreshData(), []);

  const OnAddClickHandler = () => {
    if( selectedRowData === undefined  || selectedRowData?.shortCode==="")
    {
      ErrorToaser("Please select a Role to add Permissions");
    }
    else
    {
      addChildRef.current?.Action();  
    }
    
  };
  function test(): void {
    throw new Error("Function not implemented.");
  }
  return (
    <div className="ag-theme-alpine" style={{ height: 900 }}>
      <CustomToolBar
        HeaderText="Role Management"
        OnAddClickHandler={OnAddClickHandler}
        OnEditClickHandler={onEditButtonClick}
        OnDeleteClickHandler={onDeleteButtonClick}        
        ModuleName="RoleManagement"
      />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onSelectionChanged={onSelectionChanged}
        rowSelection="single"
      />
      <AssignRoles ref={addChildRef} OnRefreshHandler={refreshData}  codeTypes={selectedRowData} />      
    </div>
  );
}
