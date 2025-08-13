import { provideHttpClient } from '@angular/common/http';
import { Component, ElementRef, inject } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ThyPropertyModule } from '../module';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Overlay, OverlayOutsideClickDispatcher } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import { ThyPropertyItem } from '../property-item.component';
import { ThySelect } from 'ngx-tethys/select';
import { FormsModule } from '@angular/forms';
import { dispatchMouseEvent } from '../../testing';

@Component({
    selector: 'app-test-property-test-basic',
    template: ` <thy-property-item thyLabelText="姓名" [thyEditTrigger]="editTrigger">{{ user.name }}</thy-property-item>
        <thy-property-item
            #ageProperty
            thyLabelText="年龄"
            [thyEditTrigger]="editTrigger"
            [thyEditable]="editable"
            (thyEditingChange)="editingChange($event)">
            <span>{{ user.age }}</span>
            <ng-template #editor>
                <input class="age-input" />
            </ng-template>
        </thy-property-item>`,
    imports: [ThyPropertyItem, ThySelect, FormsModule]
})
class ThyPropertyTestBasicComponent {
    elementRef = inject(ElementRef);
    overlay = inject(Overlay);
    overlayOutsideClickDispatcher = inject(OverlayOutsideClickDispatcher);

    user = {
        name: '张萌',
        age: 24,
        sex: '男'
    };

    editable = true;

    editTrigger = 'hover';

    editingChangeSpy = jasmine.createSpy('editing change');

    editingChange(event: boolean) {
        this.editingChangeSpy(event);
    }
}

describe(`thy-property-item`, () => {
    describe(`basic`, () => {
        let fixture: ComponentFixture<ThyPropertyTestBasicComponent> | undefined = undefined;
        let basicComponent: ThyPropertyTestBasicComponent | undefined = undefined;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyPropertyModule],
                providers: [provideHttpClient(), provideNoopAnimations()]
            });
            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyPropertyTestBasicComponent);
            basicComponent = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create property success', () => {
            const items = fixture.debugElement.queryAll(By.css('.thy-property-item'));
            expect(items.length).toEqual(2);
            expect(items[0].nativeElement.classList.contains('thy-property-edit-trigger-hover')).toBe(true);
            expect(items[0].nativeElement.classList.contains('thy-property-item-single')).toBe(true);
            expect(items[0].query(By.css('.thy-property-item-label')).nativeElement.innerText).toEqual('姓名');
            expect(items[0].query(By.css('.thy-property-item-content')).nativeElement.innerText).toEqual(basicComponent.user.name);
            expect(items[1].nativeElement.classList.contains('thy-property-edit-trigger-hover')).toBe(true);
            expect(items[1].nativeElement.classList.contains('thy-property-item-single')).toBe(true);
            expect(items[1].query(By.css('.thy-property-item-label')).nativeElement.innerText).toEqual('年龄');
            expect(items[1].query(By.css('.thy-property-item-content')).nativeElement.innerText).toEqual(
                basicComponent.user.age.toString()
            );
        });

        it('should displayed input when age item clicked', () => {
            basicComponent.editTrigger = 'click';
            fixture.detectChanges();
            const ageEditorElement = fixture.debugElement.query(By.css('.age-input')).parent;
            const items = fixture.debugElement.queryAll(By.css('.thy-property-item'));
            expect(items[0].nativeElement.classList.contains('thy-property-edit-trigger-hover')).toBe(false);
            expect(items[0].nativeElement.classList.contains('thy-property-edit-trigger-click')).toBe(true);
            expect(items[1].nativeElement.classList.contains('thy-property-edit-trigger-hover')).toBe(false);
            expect(items[1].nativeElement.classList.contains('thy-property-edit-trigger-click')).toBe(true);
            dispatchMouseEvent(ageEditorElement.nativeElement, 'click');
            fixture.detectChanges();
            expect(ageEditorElement.nativeElement.closest('.thy-property-item-content').classList).toContain(
                'thy-property-item-content-editing'
            );
        });

        it('should autofocus input when age item clicked', () => {
            basicComponent.editTrigger = 'click';
            fixture.detectChanges();
            const ageEditorElement = fixture.debugElement.query(By.css('.age-input'));
            expect(document.activeElement).not.toBe(ageEditorElement.nativeElement);
            dispatchMouseEvent(ageEditorElement.parent.nativeElement, 'click');
            fixture.detectChanges();
            expect(document.activeElement).toBe(ageEditorElement.nativeElement);
        });
    });
});
