import { InjectionToken } from '@angular/core';

export interface IThyAnchorLinkComponent {}

export interface IThyAnchorComponent {
    registerLink(link: IThyAnchorLinkComponent): void;
    unregisterLink(link: IThyAnchorLinkComponent): void;
    handleScrollTo(linkComponent: IThyAnchorLinkComponent): void;
}

export const THY_ANCHOR_COMPONENT = new InjectionToken<IThyAnchorComponent>('THY_ANCHOR_COMPONENT');
