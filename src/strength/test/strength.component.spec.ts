import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyStrengthModule } from '../strength.module';
import { ThyStrengthComponent } from '../strength.component';
import { ThyButtonModule } from 'ngx-tethys/button';

@Component({
    selector: 'thy-strength-test',
    template: `
        <thy-strength
            [(ngModel)]="strength"
            [titleKey]="text[currentTextType].title"
            [highestKey]="text[currentTextType].highestKey"
            [highKey]="text[currentTextType].highKey"
            [averageKey]="text[currentTextType].averageKey"
            [lowKey]="text[currentTextType].lowKey"
        ></thy-strength>
        <h6>切换程度值：</h6>
        <thy-button-group thyType="outline-default">
            <button
                thyButton
                *ngFor="let curStrength of strengths"
                (click)="strength = curStrength"
                [ngClass]="{ active: strength === curStrength }"
            >
                {{ curStrength }}
            </button>
        </thy-button-group>
        <h6>切换程度文本：</h6>
        <thy-button-group thyType="outline-default">
            <button
                thyButton
                *ngFor="let text of toggleText"
                (click)="currentTextType = text"
                [ngClass]="{ active: currentTextType === text }"
            >
                {{ text }}
            </button>
        </thy-button-group>
    `
})
class StrengthTestComponent {
    public strength = 2;
    public currentTextType = 'custom';
    public strengths = [1, 2, 3, 4];
    public toggleText = ['default', 'custom'];
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
    let StrengthDebugComponent: DebugElement;
    let StrengthElement: HTMLElement;
    let StrengthElementChildText: any;
    let StrengthElementChildLevel: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyStrengthModule, FormsModule, ThyButtonModule],
            declarations: [StrengthTestComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StrengthTestComponent);
        testStrengthComponent = fixture.debugElement.componentInstance;
        StrengthDebugComponent = fixture.debugElement.query(By.directive(ThyStrengthComponent));
        StrengthElement = StrengthDebugComponent.nativeElement;
        StrengthElementChildText = StrengthElement.children[0];
        StrengthElementChildLevel = StrengthElement.children[1];
    });

    it('should create', () => {
        expect(testStrengthComponent).toBeTruthy();
        expect(StrengthElement).toBeTruthy();
    });

    it('should have correct class when ngModel value change', fakeAsync(() => {
        testStrengthComponent.strength = 3;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(StrengthElementChildText.innerText).toBe('评分 🌟🌟🌟');
        expect(StrengthElementChildText.children[0].classList.contains('strength-text-high')).toBe(true);
        expect(StrengthElementChildLevel.classList.contains('strength-level-high')).toBe(true);
    }));

    it('should have correct class when change type', fakeAsync(() => {
        testStrengthComponent.currentTextType = 'default';
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(StrengthElementChildText.innerText).toBe('密码强度 中');
        expect(StrengthElementChildText.children[0].classList.contains('strength-text-average')).toBe(true);
        expect(StrengthElementChildText.children[0].innerText).toBe('中');
        expect(StrengthElementChildLevel.classList.contains('strength-level-average')).toBe(true);
    }));
});
