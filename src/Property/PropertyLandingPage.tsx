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
import AddNewProperty from "./AddNewProperty";
import {
  ParentToChildHandler,
  ParentChildHandlerProps,
} from "../CommonComponents/ParentToChildHandler";
import { Property } from "./Property";
import { ErrorToaser } from "../CommonComponents/Toast";
import DeleteProperty from "./DeleteProperty";
import EditProperty from "./EditProperty";

export default function PropertyLandingPage() {
  const addChildRef = useRef<ParentToChildHandler>(null);
  const deleteChildRef = useRef<ParentToChildHandler>(null);
  const editChildRef = useRef<ParentToChildHandler>(null);
  const [rowData, setRowData] = useState<Property[]>();
  const [selectedRowData, setSelectedRowData] = useState<Property>();
  const gridRef = useRef<AgGridReact<Property>>(null);
  const newdata = useState<Property>();

  function onSelectionChanged(event: any) {
    var selectedRows = event.api.getSelectedRows();
    if (selectedRows[0] != null) setSelectedRowData(selectedRows[0]);
    else {
      const codetype: Property = {
        propertyId: 0,
        propertyName: "",
        propertyType: "",
        price: 0,
        facility: 0,
        address: "",
        facing: "",
        amenities: "",
        noOfCarParkings: 0,
        pictures: "",
        furnishedStatus: "",
        askingPrice: 0,
        finalPrice: 0,
        noOfBeds: 0,
        noOfBathRooms: 0,
        noOfBalcony: 0,
        dimention: 0,
        flatFloor: 0,
        totalFloors: 0,
        noOfFlatsInAFloor: 0,
        propertyAge: 0,
        noOfLifts: 0,
      };
      setSelectedRowData(codetype);
    }
  }

  const onDeleteButtonClick = () => {
    if (selectedRowData === undefined || selectedRowData?.propertyId === 0) {
      ErrorToaser("Please select a row to delete");
    } else {
      deleteChildRef.current?.Action();
    }
  };
  const onEditButtonClick = () => {
    if (selectedRowData === undefined || selectedRowData?.propertyId === 0) {
      ErrorToaser("Please select a row to edit");
    } else {
      editChildRef.current?.Action();
    }
  };

  const [columnDefs, setColumnDefs] = useState([
    { field: "propertyId" },
    { field: "propertyName" },
    { field: "propertyType" },
    { field: "price" },    
    { field: "address" },
    { field: "facing" },
    { field: "propertyAge" },
    /*{ field: "amenities" },
    { field: "noOfCarParkings" },    
    { field: "furnishedStatus" },
    { field: "askingPrice" },    
    { field: "noOfBeds" },
    { field: "noOfBathRooms" },
    { field: "noOfBalcony" },
    { field: "dimention" },
    { field: "flatFloor" },
    { field: "totalFloors" },
    { field: "noOfFlatsInAFloor" },
    { field: "propertyAge" },
    { field: "noOfLifts" }
    */
  ]);

  const defaultColDef = useMemo(
    () => ({
        width:300,
      sortable: true,
      flex: 1,
      filter: true,
      cellStyle: { textAlign: "left" },
      resizable: true,
    }),
    []
  );

  const refreshData = () => {
    fetch(appBaseURL + "/api/Property")
      .then((result) => result.json())
      .then((rowData: Property[]) => setRowData(rowData))
    .catch((error) => console.log(error));
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
        HeaderText="Property"
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
      <AddNewProperty
        ref={addChildRef}
        OnRefreshHandler={refreshData}
        codeTypes={selectedRowData}
      />
      <DeleteProperty
        ref={deleteChildRef}
        OnRefreshHandler={refreshData}
        codeTypes={selectedRowData}
      />
      <EditProperty
        ref={editChildRef}
        OnRefreshHandler={refreshData}
        codeTypes={selectedRowData}
      />
    </div>
  );
}
