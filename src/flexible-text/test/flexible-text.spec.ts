import { async, ComponentFixture, TestBed, flush, fakeAsync, tick } from '@angular/core/testing';
import { ThyFlexibleTextModule } from '../flexible-text.module';
import { ThyFlexibleTextComponent } from '../flexible-text.component';
import { Component, ViewChild } from '@angular/core';
import { ThyTooltipModule } from '../../tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MutationObserverFactory } from '@angular/cdk/observers';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'thy-demo-flexible-text',
    template: `
        <thy-flexible-text
            class="flexible-text-section"
            #FlexibleText
            [thyTooltipContent]="tooltipContent"
            [thyTooltipPlacement]="placement"
            [thyTooltipTrigger]="trigger"
            [thyContainerClass]="customContainerClass"
        >
            {{ content }}
        </thy-flexible-text>
    `,
    styles: [
        `
            .flexible-text-section {
                margin-bottom: 20px;
                width: 100px;
                display: block;
            }
            .flexible-text-container {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        `
    ]
})
class FlexibleTextTestComponent {
    @ViewChild('FlexibleText', { static: true }) flexibleText: ThyFlexibleTextComponent;
    tooltipContent = '默认内容。。。';
    placement = 'bottom';
    content = '默认内容。。。';
    trigger = 'click';
    customContainerClass = null;
}

describe('FlexibleTextComponent', () => {
    let componentInstance: FlexibleTextTestComponent;
    let fixture: ComponentFixture<FlexibleTextTestComponent>;

    let callbacks: Function[];
    const invokeCallbacks = (args?: any) => callbacks.forEach(callback => callback(args));

    beforeEach(async(() => {
        callbacks = [];

        TestBed.configureTestingModule({
            imports: [ThyTooltipModule, ThyFlexibleTextModule, BrowserAnimationsModule],
            declarations: [FlexibleTextTestComponent],
            providers: [
                {
                    provide: MutationObserverFactory,
                    useValue: {
                        create: function(callback: Function) {
                            callbacks.push(callback);

                            return {
                                observe: () => {},
                                disconnect: () => {}
                            };
                        }
                    }
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(FlexibleTextTestComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should not overflow when content is less', () => {
        const component = componentInstance.flexibleText;
        expect(component.isOverflow).toBe(false);
    });

    it('should overflow when content is more', fakeAsync(() => {
        const component = componentInstance.flexibleText;
        const content = `周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗`;
        componentInstance.content = content;
        invokeCallbacks();
        fixture.detectChanges();
        tick(100);
        expect(component.isOverflow).toBe(true);
    }));

    it('should change content of thyTooltipDirective when set thyTooltipContent of thy-flexible-text', fakeAsync(() => {
        const component = componentInstance.flexibleText;
        expect(component.tooltipService.thyTooltipDirective.content as string).toBe(componentInstance.tooltipContent);
        const newContent = `新内容。。。`;
        componentInstance.tooltipContent = newContent;
        fixture.detectChanges();
        expect(component.tooltipService.thyTooltipDirective.content as string).toBe(newContent);
    }));

    it('should change placement of thyTooltipDirective when set placement of thy-flexible-text', fakeAsync(() => {
        const component = componentInstance.flexibleText;
        expect(component.tooltipService.thyTooltipDirective.placement).toBe(componentInstance.placement);
        const newPlacement = `left`;
        componentInstance.placement = newPlacement;
        fixture.detectChanges();
        expect(component.tooltipService.thyTooltipDirective.placement).toBe(newPlacement);
    }));

    it('should change placement of thyTooltipDirective when set placement of thy-flexible-text', fakeAsync(() => {
        const component = componentInstance.flexibleText;
        expect(component.tooltipService.thyTooltipDirective.placement).toBe(componentInstance.placement);
        const newPlacement = `left`;
        componentInstance.placement = newPlacement;
        fixture.detectChanges();
        expect(component.tooltipService.thyTooltipDirective.placement).toBe(newPlacement);
    }));

    it('should apply trigger="click"', fakeAsync(() => {
        const component = componentInstance.flexibleText;
        expect(component.tooltipService.thyTooltipDirective.trigger).toBe('click');
    }));

    it('should not contain flexible-text-container when thyContainContainerClass is false', fakeAsync(() => {
        const flexibleTextElement = fixture.debugElement.query(By.css('.flexible-text-section')).nativeElement;
        expect(flexibleTextElement.classList).toContain('flexible-text-container');
        let custom = '';
        componentInstance.customContainerClass = custom;
        fixture.detectChanges();
        expect(flexibleTextElement.classList).not.toContain('flexible-text-container');
        custom = 'custom-container-class';
        componentInstance.customContainerClass = custom;
        fixture.detectChanges();
        expect(flexibleTextElement.classList).toContain(custom);
    }));
});
