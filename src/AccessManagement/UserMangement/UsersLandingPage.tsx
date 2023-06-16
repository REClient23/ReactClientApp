import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { appBaseURL } from "../../CommonComponents/ApplicationConstants";
import CustomToolBar from "../../CommonComponents/CustomToolBar";
import { ParentToChildHandler } from "../../CommonComponents/ParentToChildHandler";
import { ErrorToaser } from "../../CommonComponents/Toast";
import { User } from "./User";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";


export default function UsersLandingPage() {
  
  const addChildRef = useRef<ParentToChildHandler>(null);
  const deleteChildRef = useRef<ParentToChildHandler>(null);
  const editChildRef= useRef<ParentToChildHandler>(null);
  const [rowData, setRowData] = useState<User[]>();
  const [selectedRowData, setSelectedRowData] = useState<User>();
  const gridRef = useRef<AgGridReact<User>>(null);
  const newdata= useState<User>();

  function onSelectionChanged(event: any) {
    var selectedRows = event.api.getSelectedRows();
    if (selectedRows[0] != null) setSelectedRowData(selectedRows[0]);
    else{
      const codetype:User={name:"",email:"",id:0,phNumber:"",role:""};
      setSelectedRowData(codetype);
    }
     
  }
  
  const onDeleteButtonClick = () => {
    if(selectedRowData === undefined || selectedRowData?.id===0)
    {
      ErrorToaser("Please select a row to delete");
    }
    else
    {
      console.log(selectedRowData);
      deleteChildRef.current?.Action();
    }
  };
  const onEditButtonClick = () => {
    if( selectedRowData === undefined  || selectedRowData?.id===0)
    {
      ErrorToaser("Please select a row to edit");
    }
    else
    {
      editChildRef.current?.Action();
    }
  };

  const [columnDefs, setColumnDefs] = useState([
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "phNumber" },
    { field: "role" },
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
    fetch(appBaseURL + "/api/User")
      .then((result) => result.json())
      .then((rowData: User[]) => setRowData(rowData));
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
        HeaderText="Users"
        OnAddClickHandler={OnAddClickHandler}
        OnEditClickHandler={onEditButtonClick}
        OnDeleteClickHandler={onDeleteButtonClick}
        ModuleName="User"
      />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onSelectionChanged={onSelectionChanged}
        rowSelection="single"
      />
      <AddUser ref={addChildRef} OnRefreshHandler={refreshData}  codeTypes={selectedRowData} />
      <DeleteUser ref={deleteChildRef} OnRefreshHandler={refreshData} codeTypes={selectedRowData} />
      <EditUser ref={editChildRef} OnRefreshHandler={refreshData} codeTypes={selectedRowData} />
    </div>
  );
}
