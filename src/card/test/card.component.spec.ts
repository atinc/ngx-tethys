import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyCardModule } from '../card.module';
import { Component, OnInit, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyCardComponent } from '../card.component';

@Component({
    selector: 'card-basic',
    template: `
        <thy-card>
            <thy-card-header thyTitle="This is basic test"></thy-card-header>
            <thy-card-content>This is content</thy-card-content>
        </thy-card>
    `
})
class CardBasicComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'card-clear-padding',
    template: `
        <thy-card thyHasLeftRightPadding="false">
            <thy-card-header thyTitle="This is basic test"></thy-card-header>
            <thy-card-content>This is content</thy-card-content>
        </thy-card>
    `
})
class CardClearPaddingComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'card-divided',
    template: `
        <thy-card thyDivided="true">
            <thy-card-header thyTitle="This is basic test"></thy-card-header>
            <thy-card-content>This is content</thy-card-content>
        </thy-card>
    `
})
class CardDividedComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

describe('thy-card', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyCardModule],
            declarations: [CardBasicComponent, CardDividedComponent, CardClearPaddingComponent]
        });
        TestBed.compileComponents();
    });

    describe('basic', () => {
        let basicFixture: ComponentFixture<CardBasicComponent>;
        let cardBasicDebugElement: DebugElement;

        beforeEach(() => {
            basicFixture = TestBed.createComponent(CardBasicComponent);
            basicFixture.detectChanges();
            cardBasicDebugElement = basicFixture.debugElement.query(By.directive(ThyCardComponent));
        });

        it('should get correct thy-card class', () => {
            expect(basicFixture).toBeTruthy();
            expect(cardBasicDebugElement).toBeTruthy();
            const cardElement: HTMLElement = cardBasicDebugElement.nativeElement;
            expect(cardElement.classList.contains('thy-card')).toBe(true);
        });
    });

    describe('divided', () => {
        let fixture: ComponentFixture<CardDividedComponent>;
        let cardDebugElement: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CardDividedComponent);
            fixture.detectChanges();
            cardDebugElement = fixture.debugElement.query(By.directive(ThyCardComponent));
        });

        it('should get correct divided thy-card--divided class', () => {
            expect(fixture).toBeTruthy();
            expect(cardDebugElement).toBeTruthy();
            const cardElement: HTMLElement = cardDebugElement.nativeElement;
            expect(cardElement.classList.contains('thy-card--divided')).toBe(true);
        });
    });

    describe('clear-padding', () => {
        let fixture: ComponentFixture<CardClearPaddingComponent>;
        let cardDebugElement: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CardClearPaddingComponent);
            fixture.detectChanges();
            cardDebugElement = fixture.debugElement.query(By.directive(ThyCardComponent));
        });

        it('should get correct thy-card--clear-left-right-padding class when thyHasLeftRightPadding is false', () => {
            expect(fixture).toBeTruthy();
            expect(cardDebugElement).toBeTruthy();
            const cardElement: HTMLElement = cardDebugElement.nativeElement;
            expect(cardElement.classList.contains('thy-card--clear-left-right-padding')).toBe(true);
        });
    });
});
