---
category: general
title: I18n
subtitle: 国际化
---

<alert>I18n 国际化</alert>

## 何时使用
当需要使用国际化文案时。<br/>
目前支持 简体中文`zh-cn | zh-hans`、繁體中文`zh-hant`、English`en-us`、日本語`ja-jp`、Deutsch`de-de`。



## 动态设置语言
使用 `ThyI18nService` 服务的 `setLocale` 方法动态切换语言。
```ts
import { ThyI18nService } from 'ngx-tethys/i18n';

@Component({
    selector: 'thy-set-locale-example',
    template: ``
})
export class AppComponent {
    i18n = inject(ThyI18nService);

    switchLocale(localeId: string) {
        this.i18n.setLocale(localeId);
    }
}

```

## 获取当前语言包
使用 `useLocale` 函数获取当前语言包。
```ts
import { useLocale, ThyI18nLocale } from 'ngx-tethys/i18n';

@Component({
    selector: 'thy-use-locale-example',
    template: `
        <div>当前语言包：{{ locale().id }}</div>
    `
})
export class ThyI18nUseLocaleExampleComponent {
    locale: Signal<ThyI18nLocale> = useLocale();
}
```


## 获取指定组件的语言包
使用 `injectLocale` 函数获取当前语言包。
```ts
import { injectLocale, ThyCalendarLocale } from 'ngx-tethys/i18n';

@Component({
    selector: 'thy-inject-locale-example',
    template: `
        <div>{{ date | thyDatePickerFormat: locale().dateFormat }}</div>
    `
})
export class ThyI18nInjectLocaleExampleComponent {
    date = new Date();
    locale: Signal<ThyCalendarLocale> = injectLocale('datePicker');
}
```


## 全局配置
全局的默认语言包可以通过在应用根模块中为`THY_I18N_LOCALE_ID`令牌提供`zh-hans`、`zh-hant`、`en-us`、`ja-jp`或`de-de`来设置。
另外，支持通过为`THY_I18N_ZH_HANS`、`THY_I18N_ZH_HANT`、`THY_I18N_EN_US`、`THY_I18N_JA_JP`、`THY_I18N_DE_DE`令牌注入值来重写相应的语言包。
```ts
import { THY_I18N_LOCALE_ID, THY_I18N_ZH_HANS, THY_I18N_EN_US,  zhHansLocale, enUsLocale,  ThyLocaleType } from 'ngx-tethys/i18n';

@NgModule({
    imports: [CommonModule],
    providers: [
        {
            provide: THY_I18N_LOCALE_ID,
            useValue: ThyLocaleType.enUs
        },
        {
            provide: THY_I18N_ZH_HANS,
            useValue: {
                ...zhHansLocale,
                calendar: {
                    today: '今日'
                }
            }
        },
        {
            provide: THY_I18N_EN_US,
            useValue: {
                ...enUsLocale,
                guider: {
                    ...enUsLocale.guider,
                    next: 'Next'
                }
            }
        }
    ]
})
export class AppModule {}
```



