import { InjectionToken, ModelSignal, OutputEmitterRef } from '@angular/core';

export interface IThyCollapseItemComponent {
    thyActive: ModelSignal<boolean>;
    thyActiveChange: OutputEmitterRef<{ active: boolean; event: Event }>;
    markForCheck: () => void;
}

export interface IThyCollapseComponent {
    addPanel: (value: IThyCollapseItemComponent) => void;
    removePanel: (value: IThyCollapseItemComponent) => void;
    click: (collapseItem: IThyCollapseItemComponent, event: Event) => void;
}

export const THY_COLLAPSE_COMPONENT = new InjectionToken<IThyCollapseComponent>('THY_COLLAPSE_COMPONENT');
