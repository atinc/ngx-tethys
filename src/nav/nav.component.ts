import {
    Component,
    ElementRef,
    Renderer2,
    Input,
    HostBinding
} from '@angular/core';

export type ThyNavType = 'primary' | 'secondary' | 'thirdly';

const navTypeClassesMap: any = {
    primary: ['thy-nav', 'nav-primary'],
    secondary: ['thy-nav', 'nav-secondary'],
    thirdly: ['thy-nav', 'nav-thirdly']
};

@Component({
    selector: 'thy-nav',
    template: `<ng-content></ng-content>`
})
export class ThyNavComponent {
    private _type: ThyNavType;

    @Input()
    set thyType(type: ThyNavType) {
        this._type = type;
        if (navTypeClassesMap[this._type]) {
            this.navClass = navTypeClassesMap[this._type].join(' ');
        }
    }

    @HostBinding('class') navClass = '';
}
