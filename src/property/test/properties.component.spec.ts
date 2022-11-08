import { NgModule, Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyPropertyModule } from '../module';
import { ThyPropertiesComponent } from '../properties.component';
import { CommonModule } from '@angular/common';
import { ThyPropertyItemComponent } from '../property-item.component';

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
            <thy-property-item *ngIf="showAddress" thyLabelText="地址">这里是一个地址</thy-property-item>
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

    showAddress = false;
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
            const items = fixture.debugElement.queryAll(By.css('.thy-property-item'));
            expect(items.length).toEqual(2);
            expect(items[0].query(By.css('.thy-property-item-label')).nativeElement.innerText).toEqual('姓名');
            expect(items[0].query(By.css('.thy-property-item-content')).nativeElement.innerText).toEqual(basicComponent.user.name);
            expect(items[1].query(By.css('.thy-property-item-label')).nativeElement.innerText).toEqual('年龄');
            expect(items[1].query(By.css('.thy-property-item-content')).nativeElement.innerText).toEqual(
                basicComponent.user.age.toString()
            );
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

        it('should add hover trigger class when thyEditTrigger is hover', () => {
            basicComponent.editTrigger = 'hover';
            fixture.detectChanges();
            const element = fixture.debugElement.query(By.css('.thy-properties'));
            expect(element.nativeElement.classList).toContain('thy-properties-edit-trigger-hover');
        });

        it('should set editing success', () => {
            const ageEditorElement = fixture.debugElement.query(By.css('.age-input')).parent;
            basicComponent.editItemComponent.setEditing(true);
            fixture.detectChanges();
            expect(ageEditorElement.nativeElement.parentNode.classList).toContain('thy-property-item-content-editing');
            basicComponent.editItemComponent.setEditing(false);
            fixture.detectChanges();
            expect(ageEditorElement.nativeElement.parentNode.classList).not.toContain('thy-property-item-content-editing');
        });

        it('should dynamic rendering property item', () => {
            basicComponent.showAddress = true;
            fixture.detectChanges();
            let items = fixture.debugElement.queryAll(By.css('.thy-property-item'));
            expect(items.length).toEqual(3);
            basicComponent.showAddress = false;
            fixture.detectChanges();
            items = fixture.debugElement.queryAll(By.css('.thy-property-item'));
            expect(items.length).toEqual(2);
        });
    });

    describe(`column`, () => {
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
            expect(propertiesElement.styles.gridColumn).toEqual('span 2 / auto');
            testColumnComponent.addressItemSpan = 3;
            fixture.detectChanges();
            expect(propertiesElement.styles.gridColumn).toEqual('span 3 / auto');
        });
    });
});
