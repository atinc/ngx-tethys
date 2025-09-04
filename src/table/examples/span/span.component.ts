import { afterNextRender, afterRender, AfterViewInit, Component, computed, inject, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';

function perfTracker() {
    let lastDate = new Date().getTime();
    return {
        add(name: string) {
            const current = new Date().getTime();
            console.log(`=======flexible-text======= [${name}] ${current}, duration: ${current - lastDate}`);
            lastDate = current;
        },
        reset(name: string) {
            const current = new Date().getTime();
            console.log(`=======flexible-text======= [${name}] ${current}`);
            lastDate = current;
        }
    };
}

@Component({
    selector: 'thy-table-span-example',
    templateUrl: './span.component.html',
    host: {
        class: 'd-block w-100'
    },
    imports: [ThyFlexibleText, ThyButton]
})
export class ThyTableSpanExampleComponent implements OnInit, AfterViewInit, OnDestroy {
    private ngZone = inject(NgZone);

    loadingDone = signal(false);
    private dataSignal = signal<any[]>([]);

    // 使用计算属性优化数据访问
    readonly data = computed(() => this.dataSignal());

    perfTracker = perfTracker();

    private performanceMetrics = {
        initStartTime: 0,
        initEndTime: 0,
        renderStartTime: 0,
        renderEndTime: 0,
        memoryUsage: 0
    };

    private names = [
        'Beijing Dong Sheng Technology Building, Haidian District',
        'Shanghai Lujiazui Financial Center, Pudong New Area',
        'Guangzhou Tianhe Software Park, Tianhe District',
        'Shenzhen Nanshan Hi-tech Industrial Park',
        'Hangzhou West Lake Digital Town, Xihu District',
        'Nanjing Jiangning Development Zone, Jiangning District',
        'Chengdu High-tech Zone, Wuhou District',
        'Wuhan East Lake High-tech Development Zone',
        'Xian Economic and Technological Development Zone',
        'Tianjin Binhai New Area Technology Park',
        'Qingdao West Coast New Area Innovation Center',
        'Dalian High-tech Industrial Zone, Ganjingzi District',
        'Suzhou Industrial Park, Wujiang District',
        'Ningbo National High-tech Zone, Jiangbei District',
        'Foshan Chancheng Innovation Center',
        'Dongguan Songshan Lake Science and Technology Park',
        'Zhongshan Torch High-tech Industrial Development Zone',
        'Jinan High-tech Industrial Development Zone',
        'New Industrial Park, Shushan, Hefei, Anhui',
        'Changsha High-tech Development Zone, Yuelu District',
        'Kunming High-tech Industrial Development Zone, Kunming',
        'Nanning Border Trade Systems, Nanning',
        'Harbin Winter Tech Solutions, Harbin',
        'Shenyang Heavy Industry Tech, Shenyang',
        'Changchun Automotive Technology, Changchun',
        'Shijiazhuang Logistics Systems, Shijiazhuang',
        'Taiyuan Energy Solutions, Taiyuan',
        'Hohhot Grassland Technology, Hohhot',
        'Yinchuan Desert Innovation, Yinchuan',
        'Xining Plateau Systems, Xining',
        'Urumqi Silk Road Technology, Urumqi',
        'Lhasa High Altitude Solutions, Lhasa',
        'Haikou Tropical Tech, Haikou',
        'Sanya Tourism Technology, Sanya',
        'Macau Gaming Systems, Macau',
        'Hong Kong Finance Technology, Hong Kong'
    ];

    properties = [
        // Basic Information
        { key: 'name', id: 1, width: 100 },
        { key: 'email', id: 2, width: 100 },
        { key: 'phone', id: 3, width: 100 },
        { key: 'mobile', id: 4, width: 100 },
        { key: 'fax', id: 5, width: 100 },
        { key: 'address', id: 6, width: 100 },
        { key: 'street', id: 7, width: 100 },
        { key: 'city', id: 8, width: 100 },
        { key: 'state', id: 9, width: 100 },
        { key: 'country', id: 10, width: 100 },
        { key: 'zipCode', id: 11, width: 100 },
        { key: 'postalCode', id: 12, width: 100 },
        { key: 'homeAddress', id: 13, width: 100 },
        { key: 'workAddress', id: 14, width: 100 },
        { key: 'emergencyContact', id: 15, width: 100 },
        { key: 'website2', id: 16, width: 100 },
        { key: 'website3', id: 17, width: 100 },
        { key: 'website4', id: 18, width: 100 },
        { key: 'website5', id: 19, width: 100 },
        { key: 'website6', id: 20, width: 100 }
    ];

    constructor() {
        this.perfTracker.add('constructor');
        afterNextRender(() => {
            this.perfTracker.add('afterNextRender');
        });
        // 注释掉 afterRender 以避免无限循环
        afterRender(() => {
            this.perfTracker.add('afterRender');
        });
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {}

    private generateMockData(): void {
        this.performanceMetrics.renderStartTime = performance.now();

        // 批量生成数据，减少单次操作开销
        const newData: any[] = [];
        const currentTime = Date.now();

        for (let i = 1; i <= 20000; i++) {
            const nameIndex = Math.floor(Math.random() * this.names.length);

            // Generate varied names by combining or extending existing ones
            let name = this.names[nameIndex];
            if (Math.random() > 0.7) {
                name = name + ' ' + this.names[Math.floor(Math.random() * this.names.length)];
            }

            newData.push({
                id: i + currentTime,
                name: name,
                age: Math.floor(Math.random() * 40) + 22 // Age between 22-61
            });
        }

        // 一次性更新数据，触发单次变更检测
        this.dataSignal.set(newData);
    }

    refresh() {
        this.perfTracker.add('refresh');
        this.loadingDone.set(false);
        setTimeout(() => {
            this.generateMockData();
            this.loadingDone.set(true);
            this.perfTracker.reset('refresh');
        }, 0);
    }
}
