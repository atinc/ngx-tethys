import { Component, OnInit } from '@angular/core';
import { ThemesConstant, ThemeInterface } from '../../../src/util/theme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    title = 'Tethys';

    loading: Boolean = false;

    currentTheme: any = {};

    themesConstant = ThemesConstant;

    constructor() { }

    ngOnInit() {
        document.querySelector('head').appendChild(document.querySelector('#theme'));
        const _urlObject = (new URL(location.href)) as any;
        if (_urlObject.searchParams.has('theme')) {
            const urlThemeKey = _urlObject.searchParams.get('theme');
            this.changeTheme(this.themesConstant.find(n => {
                return n.key === urlThemeKey;
            }));
        }
    }

    changeTheme(theme: ThemeInterface) {
        const elm = (document.querySelector('#theme') as HTMLLinkElement);
        elm.href = `/assets/css/${theme.key}.min.css`;
        this.currentTheme = theme;
        history.pushState({}, '', `${location.pathname}?theme=${theme.key}`);
    }

}
