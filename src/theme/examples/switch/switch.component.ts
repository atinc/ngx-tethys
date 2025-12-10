import { Component, inject, OnInit } from '@angular/core';
import { ThyTheme, ThyThemeStore } from 'ngx-tethys/core';
import { ThySegment, ThySegmentEvent, ThySegmentItem } from 'ngx-tethys/segment';

const THEME_CACHE_KEY = 'docgeni-theme';

@Component({
    selector: 'thy-theme-switch-example',
    templateUrl: './switch.component.html',
    imports: [ThySegment, ThySegmentItem]
})
export class ThyThemeSwitchExampleComponent implements OnInit {
    activeIndex: number = 0;

    theme!: ThyTheme;

    themes = [ThyTheme.light, ThyTheme.dark, ThyTheme.system];

    themesMap = {
        [ThyTheme.light]: {
            index: 0,
            key: ThyTheme.light,
            name: '亮色主题'
        },
        [ThyTheme.dark]: {
            index: 1,
            key: ThyTheme.dark,
            name: '暗黑主题'
        },
        [ThyTheme.system]: {
            index: 2,
            key: ThyTheme.system,
            name: '跟随系统'
        }
    };

    private thyThemeStore = inject(ThyThemeStore);

    ngOnInit(): void {
        this.theme = this.getCacheTheme();
        this.activeIndex = this.themesMap[this.theme].index;
        this.thyThemeStore.setTheme(this.theme);
    }

    private getCacheTheme(): ThyTheme {
        const cacheTheme = window.localStorage.getItem(THEME_CACHE_KEY) as ThyTheme;
        if (cacheTheme && this.themes.includes(cacheTheme)) {
            return cacheTheme;
        } else {
            return ThyTheme.light;
        }
    }

    switchTheme(event: ThySegmentEvent<ThyTheme>) {
        this.theme = event.value;
        this.activeIndex = event.activeIndex;

        window.localStorage.setItem(THEME_CACHE_KEY, this.theme);
        this.thyThemeStore.setTheme(this.theme);

        if (this.thyThemeStore.isDark()) {
            document.documentElement.setAttribute('theme', ThyTheme.dark);
            document.documentElement.style.setProperty('color-scheme', 'dark'); // 滚动条也实现主题切换
        } else {
            document.documentElement.removeAttribute('theme');
            document.documentElement.style.removeProperty('color-scheme');
        }
    }
}
