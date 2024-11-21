import { Component, inject, OnInit, Signal } from '@angular/core';
import { ThyDateRangeEntry } from 'ngx-tethys/date-picker';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';
import { ThyDialog } from 'ngx-tethys/dialog';
import { ThyGuider, ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep } from 'ngx-tethys/guider';
import { ThyI18nLocale } from 'ngx-tethys/i18n/i18n';
import { ThyLocaleType, useLocale } from 'ngx-tethys/i18n';
import { ThyTransferItem, TransferDirection } from 'ngx-tethys/transfer';

@Component({
    selector: 'thy-i18n-basic-example',
    templateUrl: `basic.component.html`,
    styles: [
        `
            .box {
                width: 30px;
                height: 30px;
                margin-top: 12px;
                cursor: pointer;
            }
        `
    ]
})
export class ThyI18nBasicExampleComponent implements OnInit {
    // TODO calendar 示例展示异常
    private globalLocale: Signal<ThyI18nLocale> = useLocale();

    private thyDialog = inject(ThyDialog);

    private guider = inject(ThyGuider);

    private guiderOptions: ThyGuiderConfig;

    private customLocale = {
        [ThyLocaleType.zhHans]: {
            monthPlaceholder: '选择月份',
            inputPlaceholder: '输入密码',
            check: '点击检验',
            start: '开始',
            firstStep: '第一步',
            secondStep: '第二步',
            lastStep: '最后一步',
            copy: '点击复制这行文本',
            datasource: '数据源',
            selected: '已选中',
            confirm: '确认',
            confirmContent: '确认要删除这项任务吗？',
            item: '第{index}条数据'
        },
        [ThyLocaleType.zhHant]: {
            monthPlaceholder: '選擇月份',
            inputPlaceholder: '輸入密碼',
            check: '點擊檢驗',
            start: '開始',
            firstStep: '第一步',
            secondStep: '第二步',
            lastStep: '最後一步',
            copy: '點擊複製這行文本',
            datasource: '數據源',
            selected: '已選中',
            confirm: '確認',
            confirmContent: '確認要刪除這項任務嗎？',
            item: '第{index}條數據'
        },
        [ThyLocaleType.enUs]: {
            monthPlaceholder: 'Select month',
            inputPlaceholder: 'Enter password',
            check: 'Click to verify',
            start: 'Start',
            firstStep: 'First step',
            secondStep: 'Second step',
            lastStep: 'Last Step',
            copy: 'Click to copy this text',
            datasource: 'Data source',
            selected: 'Selected',
            confirm: 'Confirm',
            confirmContent: 'Are you sure you want to delete this task?',
            item: 'Item {index}'
        },
        [ThyLocaleType.jaJp]: {
            monthPlaceholder: '月を選択',
            inputPlaceholder: 'パスワードを入力',
            check: '検証するにはクリック',
            start: '開始',
            firstStep: '第一ステップ',
            secondStep: '第二ステップ',
            lastStep: '最後のステップ',
            copy: 'この行のテキストをコピーするにはクリック',
            datasource: 'データソース',
            selected: '選択済み',
            confirm: '確認',
            confirmContent: 'このタスクを削除してもよろしいですか？',
            item: '項目{index}'
        },
        [ThyLocaleType.deDe]: {
            monthPlaceholder: 'Monat auswählen',
            inputPlaceholder: 'Passwort eingeben',
            check: 'Klicken Sie zur Überprüfung',
            start: 'Start',
            firstStep: 'Erster Schritt',
            secondStep: 'Zweiter Schritt',
            lastStep: 'Letzter Schritt',
            copy: 'Klicken Sie, um diese Textzeile zu kopieren',
            datasource: 'Datenquelle',
            selected: 'Ausgewählt',
            confirm: 'Bestätigen',
            confirmContent: 'Sind Sie sicher, dass Sie diese Aufgabe löschen möchten?',
            item: 'Artikel {index}'
        }
    };

    guiderRef: ThyGuiderRef;

    date: DateRangeItemInfo;

    flexibleDateRange: ThyDateRangeEntry;

    locale: any = this.customLocale[ThyLocaleType.zhHans];

    transferData: ThyTransferItem[] = [];

    color = '#ffcd5d';

    strength = 2;

    password = '';

    ngOnInit() {
        const localeId = this.globalLocale().id as ThyLocaleType;
        this.locale = this.customLocale[localeId];
        this.transferData = this.buildTransferData();
        this.guiderOptions = this.getGuiderOptions();
        this.guiderRef = this.guider.create(this.guiderOptions);
    }

    private buildTransferData() {
        const data = [
            {
                id: 1,
                direction: TransferDirection.right
            },
            {
                id: 2,
                direction: TransferDirection.left
            },
            {
                id: 3,
                direction: TransferDirection.left
            },
            {
                id: 4,
                direction: TransferDirection.left
            },
            {
                id: 5,
                direction: TransferDirection.right,
                isLock: true
            }
        ];

        return data.map((item, index) => {
            return {
                ...item,
                title: this.locale?.item.replace('{index}', String(index + 1))
            };
        });
    }

    private getGuiderOptions(): ThyGuiderConfig {
        return {
            steps: [
                {
                    key: 'step-first',
                    data: {
                        image: 'assets/images/guider/start.png',
                        title: '1/3',
                        description: this.locale.firstStep
                    }
                },
                {
                    key: 'step-second',
                    data: {
                        image: 'assets/images/guider/start.png',
                        title: '2/3',
                        description: this.locale.secondStep
                    }
                },
                {
                    key: 'step-end',
                    data: {
                        image: 'assets/images/guider/start.png',
                        title: '3/3',
                        description: this.locale.lastStep
                    },
                    hintPlacement: 'right'
                }
            ] as ThyGuiderStep[]
        };
    }

    openConfirm() {
        this.thyDialog.confirm({
            content: this.locale.confirmContent
        });
    }

    startGuider() {
        this.guiderRef.start();
    }

    login() {}

    cancel() {
        this.password = '';
    }
}
