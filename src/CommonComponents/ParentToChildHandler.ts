
export type ParentToChildHandler = {
    Action: () => void;
  };
  export type ParentChildHandlerProps = 
  {
    codeTypes:any;   
    OnRefreshHandler(): any; 
  };
  export type LeadManagementHandlerProps = 
  {
    selectedLead:any;       
  };