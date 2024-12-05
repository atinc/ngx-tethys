import { Component, inject, OnInit, Signal } from '@angular/core';
import { ThyDateRangeEntry } from 'ngx-tethys/date-picker';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';
import { ThyDialog } from 'ngx-tethys/dialog';
import { ThyGuider, ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep } from 'ngx-tethys/guider';
import { ThyI18nLocale } from 'ngx-tethys/i18n/i18n';
import { injectLocale, ThyLocaleType } from 'ngx-tethys/i18n';
import { ThyTransferItem, TransferDirection } from 'ngx-tethys/transfer';
import { ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-i18n-basic-example',
    templateUrl: `basic.component.html`
})
export class ThyI18nBasicExampleComponent implements OnInit {
    private globalLocale: Signal<ThyI18nLocale> = injectLocale();

    private thyDialog = inject(ThyDialog);

    private guider = inject(ThyGuider);

    private guiderOptions: ThyGuiderConfig;

    private localeMap = {
        [ThyLocaleType.zhHans]: {
            monthPlaceholder: '选择月份',
            inputPlaceholder: '输入密码',
            autocompletePlaceholder: '请输入',
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
            tranferItem: '第{index}条数据',
            navItem: '导航 {index}'
        },
        [ThyLocaleType.zhHant]: {
            monthPlaceholder: '選擇月份',
            inputPlaceholder: '輸入密碼',
            autocompletePlaceholder: '請輸入',
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
            tranferItem: '第{index}條數據',
            navItem: '導航 {index}'
        },
        [ThyLocaleType.enUs]: {
            monthPlaceholder: 'Select month',
            inputPlaceholder: 'Enter password',
            autocompletePlaceholder: 'Please enter',
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
            tranferItem: 'Item {index}',
            navItem: 'Navigation {index}'
        },
        [ThyLocaleType.jaJp]: {
            monthPlaceholder: '月を選択',
            inputPlaceholder: 'パスワードを入力',
            autocompletePlaceholder: '入力してください',
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
            tranferItem: '項目{index}',
            navItem: 'ナビゲーション {index}'
        },
        [ThyLocaleType.deDe]: {
            monthPlaceholder: 'Monat auswählen',
            inputPlaceholder: 'Passwort eingeben',
            autocompletePlaceholder: 'Bitte eingeben',
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
            tranferItem: 'Artikel {index}',
            navItem: 'Navigation {index}'
        }
    };

    guiderRef: ThyGuiderRef;

    date: DateRangeItemInfo;

    flexibleDateRange: ThyDateRangeEntry;

    locale: any = this.localeMap[ThyLocaleType.zhHans];

    transferItems: ThyTransferItem[] = [];

    navItems: { name: string; index: number }[] = [];

    autocompleteItems: Array<{ label: string; value: string }> = [];

    activeIndex = 12;

    color = '#ffcd5d';

    strength = 2;

    password = '';

    value = '';

    ngOnInit() {
        const localeId = this.globalLocale().id as ThyLocaleType;
        this.locale = this.localeMap[localeId];

        this.navItems = this.buildNavItems();
        this.transferItems = this.buildTransferItems();
        this.guiderOptions = this.getGuiderOptions();
        this.guiderRef = this.guider.create(this.guiderOptions);
    }

    private buildTransferItems() {
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
                title: this.locale?.tranferItem.replace('{index}', String(index + 1))
            };
        });
    }

    private buildNavItems() {
        return Array.from({ length: 13 }, (_, index) => {
            return {
                name: this.locale?.navItem.replace('{index}', String(index + 1)),
                index: index + 1
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

    navItemClick(item: ThyNavItemDirective) {
        item.elementRef.nativeElement.click();
    }

    startGuider() {
        this.guiderRef.start();
    }

    login() {}

    cancel() {
        this.password = '';
    }
}
