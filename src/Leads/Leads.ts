export interface Leads{
        LeadId :number,
        Name :string,
        PhNumber :number|any,
        Budget :number,
        Criteria :string,
        LeadStatus :string,
        userId:number
       //  int? Facility 
}

export const newLeaddata = {    LeadId :0,
       Name :"",
       PhNumber :"",
       Budget :0,
       Criteria :"",
       LeadStatus :"",  
       userId:0      
     };