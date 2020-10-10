import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThySwitchComponent } from '../switch.component';
import { ThySwitchModule } from '../switch.module';

@Component({
    selector: 'thy-switch-test',
    template: `
        <thy-switch [thySize]="size" [thyType]="type" [thyDisabled]="isDisabled"></thy-switch>
    `
})
class SwitchTestComponent {
    size = ``;
    type = ``;
    isDisabled: boolean;
}

describe('switch component', () => {
    let fixture: ComponentFixture<SwitchTestComponent>;
    let testComponent: SwitchTestComponent;
    let switchDebugComponent: DebugElement;
    let switchElement;

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
        switchDebugComponent = fixture.debugElement.query(By.directive(ThySwitchComponent));
        switchElement = switchDebugComponent.nativeElement;
    });

    it('should creat', () => {
        expect(fixture).toBeTruthy();
        expect(switchDebugComponent).toBeTruthy();
        expect(switchElement).toBeTruthy();
    });

    // 开关大小  'sm' | 'lg'
    it('should have correct class when size is lg', () => {
        testComponent.size = `lg`;
        fixture.detectChanges();
        const labelElement = switchElement.children[0];
        expect(labelElement.classList.contains('thy-switch-lg')).toBe(true);
    });

    it('should have correct class when size is sm', () => {
        testComponent.size = `sm`;
        fixture.detectChanges();
        const labelElement = switchElement.children[0];
        expect(labelElement.classList.contains('thy-switch-sm')).toBe(true);
    });

    // 开关类型  'primary' |'info' | 'warning' | 'danger'
    it('should have correct class when type is primary', () => {
        testComponent.type = `primary`;
        fixture.detectChanges();
        const labelElement = switchElement.children[0];
        expect(labelElement.classList.contains('thy-switch-primary')).toBe(true);
    });

    it('should have correct class when type is info', () => {
        testComponent.type = `info`;
        fixture.detectChanges();
        const labelElement = switchElement.children[0];
        expect(labelElement.classList.contains('thy-switch-info')).toBe(true);
    });

    it('should have correct class when type is warning', () => {
        testComponent.type = `warning`;
        fixture.detectChanges();
        const labelElement = switchElement.children[0];
        expect(labelElement.classList.contains('thy-switch-warning')).toBe(true);
    });

    it('should have correct class when type is danger', () => {
        testComponent.type = `danger`;
        fixture.detectChanges();
        const labelElement = switchElement.children[0];
        expect(labelElement.classList.contains('thy-switch-danger')).toBe(true);
    });

    it('should have correct class when type is ``', () => {
        testComponent.type = ``;
        fixture.detectChanges();
        const labelElement = switchElement.children[0];
        expect(labelElement.classList.contains('thy-switch-primary')).toBe(true);
    });

    // 开关的禁用状态
    it('should have correct class when isDisabled is false', () => {
        testComponent.isDisabled = false;
        fixture.detectChanges();
        const labelElement = switchElement.children[0];
        expect(labelElement.classList.contains('thy-switch-disabled')).toBe(false);
    });

    it('should have correct class when isDisabled is true', () => {
        testComponent.isDisabled = true;
        fixture.detectChanges();
        const labelElement = switchElement.children[0];
        expect(labelElement.classList.contains('thy-switch-disabled')).toBe(true);
    });
});
