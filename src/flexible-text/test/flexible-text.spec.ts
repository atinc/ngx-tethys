import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThyFlexibleTextModule } from '../flexible-text.module';
import { ThyFlexibleTextComponent } from '../flexible-text.component';
import { Component, ViewChild } from '@angular/core';
import { ThyTooltipModule } from '../../tooltip';

@Component({
    selector: 'thy-demo-flexible-text',
    template: `
        <thy-flexible-text
            class="flexible-text-section"
            #FlexibleText
            [thyContent]="item.title"
            [thyPlacement]="item.placement"
        >
            {{ item.title }}
        </thy-flexible-text>
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
    item = {
        title: ``,
        value: 0,
        placement: 'bottom'
    };
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

    it('should hide the tooltip', () => {
        const component = componentInstance.flexibleText;
        expect(component.isOverflow).toBe(false);
    });

    it('should show the tooltip', () => {
        const component = componentInstance.flexibleText;
        componentInstance.item.title = `周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗`;
        fixture.detectChanges();
        component.applyOverflow();
        expect(component.isOverflow).toBe(true);
    });
});
