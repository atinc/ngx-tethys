import { NgModule, Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyPropertyModule } from '../module';
import { ThyPropertiesComponent } from '../properties.component';
import { CommonModule } from '@angular/common';
import { ThyPropertyItemComponent } from '../property-item.component';

const itemLabelClass = 'thy-properties-item-label';
const itemContentClass = 'thy-properties-item-content';
const itemContentEditingClass = 'thy-properties-item-content-editing';

@Component({
    selector: 'thy-properties-test-basic',
    template: `
        <thy-properties #properties [thyLayout]="layout" [thyEditTrigger]="editTrigger">
            <thy-property-item thyLabelText="姓名">{{ user.name }}</thy-property-item>
            <thy-property-item #editItem thyLabelText="年龄" thyEditable="true">
                <span>{{ user.age }}</span>
                <ng-template #editor>
                    <input class="age-input" />
                </ng-template>
            </thy-property-item>
            <thy-property-item *ngIf="isShow" thyLabelText="地址">这里是一个地址</thy-property-item>
        </thy-properties>
    `
})
class ThyPropertiesTestBasicComponent {
    @ViewChild('properties') propertiesComponent: ThyPropertiesComponent;

    @ViewChild('editItem') editItemComponent: ThyPropertyItemComponent;

    layout = 'horizontal';

    editTrigger = 'hover';

    user = {
        name: '张萌',
        age: 24
    };

    isShow = false;
}

@Component({
    selector: 'thy-properties-test-column',
    template: `
        <thy-properties #properties thyColumn="3">
            <thy-property-item thyLabelText="姓名">张萌</thy-property-item>
            <thy-property-item thyLabelText="年龄">24</thy-property-item>
            <thy-property-item thyLabelText="电话">18500010001</thy-property-item>
            <thy-property-item thyLabelText="居住地址">北京市朝阳区十八里店小区26号10001</thy-property-item>
        </thy-properties>
    `
})
class ThyPropertiesTestColumnComponent {
    @ViewChild('properties') propertiesComponent: ThyPropertiesComponent;
}

@NgModule({
    imports: [ThyPropertyModule, CommonModule],
    declarations: [ThyPropertiesTestBasicComponent, ThyPropertiesTestColumnComponent],
    exports: []
})
export class ProgressTestModule {}

describe(`thy-properties`, () => {
    describe(`basic`, () => {
        let fixture: ComponentFixture<ThyPropertiesTestBasicComponent>;
        let basicComponent: ThyPropertiesTestBasicComponent;

        beforeEach(
            waitForAsync(() => {
                TestBed.configureTestingModule({
                    imports: [ThyPropertyModule, NoopAnimationsModule, CommonModule],
                    providers: []
                });
                TestBed.compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyPropertiesTestBasicComponent);
            basicComponent = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should displayed properties info', () => {
            const trs = fixture.debugElement.queryAll(By.css('tr'));
            expect(trs.length).toEqual(2);
            const tds = fixture.debugElement.queryAll(By.css('td'));
            expect(tds[0].query(By.css(`.${itemLabelClass}`)).nativeElement.innerText).toEqual('姓名');
            expect(tds[0].query(By.css(`.${itemContentClass}`)).nativeElement.innerText).toEqual(basicComponent.user.name);
            expect(tds[1].query(By.css(`.${itemLabelClass}`)).nativeElement.innerText).toEqual('年龄');
            expect(tds[1].query(By.css(`.${itemContentClass}`)).nativeElement.innerText).toEqual(basicComponent.user.age.toString());
        });

        it('should displayed vertical properties info', () => {
            basicComponent.layout = 'vertical';
            fixture.detectChanges();
            const trs = fixture.debugElement.queryAll(By.css('tr'));
            expect(trs.length).toEqual(4);
            expect(trs[0].nativeElement.innerText).toEqual('姓名');
            expect(trs[1].nativeElement.innerText).toEqual(basicComponent.user.name);
            expect(trs[2].nativeElement.innerText).toEqual('年龄');
            expect(trs[3].nativeElement.innerText).toEqual(basicComponent.user.age.toString());
        });

        it('should displayed input when age item hovered', () => {
            const ageEditorElement = fixture.debugElement.query(By.css('.age-input')).parent;
            dispatchMouseEvent(ageEditorElement.nativeElement, 'mouseenter');
            fixture.detectChanges();
            expect(ageEditorElement.nativeElement.parentNode.classList).toContain(itemContentEditingClass);
        });

        it('should displayed input when age item clicked', () => {
            basicComponent.editTrigger = 'click';
            fixture.detectChanges();
            const ageEditorElement = fixture.debugElement.query(By.css('.age-input')).parent;
            dispatchMouseEvent(ageEditorElement.nativeElement, 'click');
            fixture.detectChanges();
            expect(ageEditorElement.nativeElement.parentNode.classList).toContain(itemContentEditingClass);
        });

        it('should set keep editing success', () => {
            const ageEditorElement = fixture.debugElement.query(By.css('.age-input')).parent;
            dispatchMouseEvent(ageEditorElement.nativeElement, 'mouseenter');
            basicComponent.editItemComponent.setKeepEditing(true);
            dispatchMouseEvent(ageEditorElement.nativeElement, 'mouseleave');
            fixture.detectChanges();
            expect(ageEditorElement.nativeElement.parentNode.classList).toContain(itemContentEditingClass);
            basicComponent.editItemComponent.setKeepEditing(false);
            dispatchMouseEvent(ageEditorElement.nativeElement, 'mouseleave');
            fixture.detectChanges();
            expect(ageEditorElement.nativeElement.parentNode.classList).not.toContain(itemContentEditingClass);
        });

        it('should dynamic rendering property item', () => {
            fixture.detectChanges();
            basicComponent.isShow = true;
            fixture.detectChanges();
            const trs = fixture.debugElement.queryAll(By.css('tr'));
            expect(trs.length).toEqual(3);
            basicComponent.isShow = false;
            fixture.detectChanges();
        });
    });

    describe(`with column`, () => {
        let fixture: ComponentFixture<ThyPropertiesTestColumnComponent>;
        let testColumnComponent: ThyPropertiesTestColumnComponent;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyPropertyModule, NoopAnimationsModule],
                providers: []
            });
            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyPropertiesTestColumnComponent);
            testColumnComponent = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should displayed two line when set column is 3', () => {
            const trs = fixture.debugElement.queryAll(By.css('tr'));
            const tds = fixture.debugElement.queryAll(By.css('td'));
            expect(trs.length).toEqual(2);
            expect(tds.length).toEqual(6);
        });

        it('should render item elements length eq property items length ', () => {
            expect(testColumnComponent.propertiesComponent.items.length).toEqual(
                testColumnComponent.propertiesComponent.itemElements.length
            );
        });
    });
});
