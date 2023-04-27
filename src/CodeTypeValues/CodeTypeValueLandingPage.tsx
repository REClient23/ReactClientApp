import React, { useEffect, useMemo, useRef, useState } from "react";
import { Console } from "console";
import {
  ContextMenu,
  Icon,
  IconSize,
  Menu,
  MenuDivider,
  MenuItem,
  TextArea,
} from "@blueprintjs/core";
import { ListBox } from "primereact/listbox";

import { CodeTypes } from "../CodeTypes/CodeTypesInterface";
import { appBaseURL } from "../CommonComponents/ApplicationConstants";
import { ErrorToaser } from "../CommonComponents/Toast";
import CustomToolBar from "../CommonComponents/CustomToolBar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "./CodeTypeValueLandingPage.css";
import { CodeTypeValues } from "./CodeTypeValues";
import { ParentToChildHandler } from "../CommonComponents/ParentToChildHandler";
import AddNewCodeTypeValues from "./AddNewCodeTypeValues";

function CodeTypeValueLandingPage() {
  const headertextforToolbar = "Code Types Values";
  const [selectedCT, setSelectedCT] = useState<CodeTypes>();
  const [rowData, setRowData] = useState<CodeTypes[]>();
  const [subrowData, setSubRowData] = useState<CodeTypeValues[]>();
  const [headertext, setheadertext] = useState(headertextforToolbar);
  const [selectedRowData, setSelectedRowData] = useState<CodeTypeValues>();

  const addChildRef = useRef<ParentToChildHandler>(null);
  const deleteChildRef = useRef<ParentToChildHandler>(null);
  const editChildRef = useRef<ParentToChildHandler>(null);

  const refreshData = () => {
    fetch(appBaseURL + "/api/CodeTypes")
      .then((result) => result.json())
      .then((rowData: CodeTypes[]) => setRowData(rowData))
       .catch((error) => console.log(error));
  };

  const refreshCTVData = () => {

    
    fetch(appBaseURL + "/api/CodeTypeValues/"+`${selectedCT?.ShortCode}`)
      .then((result) => result.json())
      .then((subrowData: CodeTypeValues[]) => setSubRowData(subrowData))
      .catch((error) => console.log(error));
  };


  useEffect(() => refreshData(), []);

  const countryTemplate = (option: any) => {
    return (
      <div>
        <div>{option.description}</div>
      </div>
    );
  };

  const onDeleteButtonClick = () => {

    if(selectedRowData?.shortCode==="")
    {
      ErrorToaser("Please select a row to delete");
    }
    else
    {
      deleteChildRef.current?.Action();
    }
  };
  const onEditButtonClick = () => {
    if (selectedRowData?.shortCode === "") {
      ErrorToaser("Please select a row to edit");
    } else {
      editChildRef.current?.Action();
    }
  };
  const OnAddClickHandler = () => {
    console.log(selectedRowData);        
    addChildRef.current?.Action();
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

  function onListSelectionChanged(e: any) {

    var codetype: CodeTypes = {
      ShortCode: e.value.shortCode,
      Description: e.value.description,
    };

  
    var codetypedata: CodeTypeValues = {
      shortCode: "",
      description: "",
      codeTypeShortCode: codetype.ShortCode,
      codeTypeDesc:codetype.Description
    };    
    setSelectedCT(codetype);    
    setSelectedRowData(codetypedata);
    
    let data = headertextforToolbar + " :--> " + codetype.Description;
    setheadertext(data);
    refreshCTVData();
    
  }



  function onSelectionChanged(event: any) {
    var selectedRows = event.api.getSelectedRows();
    if (selectedRows[0] != null) setSelectedRowData(selectedRows[0]);
    else {
      const codetype: CodeTypeValues = {
        shortCode: "",
        description: "",
        codeTypeShortCode: "",
        codeTypeDesc:""
      };
      setSelectedRowData(codetype);
    }
  }
  return (
    <div>
      <div className="header">
        <CustomToolBar
          HeaderText={headertext}
          OnAddClickHandler={OnAddClickHandler}
          OnEditClickHandler={onEditButtonClick}
          OnDeleteClickHandler={onDeleteButtonClick}
          IsAddActionVisible={true}
        />
      </div>
      <div className="container-main">
        <div className="left-side">
          <ListBox
            filter
            value={selectedCT}
            onChange={onListSelectionChanged}
            options={rowData}
            itemTemplate={countryTemplate}
            optionLabel="description"
          />
        </div>
        <div className="right-side">
          <div className="ag-theme-alpine" style={{ height: 900 }}>
            <AgGridReact
              rowData={subrowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onSelectionChanged={onSelectionChanged}
              rowSelection="single"
            />
            <AddNewCodeTypeValues ref={addChildRef} OnRefreshHandler={refreshCTVData}  codeTypes={selectedRowData} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CodeTypeValueLandingPage;
