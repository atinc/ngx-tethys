import { TestBed, async, ComponentFixture, fakeAsync, tick, inject, flush, discardPeriodicTasks } from '@angular/core/testing';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Sanitizer, SecurityContext } from '@angular/core';
import { ThyAutocompleteModule } from '../module';
import { ThyAutocompleteComponent } from '../autocomplete.component';
import { By } from '@angular/platform-browser';
import { UpdateHostClassService } from '../../shared';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ThyFormModule } from '../../form';
import { dispatchFakeEvent, dispatchKeyboardEvent } from '../../core/testing/dispatcher-events';
import { ESCAPE } from '../../util/keycodes';
import { typeInElement, injectDefaultSvgIconSet, bypassSanitizeProvider } from '../../core/testing';
import { ThyOptionComponent } from '../../core/option/option.component';
import { ThyInputModule } from '../../input/module';
import { CommonModule } from '@angular/common';
import { ThyDirectiveModule } from '../../directive/module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThyOptionModule } from '../../core';

@Component({
    selector: 'basic-autocomplete',
    template: `
        <div>
            <input
                class="autocomplete-trigger"
                thyInput
                [(ngModel)]="value"
                [placeholder]="placeholder"
                thyAutocompleteTrigger
                [thyAutocomplete]="auto"
                [thyAutocompleteWidth]="500"
                (ngModelChange)="valueChange($event)"
            />
            <thy-autocomplete #auto [thyEmptyText]="'没有搜索到任何数据'" (thyOpened)="opened()">
                <thy-option *ngFor="let item of foods" [thyLabelText]="item.viewValue" [thyValue]="item.value"></thy-option>
            </thy-autocomplete>
        </div>
    `
})
class BasicSelectComponent {
    openedSpy = jasmine.createSpy('opened event spy callback');

    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
        { value: 'sandwich-3', viewValue: 'Sandwich' },
        { value: 'chips-4', viewValue: 'Chips' },
        { value: 'eggs-5', viewValue: 'Eggs' },
        { value: 'pasta-6', viewValue: 'Pasta' },
        { value: 'sushi-7', viewValue: 'Sushi' }
    ];
    @ViewChild(ThyAutocompleteComponent, { static: true }) autocomplete: ThyAutocompleteComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;

    opened() {
        this.openedSpy();
    }
}
describe('ThyAutocomplete', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let platform: Platform;

    function configureThyCustomSelectTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ThyFormModule,
                ThyDirectiveModule,
                ThyInputModule,
                ThyAutocompleteModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                ThyOptionModule
            ],
            declarations: declarations,
            providers: [UpdateHostClassService, bypassSanitizeProvider]
        }).compileComponents();

        inject([OverlayContainer, Platform], (oc: OverlayContainer, p: Platform) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
            platform = p;
        })();

        injectDefaultSvgIconSet();
    }

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('core', () => {
        beforeEach(async(() => {
            configureThyCustomSelectTestingModule([BasicSelectComponent]);
        }));

        describe('panel', () => {
            let fixture: ComponentFixture<BasicSelectComponent>;
            let trigger: HTMLElement;

            beforeEach(fakeAsync(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                tick(100);
                trigger = fixture.debugElement.query(By.css('input')).nativeElement;
            }));

            it('should open the panel when trigger focused', fakeAsync(() => {
                expect(fixture.componentInstance.autocomplete.isOpened).toBe(false);
                dispatchFakeEvent(trigger, 'focusin');
                fixture.detectChanges();
                tick(500);
                expect(fixture.componentInstance.autocomplete.isOpened).toBe(true);
                expect(overlayContainerElement.textContent).toContain('Steak');
                expect(overlayContainerElement.textContent).toContain('Pizza');
                expect(overlayContainerElement.textContent).toContain('Tacos');
            }));

            it('should open the panel when type char in trigger input', fakeAsync(() => {
                expect(fixture.componentInstance.autocomplete.isOpened).toBe(false);
                typeInElement('aa', trigger as HTMLInputElement);
                fixture.detectChanges();
                tick(500);
                expect(fixture.componentInstance.autocomplete.isOpened).toBe(true);
                expect(overlayContainerElement.textContent).toContain('Steak');
                expect(overlayContainerElement.textContent).toContain('Pizza');
                expect(overlayContainerElement.textContent).toContain('Tacos');
            }));

            it('should emit opend event when the panel opened', fakeAsync(() => {
                dispatchFakeEvent(trigger, 'focusin');
                fixture.detectChanges();
                tick(500);
                expect(fixture.componentInstance.openedSpy).toHaveBeenCalled();
            }));

            it('should close the panel when option is clicked', fakeAsync(() => {
                dispatchFakeEvent(trigger, 'focusin');
                fixture.detectChanges();
                tick(500);
                const option = overlayContainerElement.querySelector('thy-option') as HTMLElement;
                option.click();
                fixture.detectChanges();
                flush();
                expect(fixture.componentInstance.autocomplete.isOpened).toBe(false);
                expect(overlayContainerElement.textContent).not.toContain('Steak');
            }));

            it('should emit closed event when the panel close', fakeAsync(() => {
                const closedSpy = jasmine.createSpy('closed event spy callback');
                fixture.componentInstance.autocomplete.thyClosed.subscribe(() => {
                    closedSpy();
                });
                dispatchFakeEvent(trigger, 'focusin');
                fixture.detectChanges();
                tick(500);
                expect(closedSpy).not.toHaveBeenCalled();
                const option = overlayContainerElement.querySelector('thy-option') as HTMLElement;
                option.click();
                fixture.detectChanges();
                flush();
                expect(closedSpy).toHaveBeenCalled();
            }));
        });
    });
});
