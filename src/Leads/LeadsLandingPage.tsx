import { useState, useRef, useEffect, useMemo, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CustomToolBar from "../CommonComponents/CustomToolBar";
import { leadRelative} from "../CommonComponents/ApplicationConstants";
import { ErrorToaser } from "../CommonComponents/Toast";
import { Leads } from "./Leads";
import { ParentToChildHandler } from "../CommonComponents/ParentToChildHandler";
import EditLead from "./EditLead";
import DeleteLeadValues from "./DeleteLeadValues";
import AddNewLeadValues from "./AddNewLead";
import { GetData } from "../CommonComponents/APICalls";
import { AppContext } from "../States/AppProvider";
function LeadsLandingPage() {

  const { state } = useContext(AppContext);
  const [rowData, setRowData] = useState();
  const addChildRef = useRef<ParentToChildHandler>(null);
  const deleteChildRef = useRef<ParentToChildHandler>(null);
  const editChildRef= useRef<ParentToChildHandler>(null);
  const [selectedRowData, setSelectedRowData] = useState<Leads>();
  const leads: Leads = { PhNumber: "", LeadStatus: "",Name:"", Budget:0, Criteria:"",LeadId:0,userId:0};

  const [columnDefs, setColumnDefs] = useState([
    { field: "leadId" },
    { field: "name" },
    { field: "phNumber" },
    { field: "budget" },
    { field: "criteria" },
    { field: "leadStatus" },
    { field: "userId" },
    // { field: "previousSchedule" },
    // { field: "nextSchedule" },
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
    const apiCalls = {apiUrl:leadRelative + `/${state.user.email}` + `/${state.user.role}`} 
    const resp = GetData(apiCalls);
    resp.then((response)=>setRowData(response));    
  };
  useEffect(() => refreshData(), []);

  function onSelectionChanged(event: any) {
    var selectedRows = event.api.getSelectedRows();
    if (selectedRows[0] != null) setSelectedRowData(selectedRows[0]);
    else{
      console.log("Not selected anything.. Assigning null")
      setSelectedRowData(leads);
    }
    console.log("Selected row is:")
     console.log(selectedRowData)
  }


  const onDeleteButtonClick = () => {
    if(selectedRowData === undefined)
    {
      ErrorToaser("Please select a row to delete");
    }
    else
    {
      deleteChildRef.current?.Action();
    }
  };
  const onEditButtonClick = () => {
    if( selectedRowData === undefined)
    {
      ErrorToaser("Please select a row to edit");
    }
    else
    {      
      editChildRef.current?.Action();
    }
  };
  const OnAddClickHandler = () => {
    if(selectedRowData===undefined){
      setSelectedRowData(leads);
    }
    addChildRef.current?.Action();
    
  };
  return (
    <div className="ag-theme-alpine" style={{ height: 900 }}>
      <CustomToolBar
        HeaderText="Leads"
        OnAddClickHandler={OnAddClickHandler}
        OnEditClickHandler={onEditButtonClick}
        OnDeleteClickHandler={onDeleteButtonClick}
        ModuleName="LEADS"      
      />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onSelectionChanged={onSelectionChanged}
        rowSelection="single"
      />
      <AddNewLeadValues ref={addChildRef} OnRefreshHandler={refreshData}  codeTypes={selectedRowData} />
      <DeleteLeadValues ref={deleteChildRef} OnRefreshHandler={refreshData} codeTypes={selectedRowData} />
      
      <EditLead ref={editChildRef} OnRefreshHandler={refreshData} codeTypes={selectedRowData} />
    </div>
  );
}
export default LeadsLandingPage;