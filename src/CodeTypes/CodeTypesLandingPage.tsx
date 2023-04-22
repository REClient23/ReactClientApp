import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { error } from "console";

function CodeTypesLandingPage() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    { field: "shortCode" },
    { field: "description" }   
  ]);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1,
      filter: true,
    }),
    []
  );
  useEffect(() => {
    fetch("https://cloudapp7ds.azurewebsites.net/api/CodeTypes")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData))
      .catch((error) => console.log(error));
  }, []);
  
  return (
    <div className="ag-theme-alpine" style={{ height: 900 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
export default CodeTypesLandingPage;
