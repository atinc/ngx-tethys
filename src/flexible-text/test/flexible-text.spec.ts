import { MutationObserverFactory } from '@angular/cdk/observers';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { ThyTooltipModule } from '../../tooltip';
import { ThyFlexibleText } from '../flexible-text.component';
import { ThyFlexibleTextModule } from '../flexible-text.module';

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
            [thyTooltipOffset]="offset">
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
            .customer-multiple-line {
                height: 48px;
                display: -webkit-box;
                white-space: normal;
                word-break: break-all;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        `
    ]
})
class FlexibleTextTestComponent {
    @ViewChild('FlexibleText', { static: true }) flexibleText: ThyFlexibleText;
    tooltipContent = '默认内容。。。';
    placement = 'bottom';
    content = '默认内容。。。';
    trigger = 'click';
    offset = 10;
    customContainerClass: string;
    constructor() {}
}

describe('FlexibleTextComponent', () => {
    let componentInstance: FlexibleTextTestComponent;
    let fixture: ComponentFixture<FlexibleTextTestComponent>;

    let callbacks: Function[] = [];
    const invokeCallbacks = (args?: any) => callbacks.forEach(callback => callback(args));
    const fakeResizeObserver = new Subject<void>();

    beforeEach(waitForAsync(() => {
        callbacks = [];
        return TestBed.configureTestingModule({
            imports: [ThyTooltipModule, ThyFlexibleTextModule],
            declarations: [FlexibleTextTestComponent],
            providers: [
                {
                    provide: MutationObserverFactory,
                    useValue: {
                        create: function (callback: Function) {
                            console.log(callback);
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
    }));

    beforeEach(fakeAsync(() => {
        // fake resize observer before create component
        const createResizeSpy = spyOn(ThyFlexibleText, 'createResizeObserver');
        createResizeSpy.and.returnValue(fakeResizeObserver);

        fixture = TestBed.createComponent(FlexibleTextTestComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should not overflow when content is less', () => {
        const component = componentInstance.flexibleText;
        expect(component.isOverflow).toBe(false);
    });

    it('multiple line : should overflow when content is more', fakeAsync(() => {
        const component = componentInstance.flexibleText;
        const content = `周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗`;
        componentInstance.content = content;
        let custom = 'customer-multiple-line';
        componentInstance.customContainerClass = custom;
        invokeCallbacks([{}]);
        fixture.detectChanges();
        tick(100);
        expect(component.isOverflow).toBe(true);
        const flexibleTextElement = fixture.debugElement.query(By.css('.flexible-text-section')).nativeElement;
        expect(flexibleTextElement.clientHeight < flexibleTextElement.scrollHeight).toBe(true);
    }));

    it('single line : should overflow when content is more', fakeAsync(() => {
        const component = componentInstance.flexibleText;
        const content = `周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗`;
        componentInstance.content = content;
        invokeCallbacks([{}]);
        fixture.detectChanges();
        tick(100);
        expect(component.isOverflow).toBe(true);
    }));

    it('should change content of thyTooltipDirective when set thyTooltipContent of thy-flexible-text', () => {
        const component = componentInstance.flexibleText;
        expect(component.tooltipDirective.content as string).toBe(componentInstance.tooltipContent);
        const newContent = `新内容。。。`;
        componentInstance.tooltipContent = newContent;
        fixture.detectChanges();
        expect(component.tooltipDirective.content as string).toBe(newContent);
    });

    it('should change placement of thyTooltipDirective when set placement of thy-flexible-text', () => {
        const component = componentInstance.flexibleText;
        expect(component.tooltipDirective.placement).toBe(componentInstance.placement);
        const newPlacement = `left`;
        componentInstance.placement = newPlacement;
        fixture.detectChanges();
        expect(component.tooltipDirective.placement).toBe(newPlacement);
    });

    it('should change offset of thyTooltipDirective when set offset of thy-flexible-text', () => {
        const component = componentInstance.flexibleText;
        expect(component.tooltipDirective.tooltipOffset).toBe(componentInstance.offset);
        const newOffset = 5;
        componentInstance.offset = newOffset;
        fixture.detectChanges();
        expect(component.tooltipDirective.tooltipOffset).toBe(newOffset);
    });

    it('should apply trigger="click"', () => {
        const component = componentInstance.flexibleText;
        expect(component.tooltipDirective.trigger).toBe('click');
    });

    it('should not contain flexible-text-container when thyContainContainerClass is false', () => {
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
    });

    it('resize change:show update tooltips overflow status when changed size', fakeAsync(() => {
        const component = componentInstance.flexibleText;
        const shortContent = `this is short content message`;
        componentInstance.content = shortContent;
        componentInstance.tooltipContent = shortContent;
        invokeCallbacks([{}]);
        fixture.detectChanges();
        expect(component.isOverflow).toBe(false);
        const flexibleTextElement = fixture.debugElement.query(By.css('.flexible-text-section')).nativeElement;
        flexibleTextElement.style.width = '100px';
        // fake resize observer called
        fakeResizeObserver.next();
        tick(1000);
        expect(component.isOverflow).toBe(true);
        // increase to hide
        flexibleTextElement.style.width = '500px';
        fakeResizeObserver.next();
        tick(1000);
        expect(component.isOverflow).toBe(false);
    }));
});
