---
category: display
title: Empty
subtitle: 空状态
description: 空状态时的展示占位组件。
---

<alert>空状态时的展示占位组件。</alert>

## 何时使用

没有提供数据时，用于显式的用户提示。

## 模块导入
```ts
import { ThyEmptyModule } from "ngx-tethys/empty";
```

## 如何使用
```html
<thy-empty></thy-empty>
```
展示效果：
<example name="thy-empty-basic-example">

## 全局配置
需要导入多语言模块，并配置默认显示的文本提示信息。
```ts
import { ThyTranslate } from 'ngx-tethys';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
    imports: [
        ...
        TranslateModule.forRoot()
        ...
    ],
    providers: [
        ...
         {
            provide: ThyTranslate,
            useFactory: (translate: TranslateService) => {
                return {
                    instant(key: string | Array<string>, interpolateParams?: Object): string | any {
                        return translate.instant(key, interpolateParams);
                    },
                    get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
                        return translate.get(key, interpolateParams);
                    }
                };
            },
            deps: [TranslateService]
        }
        ...
    ]
})
export class AppModule { 
    constructor(private translate: TranslateService) {
        translate.use('zh-cn');
        translate.setTranslation('zh-cn', {
            common: {
                tips: {
                    NO_RESULT: '没有数据', // 配置默认文本提示信息
                    NO_RESULT_TARGET: '没有{{target}}' // 配置传入 thyEntityName 或  thyEntityNameTranslateKey 时的提示信息，例：暂无 {{target}}，其中 {{target}} 为传入的 thyEntityName 或 thyEntityNameTranslateKey 值
                }
            },
            mission: { // 配置传入thyEntityNameTranslateKey时的提示信息
                PROJECT: '项目',
                TASK: '任务'
            }
        });
    }
}
```



