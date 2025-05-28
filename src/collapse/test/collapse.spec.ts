import { ThyCollapse, ThyCollapseItem, ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyIcon, ThyIconModule } from 'ngx-tethys/icon';
import { dispatchFakeEvent, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

@Component({
    template: `
        <thy-collapse [thyAccordion]="accordion" [thyTheme]="theme" [thyArrowIconPosition]="position">
            <thy-collapse-panel thyTitle="这是一个头部标题">isAccording</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题2">内容区域2</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题3">内容区域3</thy-collapse-panel>
        </thy-collapse>
    `,
    imports: [ThyCollapseModule, ThyIconModule, CommonModule]
})
export class TestCollapseBasicComponent {
    accordion = false;

    theme = 'divided';

    position = 'left';

    ghost = false;
}

@Component({
    template: `
        <thy-collapse>
            <thy-collapse-panel [thyTitle]="title" [thyDisabled]="disabled" [thyActive]="active">内容区域0</thy-collapse-panel>
            <thy-collapse-panel [thyHeaderTemplate]="headerTemplate">内容区域1</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题1" [thyArrowIcon]="'bell'">内容区域1</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题0" [thyArrowIcon]="headerIconTemplate">内容区域2</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题4" [thyExtra]="extraTemplate">内容区域3</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题2">内容区域4</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题3">内容区域5</thy-collapse-panel>
            <thy-collapse-panel id="without-arrow-icon" thyTitle="without-arrow-icon" [thyArrowIcon]="null">内容区域5</thy-collapse-panel>
        </thy-collapse>
        <ng-template #headerTemplate>
            <div class="header-template">头部模板</div>
        </ng-template>
        <ng-template #headerIconTemplate>
            <thy-icon [thyIconName]="'clock-circle'" class="template-icon"></thy-icon>
        </ng-template>
        <ng-template #extraTemplate>
            <thy-icon class="extra-template" thyIconName="settings" (click)="$event.stopPropagation()"></thy-icon>
        </ng-template>
    `,
    imports: [ThyCollapseModule, ThyIconModule, CommonModule]
})
export class TestCollapsePanelBasicComponent {
    title = '默认标题';

    disabled = false;

    showArrow = true;

    active = false;
}

function assertRenderIconRotate(debugElementOfIcon: DebugElement) {
    const svg = debugElementOfIcon.componentInstance.elementRef.nativeElement.querySelector('svg') as HTMLElement;
    expect(svg).toBeTruthy();
    expect(svg.style['transform']).toBeTruthy();
}

describe('collapse', () => {
    describe('basic', () => {
        let component: TestCollapseBasicComponent;
        let fixture: ComponentFixture<TestCollapseBasicComponent>;
        let debugElement: DebugElement;
        let icon: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [provideHttpClient(), provideAnimations()]
            }).compileComponents();
            injectDefaultSvgIconSet();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCollapseBasicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            debugElement = fixture.debugElement.query(By.directive(ThyCollapse));
            icon = fixture.debugElement.query(By.directive(ThyIcon));
        });

        it('should create collapse component', () => {
            expect(component).toBeTruthy();
            expect(debugElement.nativeElement.classList).toContain('thy-collapse');
        });

        it('should collapse expand more than one panel default', () => {
            const panelHeaders = debugElement.queryAll(By.css('.thy-collapse-header'));
            const activeClass = debugElement.queryAll(By.css('.thy-collapse-item-active'));
            expect(activeClass.length).toBe(0);
            dispatchFakeEvent(panelHeaders[0].nativeElement, 'click');
            fixture.detectChanges();

            const activeClass1 = debugElement.queryAll(By.css('.thy-collapse-item-active'));
            expect(activeClass1.length).toBe(1);

            dispatchFakeEvent(panelHeaders[1].nativeElement, 'click');
            fixture.detectChanges();

            const activeClass2 = debugElement.queryAll(By.css('.thy-collapse-item-active'));
            expect(activeClass2.length).toBe(2);
            fixture.detectChanges();
            assertRenderIconRotate(icon);
        });

        it('should collapse only expand one panel when thyAccordion is true', () => {
            component.accordion = true;
            fixture.detectChanges();

            const panelHeaders = debugElement.queryAll(By.css('.thy-collapse-header'));
            const activeClass = debugElement.queryAll(By.css('.thy-collapse-item-active'));
            expect(activeClass.length).toBe(0);
            dispatchFakeEvent(panelHeaders[0].nativeElement, 'click');
            fixture.detectChanges();

            const activeClass1 = debugElement.queryAll(By.css('.thy-collapse-item-active'));
            expect(activeClass1.length).toBe(1);

            dispatchFakeEvent(panelHeaders[1].nativeElement, 'click');
            fixture.detectChanges();

            const activeClass2 = debugElement.queryAll(By.css('.thy-collapse-item-active'));
            expect(activeClass2.length).toBe(1);
            fixture.detectChanges();
        });

        it('should collapse not have thy-collapse-bordered class default', () => {
            const borderedClass = fixture.debugElement.query(By.css('.thy-collapse-bordered'));
            expect(borderedClass).toBeFalsy();
            expect(debugElement.nativeElement.classList).not.toContain('thy-collapse-bordered');
        });

        it('should collapse have thy-collapse-bordered class when theme is bordered', () => {
            fixture.detectChanges();
            component.theme = 'bordered';

            fixture.detectChanges();

            const borderedClass = fixture.debugElement.query(By.css('.thy-collapse-bordered'));
            expect(borderedClass).toBeTruthy();
            expect(debugElement.nativeElement.classList).toContain('thy-collapse-bordered');
        });

        it('should collapse have thy-collapse-icon-position-left class default', () => {
            const positionLeft = fixture.debugElement.query(By.css('.thy-collapse-icon-position-left'));
            expect(positionLeft).toBeTruthy();
            expect(debugElement.nativeElement.classList).toContain('thy-collapse-icon-position-left');
        });

        it('should collapse have position class correct', () => {
            fixture.detectChanges();
            component.position = 'right';
            fixture.detectChanges();

            const positionLeft = fixture.debugElement.query(By.css('.thy-collapse-icon-position-left'));
            expect(positionLeft).toBeFalsy();
            expect(debugElement.nativeElement.classList).not.toContain('thy-collapse-icon-position-left');
            expect(debugElement.nativeElement.classList).toContain('thy-collapse-icon-position-right');
        });

        it('should collapse have thy-collapse-ghost class default', () => {
            const positionLeft = fixture.debugElement.query(By.css('.thy-collapse-ghost'));
            expect(positionLeft).toBeFalsy();
            expect(debugElement.nativeElement.classList).not.toContain('thy-collapse-ghost');
        });

        it('should collapse have thy-collapse-ghost class when theme is ghost', () => {
            fixture.detectChanges();
            component.theme = 'ghost';
            fixture.detectChanges();

            const positionLeft = fixture.debugElement.query(By.css('.thy-collapse-ghost'));
            expect(positionLeft).toBeTruthy();
            expect(debugElement.nativeElement.classList).toContain('thy-collapse-ghost');
        });
    });
});

fdescribe('collapse-panel', () => {
    describe('basic', () => {
        let component: TestCollapsePanelBasicComponent;
        let fixture: ComponentFixture<TestCollapsePanelBasicComponent>;
        let icon: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [provideHttpClient(), provideAnimations()]
            }).compileComponents();
            injectDefaultSvgIconSet();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCollapsePanelBasicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            icon = fixture.debugElement.query(By.directive(ThyIcon));
        });

        it('should create collapse and collapse-panel component', () => {
            expect(component).toBeTruthy();
            const collapse = fixture.debugElement.query(By.css('.thy-collapse'));
            expect(collapse).toBeTruthy();
            const collapsePanel = fixture.debugElement.query(By.css('.thy-collapse-item'));
            expect(collapsePanel).toBeTruthy();
        });

        it('should not have thy-collapse-item-disabled when thyDisabled is false default', () => {
            const collapseDisabled = fixture.debugElement.query(By.css('.thy-collapse-item-disabled'));
            expect(collapseDisabled).toBeFalsy();
        });

        it('should have thy-collapse-item-disabled when thyDisabled is true', () => {
            component.disabled = true;
            fixture.detectChanges();

            const collapseDisabled = fixture.debugElement.query(By.css('.thy-collapse-item-disabled'));
            expect(collapseDisabled).toBeTruthy();

            //点击禁用 不包含 thy-collapse-item-active
            dispatchFakeEvent(collapseDisabled.children[0].nativeElement, 'click');
            fixture.detectChanges();
            expect(collapseDisabled.nativeElement.classList).not.toContain('thy-collapse-item-active');

            //点击非禁用 包含 thy-collapse-item-active
            const collapsePanels = fixture.debugElement.queryAll(By.css('.thy-collapse-item'));
            dispatchFakeEvent(collapsePanels[5].children[0].nativeElement, 'click');
            fixture.detectChanges();
            expect(collapsePanels[5].nativeElement.classList).toContain('thy-collapse-item-active');

            assertRenderIconRotate(icon);
        });

        it('should have thy-collapse-no-arrow with arrowIcon null', () => {
            fixture.detectChanges();
            const withoutArrowIcon = fixture.debugElement.query(By.css('#without-arrow-icon'));
            expect(withoutArrowIcon).toBeTruthy();
            expect(withoutArrowIcon.nativeElement.classList.contains('thy-collapse-no-arrow')).toBeTruthy();
        });

        it('should set correct icon when set arrowIcon as boolean', () => {
            fixture.detectChanges();
            const withoutArrowIcon = fixture.debugElement.query(By.css('#without-arrow-icon'));
            const collapseItem = withoutArrowIcon.componentInstance as ThyCollapseItem;
            collapseItem.thyArrowIcon.set(true);
            expect(collapseItem.arrowIcon()).toEqual('angle-right');
            expect(collapseItem.showArrow()).toEqual(true);
            collapseItem.thyArrowIcon.set(false);
            expect(collapseItem.showArrow()).toEqual(false);
        });

        it('should have thy-collapse-item-active when thyActive is true or click header', () => {
            fixture.detectChanges();

            const collapsePanels = fixture.debugElement.queryAll(By.css('.thy-collapse-item'));
            expect(collapsePanels[0].nativeElement.classList).not.toContain('thy-collapse-item-active');

            component.active = true;
            fixture.detectChanges();

            expect(collapsePanels[0].nativeElement.classList).toContain('thy-collapse-item-active');

            dispatchFakeEvent(collapsePanels[0].children[0].nativeElement, 'click');
            fixture.detectChanges();
            expect(collapsePanels[0].nativeElement.classList).not.toContain('thy-collapse-item-active');

            dispatchFakeEvent(collapsePanels[0].children[0].nativeElement, 'click');
            fixture.detectChanges();
            expect(collapsePanels[0].nativeElement.classList).toContain('thy-collapse-item-active');

            assertRenderIconRotate(icon);
        });

        it('should have correct title', () => {
            fixture.detectChanges();
            const collapsePanels = fixture.debugElement.queryAll(By.css('.thy-collapse-item'));
            expect(collapsePanels[0].children[0].nativeElement.innerText).toBe('默认标题');

            component.title = '默认标题1';
            fixture.detectChanges();

            expect(collapsePanels[0].children[0].nativeElement.innerText).toBe('默认标题1');
        });

        it('should have correct headerTemplate when thyHeaderTemplate is not undefined', () => {
            fixture.detectChanges();
            const headerTemplate = fixture.debugElement.query(By.css('.header-template'));
            expect(headerTemplate).toBeTruthy();
            expect(headerTemplate.parent.nativeElement.innerText).toBe('头部模板');
        });

        it('should have correct icon template when thyExpandedIcon is template', () => {
            fixture.detectChanges();
            const iconTemplate = fixture.debugElement.query(By.css('.template-icon'));
            expect(iconTemplate.parent.nativeElement.innerText).toBe('这是一个头部标题0');
            expect(iconTemplate).toBeTruthy();
        });

        it('should have correct extra template when thyExtraTemplate is not undefined', () => {
            fixture.detectChanges();
            const extraTemplate = fixture.debugElement.query(By.css('.extra-template'));
            expect(extraTemplate.parent.parent.nativeElement.innerText).toBe('这是一个头部标题4');
            expect(extraTemplate).toBeTruthy();
        });
    });
});
