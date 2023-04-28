import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { error } from "console";
import { Button } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { IconName } from "@blueprintjs/icons";
import CustomToolBar from "../CommonComponents/CustomToolBar";
import { appBaseURL } from "../CommonComponents/ApplicationConstants";
import AddNewCodeType from "./AddNewCodeType";
import {
  ParentToChildHandler,
  ParentChildHandlerProps,
} from "../CommonComponents/ParentToChildHandler";
import { CodeTypes } from "./CodeTypesInterface";
import { ErrorToaser } from "../CommonComponents/Toast";
import DeleteCodeType from "./DeleteCodeType";
import EditCodeType from "./EditCodeType";

export default function CodeTypesLandingPage() {
  
  const addChildRef = useRef<ParentToChildHandler>(null);
  const deleteChildRef = useRef<ParentToChildHandler>(null);
  const editChildRef= useRef<ParentToChildHandler>(null);
  const [rowData, setRowData] = useState<CodeTypes[]>();
  const [selectedRowData, setSelectedRowData] = useState<CodeTypes>();
  const gridRef = useRef<AgGridReact<CodeTypes>>(null);
  const newdata= useState<CodeTypes>();

  function onSelectionChanged(event: any) {
    var selectedRows = event.api.getSelectedRows();
    if (selectedRows[0] != null) setSelectedRowData(selectedRows[0]);
    else{
      const codetype: CodeTypes = { ShortCode: "", Description: "" };
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
    if(selectedRowData === undefined || selectedRowData?.ShortCode==="")
    {
      ErrorToaser("Please select a row to delete");
    }
    else
    {
      deleteChildRef.current?.Action();
    }
  };
  const onEditButtonClick = () => {
    if( selectedRowData === undefined  || selectedRowData?.ShortCode==="")
    {
      ErrorToaser("Please select a row to edit");
    }
    else
    {
      editChildRef.current?.Action();
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

  const refreshData = () => {
    fetch(appBaseURL + "/api/CodeTypes")
      .then((result) => result.json())
      .then((rowData: CodeTypes[]) => setRowData(rowData));
    //.catch((error) => console.log(error));
  };

  useEffect(() => refreshData(), []);

  const OnAddClickHandler = () => {
    addChildRef.current?.Action();
  };
  function test(): void {
    throw new Error("Function not implemented.");
  }
  return (
    <div className="ag-theme-alpine" style={{ height: 900 }}>
      <CustomToolBar
        HeaderText="Code Types"
        OnAddClickHandler={OnAddClickHandler}
        OnEditClickHandler={onEditButtonClick}
        OnDeleteClickHandler={onDeleteButtonClick}
        IsAddActionVisible={true}
      />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onSelectionChanged={onSelectionChanged}
        rowSelection="single"
      />
      <AddNewCodeType ref={addChildRef} OnRefreshHandler={refreshData}  codeTypes={selectedRowData} />
      <DeleteCodeType ref={deleteChildRef} OnRefreshHandler={refreshData} codeTypes={selectedRowData} />
      <EditCodeType ref={editChildRef} OnRefreshHandler={refreshData} codeTypes={selectedRowData} />
    </div>
  );
}
