import { Component, OnInit } from '@angular/core';
import { ThemesConstant, ThemeInterface } from '../../../src/util/theme';
import { ICON_SVG_BASE_URL } from './components/+icon/icon-section.component';
import { ThyIconRegistry } from 'ngx-tethys';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'Tethys';

    loading: Boolean = false;

    currentTheme: any = {};

    themesConstant = ThemesConstant;

    constructor(iconRegistry: ThyIconRegistry, sanitizer: DomSanitizer) {
        const iconSvgUrl = `${ICON_SVG_BASE_URL}/assets/icons/defs/svg/sprite.defs.svg`;
        iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl(iconSvgUrl));
    }

    ngOnInit() {
        document.querySelector('head').appendChild(document.querySelector('#theme'));
        const themeKey = sessionStorage.getItem('theme');
        if (themeKey) {
            this.changeTheme(
                this.themesConstant.find(n => {
                    return n.key === themeKey;
                })
            );
        }
    }

    changeTheme(theme: ThemeInterface) {
        const elm = document.querySelector('#theme') as HTMLLinkElement;
        elm.href = `/assets/css/${theme.key}.min.css`;
        this.currentTheme = theme;
        sessionStorage.setItem('theme', theme.key);
    }
}
