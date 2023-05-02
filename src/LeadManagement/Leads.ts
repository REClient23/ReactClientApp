export default class Leads {
    leadId: string;
    name: string;
    phNumber: string;
    budget: string;
    leadStatus: string;
    constructor(leadId: string, name: string, phNumber: string, budget: string, leadStatus: string) {
        this.leadId = leadId;
        this.name = name;
        this.phNumber = phNumber;
        this.budget = budget;
        this.leadStatus = leadStatus;
    }
}