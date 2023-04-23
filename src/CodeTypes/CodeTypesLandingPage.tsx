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
import {appBaseURL} from "../CommonComponents/ApplicationConstants";
import AddNewCodeType from "./AddNewCodeType";
import {
  ParentToChildHandler,
  ParentChildHandlerProps,
} from "../CommonComponents/ParentToChildHandler";
export default function CodeTypesLandingPage() {
  const addChildRef = useRef<ParentToChildHandler>(null);
  const [rowData, setRowData] = useState();

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

  const onDeleteButtonClick = () => {};
  const onEditButtonClick = () => {};

  const [columnDefs, setColumnDefs] = useState([
    { field: "shortCode" },
    { field: "description" },
    {
      headerName: "Action",
      field: "shortCode",
      cellRendererFramework: ActionCellRenderer,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1,
      filter: true,
    }),
    []
  );

  const refreshData = () => {
    fetch(appBaseURL+"/api/CodeTypes")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData))
      .catch((error) => console.log(error));
  };

  useEffect(() => refreshData(), []);

  const OnAddClickHandler = () => {
    console.log("opening window");
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
        IsAddActionVisible={true}        
      />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
      <AddNewCodeType ref={addChildRef} OnRefreshHandler={refreshData}/>
    </div>
  );
}
