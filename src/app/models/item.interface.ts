export interface Item {
    id: string;
    color: string;
    name: string;
    description: string;
    createDate: Date;
    lastUpdate: Date;
    createdBy: string;
}


export interface ItemCreation {
    name: string,
    color: string,
    description: string;
    createdBy: string;
}