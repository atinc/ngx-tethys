import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThySwitch } from '../switch.component';
import { ThySwitchModule } from '../switch.module';

@Component({
    selector: 'thy-switch-test',
    template: `<thy-switch
            [thySize]="size"
            [thyType]="type"
            [thyDisabled]="isDisabled"
            [(ngModel)]="isChecked"
            [thyLoading]="isLoading"></thy-switch>
        <thy-switch disabled [(ngModel)]="isChecked"></thy-switch>`
})
class SwitchTestComponent {
    size = ``;
    type = ``;
    isDisabled: boolean;
    isChecked: boolean;
    isLoading: boolean;
}

describe('switch component', () => {
    let fixture: ComponentFixture<SwitchTestComponent>;
    let testComponent: SwitchTestComponent;
    let switchDebugComponent: DebugElement;
    let switchElement: HTMLElement;
    let labelNode;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThySwitchModule, FormsModule],
            declarations: [SwitchTestComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SwitchTestComponent);
        testComponent = fixture.debugElement.componentInstance;
        switchDebugComponent = fixture.debugElement.query(By.directive(ThySwitch));
        switchElement = switchDebugComponent.nativeElement;
        labelNode = switchElement.children[0];
    });

    it('should creat', () => {
        expect(fixture).toBeTruthy();
        expect(switchDebugComponent).toBeTruthy();
        expect(switchElement).toBeTruthy();
    });

    it('should create correct DOM structure', () => {
        expect(switchElement.children.length).toEqual(1);
        expect(labelNode.nodeName).toEqual('LABEL');
        expect(labelNode.nodeType).toEqual(1);
        expect(labelNode.className).toEqual('thy-switch');
        expect(labelNode.childElementCount).toEqual(3);

        const inputNode = labelNode.childNodes[0];
        expect(inputNode.nodeName).toEqual('INPUT');
        expect(inputNode.nodeType).toEqual(1);
        expect(inputNode.classList.contains('thy-switch-input')).toBe(true);

        const typeNode = inputNode.attributes['type'];
        expect(typeNode.nodeName).toEqual('type');
        expect(typeNode.nodeType).toEqual(2);
        expect(typeNode.nodeValue).toEqual('checkbox');

        const spanNode1 = labelNode.childNodes[1];
        expect(spanNode1.nodeName).toEqual('SPAN');
        expect(spanNode1.nodeType).toEqual(1);
        expect(spanNode1.classList.contains('thy-switch-label')).toBe(true);

        const spanNode2 = labelNode.childNodes[2];
        expect(spanNode2.nodeName).toEqual('SPAN');
        expect(spanNode2.nodeType).toEqual(1);
        expect(spanNode2.classList.contains('thy-switch-handle')).toBe(true);
    });

    it('should have correct class when it has size', () => {
        const sizes: string[] = ['xs', 'sm'];
        sizes.forEach((size: string) => {
            testComponent.size = size;
            fixture.detectChanges();
            expect(labelNode.classList.contains(`thy-switch-${size}`)).toBe(true);
        });
    });

    it('should have correct class when it has type', () => {
        const types: string[] = ['primary', 'info', 'warning', 'danger'];
        types.forEach((type: string) => {
            testComponent.type = type;
            fixture.detectChanges();
            expect(labelNode.classList.contains(`thy-switch-${type}`)).toBe(true);
        });
    });

    it('should have correct class when it‘s isDisabled has changed', () => {
        const disables: boolean[] = [false, true];
        disables.forEach((disable: boolean) => {
            testComponent.isDisabled = disable;
            fixture.detectChanges();
            expect(labelNode.classList.contains('thy-switch-disabled')).toBe(disable);
        });
        testComponent.isDisabled = true;
        const label = labelNode.querySelector('.thy-switch-label');
        fixture.detectChanges();
        expect(label.getAttribute('tabindex')).toBe('-1');
        testComponent.isDisabled = false;
        fixture.detectChanges();
        expect(label.getAttribute('tabindex')).toBe('0');
    });

    it('should have correct class when set disabled attribute', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const disabledSwitch = fixture.debugElement.queryAll(By.directive(ThySwitch))[1];
        const disabledSwitchElement = disabledSwitch.nativeElement;
        labelNode = disabledSwitchElement.children[0];
        expect(labelNode.classList.contains('thy-switch-disabled')).toBeTruthy();
    }));

    it('should loading work', () => {
        expect(switchDebugComponent.query(By.css('.thy-switch-loading'))).toBeFalsy();

        testComponent.isLoading = true;
        fixture.detectChanges();
        expect(switchDebugComponent.query(By.css('.thy-switch-loading'))).toBeTruthy();
        expect(labelNode.classList.contains('thy-switch-disabled')).toBeTruthy();

        testComponent.isLoading = false;
        fixture.detectChanges();
        expect(switchDebugComponent.query(By.css('.thy-switch-loading'))).toBeFalsy();
        expect(labelNode.classList.contains('thy-switch-disabled')).toBeFalsy();
    });
});
