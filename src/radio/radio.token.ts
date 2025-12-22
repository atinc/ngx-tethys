import { InjectionToken, InputSignal } from '@angular/core';

export interface IThyRadioComponent {
    thyValue: InputSignal<string | undefined>;
    thyChecked: boolean;
    setDisabledState?(isDisabled: boolean): void;
}

export interface IThyRadioGroupComponent {
    addRadio(radio: IThyRadioComponent): void;
    updateValue(value: string, emit: boolean): void;
    setGroup(): void;
}

export const THY_RADIO_GROUP_COMPONENT = new InjectionToken<IThyRadioGroupComponent>('THY_RADIO_GROUP_COMPONENT');
