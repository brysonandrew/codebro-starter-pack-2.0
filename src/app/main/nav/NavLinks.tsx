import * as React from 'react';
import {IPage, MAIN_PAGES} from '../pages';
import {NavLink} from './NavLink';
const s = require('./Nav.css');
import {NavBackIcon} from './NavBackIcon';

interface IProps {
    isSingleMenu: boolean;
    activePagePath: string;
    onAnimationStart?: () => void;
}

export class NavLinks extends React.Component<IProps, {}> {

    private renderNavLinkItems = (page: IPage, i: number) =>  {
        const { isSingleMenu, activePagePath } = this.props;

        if (i > 0) {
            if (isSingleMenu) {
                if (activePagePath === page.path) {
                    return [
                        this.renderNavLink(page, i),
                        <NavBackIcon
                            key={`NavBackIcon-${i}`}
                            onClick={this.props.onAnimationStart}
                        />
                    ];
                }
            } else {
                return this.renderNavLink(page, i);
            }
        }
    };

    private renderNavLink(page: IPage, i: number) {
        const { isSingleMenu, onAnimationStart } = this.props;

        return  <NavLink
                    key={`link-${i}`}
                    isCircleDisabled={isSingleMenu}
                    name={page.name}
                    path={page.path}
                    onClick={onAnimationStart}
                />
    }

    render(): JSX.Element {
        const { isSingleMenu } = this.props;

        return (
            <ul className={`${s.navLinks} ${isSingleMenu ? s.singleMenu : ''}`}>
                {MAIN_PAGES.map(this.renderNavLinkItems)}
            </ul>
        );
    }
}
