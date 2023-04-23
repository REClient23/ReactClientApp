import { Button } from "@blueprintjs/core";
import "./CustomToolBar.css";

interface HeaderParams {
  HeaderText: string;
  OnAddClickHandler(): any;
  IsAddActionVisible: boolean;  
}

const CustomToolBar = (params: HeaderParams) => {  
  var btnclass: string = "toolbarbuttontrue";
  if(params.IsAddActionVisible===false)
  {
    btnclass="toolbarbuttonfalse"
  }
  return (
    <div className="toolbardiv">
      <h3 className="customHeaderLabel"> {params.HeaderText}</h3>
      <Button
        intent="primary"
        icon="add"
        className={btnclass}
        text={params.HeaderText}
        onClick={params.OnAddClickHandler}
      />
    </div>
  );
};
export default CustomToolBar;
