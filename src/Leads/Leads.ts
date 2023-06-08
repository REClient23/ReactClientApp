export interface Leads{
         LeadId :number,
         Name :string,
         PhNumber :number|any,
         Budget :number,
         Criteria :string,
         LeadStatus :string,
         UserId:number
        //  int? Facility 
}

export const newLeaddata = {    LeadId :0,
        Name :"",
        PhNumber :"",
        Budget :0,
        Criteria :"",
        LeadStatus :"",  
        UserId:0      
      };