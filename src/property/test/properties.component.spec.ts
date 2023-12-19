import { ThySelectModule } from 'ngx-tethys/select';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { SafeAny } from 'ngx-tethys/types';

import { Overlay, OverlayModule, OverlayOutsideClickDispatcher } from '@angular/cdk/overlay';
import { DomPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ThyPropertyModule } from '../module';
import { ThyPropertiesComponent, ThyPropertiesLayout } from '../properties.component';
import { ThyPropertyItemComponent, ThyPropertyItemOperationTrigger } from '../property-item.component';

@Component({
    selector: 'thy-properties-test-basic',
    template: `
        <thy-properties #properties [thyLayout]="layout" [thyEditTrigger]="editTrigger">
            <thy-property-item thyLabelText="姓名">{{ user.name }}</thy-property-item>
            <thy-property-item #ageProperty thyLabelText="年龄" [thyEditable]="editable" (thyEditingChange)="editingChange($event)">
                <span>{{ user.age }}</span>
                <ng-template #editor>
                    <input class="age-input" />
                </ng-template>
            </thy-property-item>
            <thy-property-item *ngIf="showAddress" thyLabelText="地址">这里是一个地址</thy-property-item>
            <thy-property-item #sexProperty thyLabelText="性别" thyEditable="true" #hobby>
                <span>{{ user.sex || '无' }}</span>
                <ng-template #editor>
                    <thy-custom-select class="sex-select" thySize="md" [(ngModel)]="user.sex">
                        <thy-option [thyValue]="'男'" [thyLabelText]="'男'"> </thy-option>
                        <thy-option [thyValue]="'女'" [thyLabelText]="'女'"> </thy-option>
                    </thy-custom-select>
                </ng-template>
            </thy-property-item>
        </thy-properties>
    `
})
class ThyPropertiesTestBasicComponent {
    @ViewChild('properties') propertiesComponent: ThyPropertiesComponent;

    @ViewChild('ageProperty') agePropertyItemComponent: ThyPropertyItemComponent;

    @ViewChild('sexProperty') sexPropertyItemComponent: ThyPropertyItemComponent;

    editable = true;

    layout = 'horizontal';

    editTrigger = 'hover';

    user = {
        name: '张萌',
        age: 24,
        sex: '男'
    };

    showAddress = false;

    editingChangeSpy = jasmine.createSpy('editing change');

    constructor(
        public elementRef: ElementRef,
        public overlay: Overlay,
        public overlayOutsideClickDispatcher: OverlayOutsideClickDispatcher
    ) {}

    editingChange(event: boolean) {
        this.editingChangeSpy(event);
    }
}

@Component({
    selector: 'thy-properties-test-column',
    template: `
        <thy-properties #properties [thyColumn]="column">
            <thy-property-item thyLabelText="姓名">张萌</thy-property-item>
            <thy-property-item thyLabelText="年龄">24</thy-property-item>
            <thy-property-item thyLabelText="电话">18500010001</thy-property-item>
            <thy-property-item thyLabelText="电话">18500010001</thy-property-item>
            <thy-property-item class="address-item" thyLabelText="居住地址" [thySpan]="addressItemSpan"
                >北京市朝阳区十八里店小区26号10001</thy-property-item
            >
        </thy-properties>
    `
})
class ThyPropertiesTestColumnComponent {
    @ViewChild('properties') propertiesComponent: ThyPropertiesComponent;

    column = 3;

    addressItemSpan = 1;
}

@Component({
    selector: 'thy-properties-test-operation',
    template: `
        <thy-properties [thyLayout]="layout">
            <thy-property-item thyLabelText="Name" [thyOperationTrigger]="operationTrigger"
                >Peter
                <ng-template #operation>
                    <a href="javascript:;">Add</a>
                </ng-template>
            </thy-property-item>
        </thy-properties>
    `
})
class ThyPropertiesTestOperationComponent {
    layout: ThyPropertiesLayout = 'horizontal';
    operationTrigger: ThyPropertyItemOperationTrigger = 'always';
}

@NgModule({
    imports: [ThyPropertyModule, CommonModule, FormsModule, ThySelectModule, OverlayModule],
    declarations: [ThyPropertiesTestBasicComponent, ThyPropertiesTestColumnComponent, ThyPropertiesTestOperationComponent],
    exports: []
})
export class PropertiesTestModule {}

describe(`thy-properties`, () => {
    describe(`basic`, () => {
        let fixture: ComponentFixture<ThyPropertiesTestBasicComponent>;
        let basicComponent: ThyPropertiesTestBasicComponent;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyPropertyModule, NoopAnimationsModule, CommonModule, PropertiesTestModule],
                providers: []
            });
            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyPropertiesTestBasicComponent);
            basicComponent = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should displayed properties info', () => {
            const items = fixture.debugElement.queryAll(By.css('.thy-property-item'));
            expect(items.length).toEqual(3);
            expect(items[0].query(By.css('.thy-property-item-label')).nativeElement.innerText).toEqual('姓名');
            expect(items[0].query(By.css('.thy-property-item-content')).nativeElement.innerText).toEqual(basicComponent.user.name);
            expect(items[1].query(By.css('.thy-property-item-label')).nativeElement.innerText).toEqual('年龄');
            expect(items[1].query(By.css('.thy-property-item-content')).nativeElement.innerText).toEqual(
                basicComponent.user.age.toString()
            );
            expect(items[2].query(By.css('.thy-property-item-label')).nativeElement.innerText).toEqual('性别');
            expect(items[2].query(By.css('.thy-property-item-content')).nativeElement.innerText).toEqual(basicComponent.user.sex);
        });

        it('should change layout success', () => {
            const propertiesElement = fixture.debugElement.query(By.css('.thy-properties'));
            expect(propertiesElement.nativeElement.classList).toContain('thy-properties-horizontal');
            basicComponent.layout = 'vertical';
            fixture.detectChanges();
            expect(propertiesElement.nativeElement.classList).toContain('thy-properties-vertical');
        });

        it('should displayed input when age item clicked', () => {
            basicComponent.editTrigger = 'click';
            fixture.detectChanges();
            const ageEditorElement = fixture.debugElement.query(By.css('.age-input')).parent;
            dispatchMouseEvent(ageEditorElement.nativeElement, 'click');
            fixture.detectChanges();
            expect(ageEditorElement.nativeElement.closest('.thy-property-item-content').classList).toContain(
                'thy-property-item-content-editing'
            );
        });

        it('should emit editingChange when age editing change', fakeAsync(() => {
            basicComponent.editTrigger = 'click';
            fixture.detectChanges();
            const ageEditorElement = fixture.debugElement.query(By.css('.age-input')).parent;
            dispatchMouseEvent(ageEditorElement.nativeElement, 'click');
            fixture.detectChanges();
            tick(50);
            fixture.detectChanges();
            expect(basicComponent.editingChangeSpy).toHaveBeenCalledTimes(1);
            expect(basicComponent.editingChangeSpy).toHaveBeenCalledWith(true);

            dispatchFakeEvent(document, 'click');
            expect(basicComponent.editingChangeSpy).toHaveBeenCalledTimes(2);
            expect(basicComponent.editingChangeSpy).toHaveBeenCalledWith(true);
        }));

        it('should add hover trigger class when thyEditTrigger is hover', () => {
            basicComponent.editTrigger = 'hover';
            fixture.detectChanges();
            const element = fixture.debugElement.query(By.css('.thy-properties'));
            expect(element.nativeElement.classList).toContain('thy-properties-edit-trigger-hover');
        });

        it('should set editing success', () => {
            const ageEditorElement = fixture.debugElement.query(By.css('.age-input')).parent;
            basicComponent.agePropertyItemComponent.setEditing(true);
            fixture.detectChanges();
            expect(ageEditorElement.nativeElement.parentNode.classList).toContain('thy-property-item-content-editing');
            basicComponent.agePropertyItemComponent.setEditing(false);
            fixture.detectChanges();
            expect(ageEditorElement.nativeElement.parentNode.classList).not.toContain('thy-property-item-content-editing');
        });

        it('should not subscribe multiple times when the value of thyEditable is changed to true', fakeAsync(() => {
            basicComponent.editable = true;
            fixture.detectChanges();

            const itemContentElement = basicComponent.agePropertyItemComponent.itemContent.nativeElement;
            const setEditingSpy = spyOn(basicComponent.agePropertyItemComponent, 'setEditing');
            itemContentElement.click();
            fixture.detectChanges();
            tick(50);
            fixture.detectChanges();
            expect(setEditingSpy).toHaveBeenCalledTimes(1);
        }));

        it('should destroy the subscription of click event when the value of thyEditable is changed from true to false', fakeAsync(() => {
            basicComponent.editable = true;
            fixture.detectChanges();
            expect(!!(basicComponent.agePropertyItemComponent as SafeAny).clickEventSubscription).toBeTruthy();

            const itemContentElement = basicComponent.agePropertyItemComponent.itemContent.nativeElement;
            itemContentElement.click();
            fixture.detectChanges();

            const unsubscribeSpy = spyOn((basicComponent.agePropertyItemComponent as SafeAny).clickEventSubscription, 'unsubscribe');
            basicComponent.editable = false;
            fixture.detectChanges();
            tick(60);
            fixture.detectChanges();
            expect(unsubscribeSpy).toHaveBeenCalled();
        }));

        it('should dynamic rendering property item', () => {
            basicComponent.showAddress = true;
            fixture.detectChanges();
            let items = fixture.debugElement.queryAll(By.css('.thy-property-item'));
            expect(items.length).toEqual(4);
            basicComponent.showAddress = false;
            fixture.detectChanges();
            items = fixture.debugElement.queryAll(By.css('.thy-property-item'));
            expect(items.length).toEqual(3);
        });

        it('should edit canceled when overlay detached', fakeAsync(() => {
            // fake overlay
            const overlayRef = basicComponent.overlay.create();
            overlayRef.attach(new DomPortal(basicComponent.elementRef.nativeElement));
            basicComponent.sexPropertyItemComponent.itemContent.nativeElement.click();
            fixture.detectChanges();
            expect(basicComponent.sexPropertyItemComponent.editing).toBeTruthy();
            tick(50);
            fixture.detectChanges();
            overlayRef.detach();
            tick(50);
            expect(basicComponent.sexPropertyItemComponent.editing).toBeFalsy();
        }));

        it('should edit canceled when editor outside clicked', fakeAsync(() => {
            basicComponent.agePropertyItemComponent.itemContent.nativeElement.click();
            fixture.detectChanges();
            expect(basicComponent.agePropertyItemComponent.editing).toBeTruthy();
            tick(50);
            fixture.detectChanges();
            dispatchMouseEvent(fixture.debugElement.query(By.css('.thy-property-item-label')).nativeElement, 'click');
            fixture.detectChanges();
            expect(basicComponent.agePropertyItemComponent.editing).toBeFalsy();
        }));
    });

    describe(`column`, () => {
        let fixture: ComponentFixture<ThyPropertiesTestColumnComponent>;
        let testColumnComponent: ThyPropertiesTestColumnComponent;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyPropertyModule, NoopAnimationsModule, PropertiesTestModule],
                providers: []
            });
            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyPropertiesTestColumnComponent);
            testColumnComponent = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should set column success', () => {
            const propertiesElement = fixture.debugElement.query(By.css('.thy-properties'));
            expect(propertiesElement.styles.gridTemplateColumns).toEqual('repeat(3, 1fr)');
            testColumnComponent.column = 4;
            fixture.detectChanges();
            expect(propertiesElement.styles.gridTemplateColumns).toEqual('repeat(4, 1fr)');
        });

        it('should set item span is work', () => {
            testColumnComponent.addressItemSpan = 2;
            fixture.detectChanges();
            const propertiesElement = fixture.debugElement.query(By.css('.address-item'));
            expect(propertiesElement.styles.gridColumn).toContain('span 2');
            testColumnComponent.addressItemSpan = 3;
            fixture.detectChanges();
            expect(propertiesElement.styles.gridColumn).toContain('span 3');
        });
    });

    describe('property-item-operation', () => {
        let fixture: ComponentFixture<ThyPropertiesTestOperationComponent>;
        let testComponent: ThyPropertiesTestOperationComponent;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyPropertyModule, NoopAnimationsModule],
                providers: [],
                declarations: [ThyPropertiesTestOperationComponent]
            });
            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyPropertiesTestOperationComponent);
            testComponent = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create operation', () => {
            const propertyItemDebugElement = fixture.debugElement.query(By.css('thy-property-item'));
            expect(propertyItemDebugElement).toBeTruthy();
            const propertyItemElement = propertyItemDebugElement.nativeElement as HTMLElement;
            expect(propertyItemElement.classList.contains(`thy-property-item-operational`)).toBeTruthy();
            const propertyItemContent: HTMLElement = propertyItemElement.querySelector('.thy-property-item-content');
            expect(propertyItemContent.children.length).toEqual(2);
            const operation = propertyItemContent.children[1];
            expect(operation.classList.contains('thy-property-item-operation')).toBeTruthy();
            expect(operation.textContent).toBeTruthy('Add');
        });

        it('should create operation with vertical layout', () => {
            testComponent.layout = 'vertical';
            fixture.detectChanges();
            const propertyItemDebugElement = fixture.debugElement.query(By.css('thy-property-item'));
            expect(propertyItemDebugElement).toBeTruthy();
            const propertyItemElement = propertyItemDebugElement.nativeElement as HTMLElement;
            expect(propertyItemElement.classList.contains(`thy-property-item-operational`)).toBeTruthy();
            expect(propertyItemElement.children.length).toEqual(2);
            const content = propertyItemElement.children[1];
            expect(content).toBeTruthy();
            expect(content.children.length).toEqual(2);
            const operation = content.children[1];
            expect(operation.classList.contains('thy-property-item-operation')).toBeTruthy();
            expect(operation.textContent).toBeTruthy('Add');
        });

        it('should set operation trigger hover', () => {
            fixture.detectChanges();
            const propertyItemDebugElement = fixture.debugElement.query(By.css('thy-property-item'));
            const propertyItemElement = propertyItemDebugElement.nativeElement as HTMLElement;
            expect(propertyItemElement).toBeTruthy();
            expect(propertyItemElement.classList.contains('thy-property-item-operational-hover')).toBeFalsy();
            testComponent.operationTrigger = 'hover';
            fixture.detectChanges();
            expect(propertyItemElement.classList.contains('thy-property-item-operational-hover')).toBeTruthy();
            testComponent.operationTrigger = 'always';
            fixture.detectChanges();
            expect(propertyItemElement.classList.contains('thy-property-item-operational-hover')).toBeFalsy();
        });
    });
});
