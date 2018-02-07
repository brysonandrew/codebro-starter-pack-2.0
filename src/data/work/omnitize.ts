import {EClientType, ERoleType, ETeamType, IWorkLabel} from './models';
import {workIcon} from '../icons/work';
import {technologyIcon} from '../icons/technology';

export const omnitize: IWorkLabel = {
    id      : 'omnitize-work-svg',
    title   : 'Omnitize',
    link    : 'https://www.omnitize.com/',
    color   : "#00c2b2",
    year    : "2017",
    role: ERoleType.Developer,
    teamType: ETeamType.TwoToFive,
    clientType: EClientType.StartUp,
    icon: workIcon.phonetrader,
    tech: [
        technologyIcon.html,
        technologyIcon.css,
        technologyIcon.svg,
        technologyIcon.typescript,
        technologyIcon.react,
        technologyIcon.redux,
        technologyIcon.nodeJs,
        technologyIcon.mongoDb,
        technologyIcon.firebase
    ],
    description: [
        "This has been the more interesting job so far working with a team of 5 it has been very challenging and rewarding to meet the goals of the project manager."
    ]
};
