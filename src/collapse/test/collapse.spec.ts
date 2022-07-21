import { ThyCollapseComponent, ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyIconComponent, ThyIconModule } from 'ngx-tethys/icon';
import { dispatchFakeEvent } from 'ngx-tethys/testing';

import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    template: `
        <thy-collapse [thyAccordion]="accordion" [thyTheme]="theme" [thyExpandIconPosition]="position">
            <thy-collapse-panel thyTitle="这是一个头部标题">isAccording</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题2">内容区域2</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题3">内容区域3</thy-collapse-panel>
        </thy-collapse>
    `
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
            <thy-collapse-panel [thyTitle]="title" [thyDisabled]="disabled" [thyShowArrow]="showArrow" [thyActive]="active"
                >内容区域0</thy-collapse-panel
            >
            <thy-collapse-panel [thyHeaderTemplate]="headerTemplate">内容区域1</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题1" [thyExpandedIcon]="'bell'">内容区域1</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题0" [thyExpandedIcon]="headerIconTemplate">内容区域2</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题4" [thyExtraTemplate]="extraTemplate">内容区域3</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题2">内容区域4</thy-collapse-panel>
            <thy-collapse-panel thyTitle="这是一个头部标题3">内容区域5</thy-collapse-panel>
        </thy-collapse>
        <ng-template #headerTemplate>
            <div class="header-template">头部模版</div>
        </ng-template>
        <ng-template #headerIconTemplate>
            <thy-icon [thyIconName]="'clock-circle'" class="template-icon"></thy-icon>
        </ng-template>
        <ng-template #extraTemplate>
            <thy-icon class="extra-template" thyIconName="settings" (click)="$event.stopPropagation()"></thy-icon>
        </ng-template>
    `
})
export class TestCollapsePanelBasicComponent {
    title = '默认标题';

    disabled = false;

    showArrow = true;

    active = false;
}

describe('collapse', () => {
    describe('basic', () => {
        let component: TestCollapseBasicComponent;
        let fixture: ComponentFixture<TestCollapseBasicComponent>;
        let debugElement: DebugElement;
        let icon: any;
        let iconRotateSpy: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThyCollapseModule, ThyIconModule, CommonModule, NoopAnimationsModule],
                declarations: [TestCollapseBasicComponent]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCollapseBasicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            debugElement = fixture.debugElement.query(By.directive(ThyCollapseComponent));
            icon = fixture.debugElement.query(By.directive(ThyIconComponent));

            iconRotateSpy = spyOn(icon.componentInstance.render, 'setStyle');
            fixture.detectChanges();
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

            expect(iconRotateSpy).toHaveBeenCalled();
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
describe('collapse-panel', () => {
    describe('basic', () => {
        let component: TestCollapsePanelBasicComponent;
        let fixture: ComponentFixture<TestCollapsePanelBasicComponent>;
        let debugElement: DebugElement;
        let icon: any;
        let iconRotateSpy: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ThyCollapseModule, ThyIconModule, CommonModule, NoopAnimationsModule],
                declarations: [TestCollapsePanelBasicComponent]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCollapsePanelBasicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            debugElement = fixture.debugElement.query(By.directive(ThyCollapseComponent));
            icon = fixture.debugElement.query(By.directive(ThyIconComponent));

            iconRotateSpy = spyOn(icon.componentInstance.render, 'setStyle');
            fixture.detectChanges();
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

            expect(iconRotateSpy).toHaveBeenCalled();
        });

        it('should not have thy-collapse-no-arrow when thyShowArrow is true default', () => {
            const collapseNoArrow = fixture.debugElement.query(By.css('.thy-collapse-no-arrow'));
            expect(collapseNoArrow).toBeFalsy();
        });

        it('should have thy-collapse-no-arrow when thyShowArrow is false', () => {
            component.showArrow = false;
            fixture.detectChanges();

            const collapseNoArrow = fixture.debugElement.query(By.css('.thy-collapse-no-arrow'));
            expect(collapseNoArrow).toBeTruthy();
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

            expect(iconRotateSpy).toHaveBeenCalled();
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
            expect(headerTemplate.parent.nativeElement.innerText).toBe('头部模版');
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
