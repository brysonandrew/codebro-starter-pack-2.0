import {EClientType, ERoleType, ETeamType, IWorkLabel} from './models';
import {workIcon} from '../icons/work';
import {technologyIcon} from '../icons/technology';

export const twoPoreGuys: IWorkLabel = {
    id      : 'twoporeguys-work-svg',
    title   : 'Two Pore Guys',
    link    : 'http://twoporeguys.com',
    color   : "#102e50",
    year    : "2017",
    role: ERoleType.Developer,
    teamType: ETeamType.Individual,
    clientType: EClientType.Company,
    icon: workIcon.phonetrader,
    tech: [
        technologyIcon.html,
        technologyIcon.css,
        technologyIcon.typescript,
        technologyIcon.react
    ],
    description: [
        "This has been the more insteresting job so far working with a team of 5 it has been very challenging and rewarding to meet the goals of the project manager."
    ]
};
