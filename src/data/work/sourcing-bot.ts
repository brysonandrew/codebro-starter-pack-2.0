import {EClientType, ERoleType, ETeamType, IWorkLabel} from './models';
import {workIcon} from '../icons/work';
import {technologyIcon} from '../icons/technology';

export const sourcingBot: IWorkLabel = {
    id      : 'sourcingbot-work-svg',
    title   : 'Sourcing Bot',
    link    : 'https://srcbot-web-app.herokuapp.com/',
    color   : "#40a0f5",
    year    : "2017",
    role: ERoleType.Developer,
    teamType: ETeamType.TwoToFive,
    clientType: EClientType.StartUp,
    icon: workIcon.phonetrader,
    tech: [
        technologyIcon.html,
        technologyIcon.css,
        technologyIcon.typescript,
        technologyIcon.react,
        technologyIcon.redux,
        technologyIcon.nodeJs
    ],
    description: [
        "This has been the more interesting job so far working with a team of 5 it has been very challenging and rewarding to meet the goals of the project manager."
    ]
};
