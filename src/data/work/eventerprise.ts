import {EClientType, ERoleType, ETeamType, IWorkLabel} from './models';
import {workIcon} from '../icons/work';
import {technologyIcon} from '../icons/technology';

export const eventerprise: IWorkLabel = {
    id     : 'eventerprise-work-svg',
    title  : 'Eventerprise',
    link   : 'https://www.eventerprise.com/',
    color  : "#0071BA",
    year   : "2016 - 2017",
    teamType: ETeamType.FiveToTen,
    clientType: EClientType.StartUp,
    icon: workIcon.eventerprise,
    role: ERoleType.FrontendDeveloper,
    tech: [
        technologyIcon.html,
        technologyIcon.css,
        technologyIcon.javascript,
        technologyIcon.react,
        technologyIcon.redux,
        technologyIcon.nodeJs
    ],
    description: [
        "After creating a few React components they asked me to make sure that they score a high score with page speed sites that I believe they are still successful with to this day."
    ]
};
