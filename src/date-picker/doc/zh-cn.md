---
category: form
title: DatePicker
subtitle: 日期选择
---
<alert>选择日期的控件。</alert>

## 何时使用

当用户需要选择日期、日期区间以及日期时间，可以点击日期选择框以及指令组件弹出日期面板选择。
## 模块导入
```ts
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';

```
## 如何使用

日期提供组件`thy-date-picker`和指令`thyDatePicker`两种方式选择日期。

## 组件使用

组件有`thy-date-picker`、`thy-month-picker`、`thy-year-picker`和`thy-range-picker`四种类型，基本的使用如下：

```html
日期、月、年选择。

<thy-date-picker [(ngModel)]="date" (ngModelChange)="onChange($event)"></thy-date-picker>
<thy-month-picker [(ngModel)]="dateTime" (ngModelChange)="onChange($event)"></thy-month-picker>
<thy-year-picker [(ngModel)]="dateTime" (ngModelChange)="onChange($event)"></thy-year-picker>

日期范围选择。

<thy-range-picker [(ngModel)]="dateRange" (ngModelChange)="onChange($event)"></thy-range-picker>

日期选择功能，thyShowTime控制选择时间是否展示。

<thy-date-picker
  thyShowTime
  [thyFormat]="dateShowTime | thyDatePickerFormatString"
  thyPlaceHolder="选择时间"
  [(ngModel)]="dateTime"
  (ngModelChange)="onChange($event)"
></thy-date-picker>

```

<examples />

## 全局配置
对于日期选择的快捷选择参数可以支持全局配置，如果需要全局替换默认的配置，可以通过注入令牌为`THY_DATE_PICKER_CONFIG`的值进行配置，如下：
```ts
@NgModule({
    providers: [
        ...
        {
            provide: THY_DATE_PICKER_CONFIG,
            useValue: {
                showShortcut: true,
                shortcutPosition: 'left',
                weekStartsOn: 1,
                shortcutDatePresets: () => {
                    return [
                        {
                            title: '今天',
                            value: startOfDay(new Date()).getTime()
                        }
                    ];
                },
                shortcutRangesPresets: () => {
                    return [
                        {
                            title: '最近 7 天',
                            value: [new TinyDate(subDays(new Date(), 6)).getTime(), new TinyDate().endOfDay().getTime()]
                        },
                        {
                            title: '最近 30 天',
                            value: [new TinyDate(subDays(new Date(), 29)).getTime(), new TinyDate().endOfDay().getTime()]
                        },
                        {
                            title: '本周',
                            value: [new TinyDate().startOfWeek({ weekStartsOn: 1 }).getTime(), new TinyDate().endOfWeek({ weekStartsOn: 1 }).getTime()]
                        }
                    ];
                },
                dateCellRender: (date: Date) => {
                    const formattedDate = format(date, `yyyyMMdd`);

                    const workingDays = ['20230910', '20230925', '20231123'];

                    const restDays = ['20230902', '20230903', '20231124'];

                    let isWorkdays = workingDays.includes(formattedDate);
                    let isHolidays = restDays.includes(formattedDate);

                    if (isWorkdays || isHolidays) {
                        const dateText = date.getDate();
                        const markType = isWorkdays ? `text-success` : `text-danger`;
                        const markText = isWorkdays ? `班` : `休`;
                        const dateCellHtml = `<div class="thy-calendar-date thy-calendar-date-special">${dateText}<div class="special-mark ${markType}">${markText}</div></div>`;
                        return sanitizer.bypassSecurityTrustHtml(dateCellHtml);
                    }

                    return null;
                }
            }
        }
        ...
    ]
})
export class AppModule { }
```
