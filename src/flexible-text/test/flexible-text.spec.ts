import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ThyFlexibleTextModule } from '../flexible-text.module';
import { ThyFlexibleTextComponent } from '../flexible-text.component';
import { Component, ViewChild } from '@angular/core';
import { ThyTooltipModule } from '../../tooltip';

@Component({
    selector: 'thy-demo-flexible-text',
    template: `
        <div *ngFor="let item of titles">
            <thy-flexible-text
                class="flexible-text-section"
                #FlexibleText
                [thyContent]="item.title"
                [thyPlacement]="item.placement"
            >
                {{ item.title }}
            </thy-flexible-text>
        </div>
    `,
    styles: [
        `
            .flexible-text-section {
                margin-bottom: 20px;
                max-width: 500px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        `
    ]
})
class FlexibleTextTestComponent {
    @ViewChild('FlexibleText') flexibleText: ThyFlexibleTextComponent;

    titles = [
        {
            title: `周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗`,
            value: 0,
            placement: 'bottom'
        },
        {
            title: `标题未超出一定宽度，tooltip不提示全部内容`,
            value: 1,
            placement: 'top'
        },
        {
            title: `文本内容超出当前所设最大宽度，超出部分省略，并显示省略号，tooltip提示全部内容`,
            value: 2,
            placement: 'top'
        }
    ];
}

describe('FlexibleTextComponent', () => {
    let componentInstance: FlexibleTextTestComponent;
    let fixture: ComponentFixture<FlexibleTextTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyTooltipModule, ThyFlexibleTextModule],
            declarations: [FlexibleTextTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(FlexibleTextTestComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should show and hide the tooltip', fakeAsync(() => {
        const component = componentInstance.flexibleText;
        component.applyOverflow();
        const compEl = component.textContainer.nativeElement;
        if (compEl.clientWidth < compEl.scrollWidth) {
            component.isOverflow = true;
            expect(component.isOverflow).toBe(true);
        } else {
            component.isOverflow = false;
            expect(component.isOverflow).toBe(false);
        }
    }));
});
