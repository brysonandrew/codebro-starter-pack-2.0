import {ILabelInfo} from '../models';

export enum ECreationType {
    Website = "Website",
    Wizard = "Wizard",
    AdminPanel = "Admin Panel",
    Table = "Table"
}

export enum ETeamType {
    Individual = "Lone Wolf",
    TwoToFive = "2 - 5",
    FiveToTen = "5 - 10"
}

export enum EClientType {
    StartUp = "Start Up",
    Company = "Company",
    Individual = "Private"
}

export enum ERoleType {
    FrontendDeveloper = "Frontend Developer",
    Developer = "Developer"
}

export interface IWorkLabel extends ILabelInfo {
    year: string;
    color: string;
    link: string;
    creation: ECreationType;
    role: ERoleType;
    teamType: ETeamType;
    clientType: EClientType;
    tech: JSX.Element[];
    description: string[];
}
