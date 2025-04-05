import { ThyButtonModule } from 'ngx-tethys/button';

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ThyStrength } from '../strength.component';
import { ThyStrengthModule } from '../strength.module';

@Component({
    selector: 'thy-strength-basic-test',
    template: ` <thy-strength [(ngModel)]="value"></thy-strength> `,
    imports: [ThyStrengthModule, FormsModule, ThyButtonModule]
})
class StrengthBasicTestComponent {
    public value = 1;
}

describe('Strength basic component', () => {
    let fixture: ComponentFixture<StrengthBasicTestComponent>;
    let testStrengthBasicComponent: StrengthBasicTestComponent;
    let strengthBasicDebugComponent: DebugElement;
    let strengthBasicElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyStrengthModule, FormsModule, ThyButtonModule, StrengthBasicTestComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StrengthBasicTestComponent);
        testStrengthBasicComponent = fixture.debugElement.componentInstance;
        strengthBasicDebugComponent = fixture.debugElement.query(By.directive(ThyStrength));
        strengthBasicElement = strengthBasicDebugComponent.nativeElement;
    });

    it('should create', () => {
        expect(testStrengthBasicComponent).toBeTruthy();
        expect(strengthBasicElement).toBeTruthy();
    });

    it('should have correct class when ngModel value change', fakeAsync(() => {
        testStrengthBasicComponent.value = 4;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(strengthBasicElement.children[0].children[0].classList.contains('strength-text-highest')).toBe(true);
        expect(strengthBasicElement.children[1].classList.contains('strength-level-highest')).toBe(true);
    }));
});

@Component({
    selector: 'thy-strength-test',
    template: `
        <thy-strength
            [(ngModel)]="strength"
            [titleKey]="text[currentTextType].title"
            [highestKey]="text[currentTextType].highestKey"
            [highKey]="text[currentTextType].highKey"
            [averageKey]="text[currentTextType].averageKey"
            [lowKey]="text[currentTextType].lowKey"></thy-strength>
    `,
    imports: [ThyStrengthModule, FormsModule, ThyButtonModule]
})
class StrengthTestComponent {
    public strength = 2;
    public currentTextType = 'custom';
    public text = {
        default: {
            title: '密码强度',
            highestKey: '最高',
            highKey: '高',
            averageKey: '中',
            lowKey: '低'
        },
        custom: {
            title: '评分',
            highestKey: '🌟🌟🌟🌟',
            highKey: '🌟🌟🌟',
            averageKey: '🌟🌟',
            lowKey: '🌟'
        }
    };
}

describe('Strength component', () => {
    let fixture: ComponentFixture<StrengthTestComponent>;
    let testStrengthComponent: StrengthTestComponent;
    let strengthDebugComponent: DebugElement;
    let strengthElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyStrengthModule, FormsModule, ThyButtonModule, StrengthTestComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StrengthTestComponent);
        testStrengthComponent = fixture.debugElement.componentInstance;
        strengthDebugComponent = fixture.debugElement.query(By.directive(ThyStrength));
        strengthElement = strengthDebugComponent.nativeElement;
    });

    it('should create', () => {
        expect(testStrengthComponent).toBeTruthy();
        expect(strengthElement).toBeTruthy();
    });

    it('should have correct class when change strength', fakeAsync(() => {
        testStrengthComponent.strength = 3;
        const changeSpy = spyOn(strengthDebugComponent.componentInstance, '_onChange');
        const touchSpy = spyOn(strengthDebugComponent.componentInstance, '_onTouched');
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect((strengthElement.children[0] as HTMLElement).innerText).toBe('评分 🌟🌟🌟');
        expect(strengthElement.children[0].children[0].classList.contains('strength-text-high')).toBe(true);
        expect(strengthElement.children[1].classList.contains('strength-level-high')).toBe(true);
        expect(changeSpy).toHaveBeenCalled();
        expect(touchSpy).toHaveBeenCalled();
    }));

    it('should have correct class when change type', fakeAsync(() => {
        testStrengthComponent.currentTextType = 'default';
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect((strengthElement.children[0] as HTMLElement).innerText).toBe('密码强度 中');
        expect(strengthElement.children[0].children[0].classList.contains('strength-text-average')).toBe(true);
        expect((strengthElement.children[0].children[0] as HTMLElement).innerText).toBe('中');
        expect(strengthElement.children[1].classList.contains('strength-level-average')).toBe(true);
    }));
});
