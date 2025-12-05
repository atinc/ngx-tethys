import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, OnInit, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyCardModule, ThyCard, ThyCardContent, ThyCardHeader } from 'ngx-tethys/card';

@Component({
    selector: 'thy-card-test-basic',
    template: `
        <thy-card [thySize]="size">
            <thy-card-header thyTitle="This is basic test"></thy-card-header>
            <thy-card-content>This is content</thy-card-content>
        </thy-card>
    `,
    imports: [ThyCardModule]
})
class CardBasicComponent implements OnInit {
    size: 'md' | 'sm' | 'lg' = 'md';

    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-card-test-clear-padding',
    template: `
        <thy-card thyHasLeftRightPadding="false">
            <thy-card-header thyTitle="This is basic test"></thy-card-header>
            <thy-card-content>This is content</thy-card-content>
        </thy-card>
    `,
    imports: [ThyCardModule]
})
class CardClearPaddingComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-test-card-divided',
    template: `
        <thy-card thyDivided="true">
            <thy-card-header thyTitle="This is basic test"></thy-card-header>
            <thy-card-content>This is content</thy-card-content>
        </thy-card>
    `,
    imports: [ThyCardModule]
})
class CardDividedComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-test-card-bordered',
    template: `
        <thy-card thyBordered="true">
            <thy-card-header thyTitle="This is basic test"></thy-card-header>
            <thy-card-content>This is content</thy-card-content>
        </thy-card>
    `,
    imports: [ThyCardModule]
})
class CardBorderedComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-test-card-header-basic',
    template: `
        <thy-card>
            <thy-card-header thyTitle="This is card header test" [thySize]="size"></thy-card-header>
            <thy-card-content [thySize]="size">This is content</thy-card-content>
        </thy-card>
    `,
    imports: [ThyCardModule]
})
class CardHeaderSizeComponent {
    size!: string;
}

@Component({
    selector: 'thy-test-card-content-scroll',
    template: `
        <thy-card>
            <thy-card-header thyTitle="This is card content test"></thy-card-header>
            <thy-card-content [thySize]="size" [thyScroll]="isScroll">This is content</thy-card-content>
        </thy-card>
    `,
    imports: [ThyCardModule]
})
class CardContentSizeAndScrollComponent {
    size!: string;
    isScroll!: boolean;
}

describe('thy-card', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    describe('basic', () => {
        let basicFixture!: ComponentFixture<CardBasicComponent>;
        let cardBasicDebugElement!: DebugElement;

        beforeEach(() => {
            basicFixture = TestBed.createComponent(CardBasicComponent);
            basicFixture.detectChanges();
            cardBasicDebugElement = basicFixture.debugElement.query(By.directive(ThyCard));
        });

        it('should get correct thy-card class', () => {
            expect(basicFixture).toBeTruthy();
            expect(cardBasicDebugElement).toBeTruthy();
            const cardElement: HTMLElement = cardBasicDebugElement.nativeElement;
            expect(cardElement.classList.contains('thy-card')).toBe(true);
        });

        it('should header and content align', () => {
            const headerDebugElement = cardBasicDebugElement.query(By.css('.card-header-title'));
            const contentDebugElement = cardBasicDebugElement.query(By.directive(ThyCardContent));
            expect((headerDebugElement.nativeElement as HTMLElement).getBoundingClientRect().left).toEqual(
                (contentDebugElement.nativeElement as HTMLElement).getBoundingClientRect().left
            );
        });

        it('should set size', () => {
            ['lg', 'sm'].forEach(size => {
                basicFixture.componentInstance.size = size as 'lg' | 'sm';
                basicFixture.detectChanges();
                const cardElement: HTMLElement = cardBasicDebugElement.nativeElement;
                expect(cardElement.classList.contains('thy-card')).toBe(true);
                expect(cardElement.classList.contains(`thy-card-${size}`)).toBe(true);
            });
        });
    });

    describe('divided', () => {
        let fixture!: ComponentFixture<CardDividedComponent>;
        let cardDebugElement!: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CardDividedComponent);
            fixture.detectChanges();
            cardDebugElement = fixture.debugElement.query(By.directive(ThyCard));
        });

        it('should get correct divided thy-card--divided class', () => {
            expect(fixture).toBeTruthy();
            expect(cardDebugElement).toBeTruthy();
            const cardElement: HTMLElement = cardDebugElement.nativeElement;
            expect(cardElement.classList.contains('thy-card--divided')).toBe(true);
        });
    });

    describe('bordered', () => {
        let fixture!: ComponentFixture<CardBorderedComponent>;
        let cardDebugElement!: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CardBorderedComponent);
            fixture.detectChanges();
            cardDebugElement = fixture.debugElement.query(By.directive(ThyCard));
        });

        it('should get correct bordered thy-card--bordered class', () => {
            fixture.detectChanges();
            expect(fixture).toBeTruthy();
            expect(cardDebugElement).toBeTruthy();
            const cardElement: HTMLElement = cardDebugElement.nativeElement;
            expect(cardElement.classList.contains('thy-card--bordered')).toBe(true);
        });
    });

    describe('clear-padding', () => {
        let fixture!: ComponentFixture<CardClearPaddingComponent>;
        let cardDebugElement!: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CardClearPaddingComponent);
            fixture.detectChanges();
            cardDebugElement = fixture.debugElement.query(By.directive(ThyCard));
        });

        it('should get correct thy-card--clear-left-right-padding class when thyHasLeftRightPadding is false', () => {
            expect(fixture).toBeTruthy();
            expect(cardDebugElement).toBeTruthy();
            const cardElement: HTMLElement = cardDebugElement.nativeElement;
            expect(cardElement.classList.contains('thy-card--clear-left-right-padding')).toBe(true);
        });
    });

    describe('card header', () => {
        let fixture!: ComponentFixture<CardHeaderSizeComponent>;
        let cardHeaderComponent!: DebugElement;
        let cardHeaderElement!: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CardHeaderSizeComponent);
            fixture.detectChanges();
            cardHeaderComponent = fixture.debugElement.query(By.directive(ThyCardHeader));
            cardHeaderElement = cardHeaderComponent.nativeElement;
        });

        it('should set card header size success', () => {
            fixture.detectChanges();
            expect(cardHeaderElement).toBeTruthy();
            expect(cardHeaderElement.classList.contains('thy-card-header')).toBeTruthy();

            ['lg', 'sm'].forEach(size => {
                fixture.debugElement.componentInstance.size = size;
                fixture.detectChanges();
                expect(cardHeaderElement.classList.contains(`thy-card-header-${size}`));
            });
        });
    });

    describe('card content', () => {
        let fixture!: ComponentFixture<CardContentSizeAndScrollComponent>;
        let cardContentComponent!: DebugElement;
        let cardContentElement!: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CardContentSizeAndScrollComponent);
            fixture.detectChanges();
            cardContentComponent = fixture.debugElement.query(By.directive(ThyCardContent));
            cardContentElement = cardContentComponent.nativeElement;
        });

        it('should set card content size success', () => {
            fixture.detectChanges();
            expect(cardContentElement).toBeTruthy();
            expect(cardContentElement.classList.contains('thy-card-content')).toBeTruthy();
            fixture.debugElement.componentInstance.size = `sm`;
            fixture.detectChanges();
            expect(cardContentElement.classList.contains(`thy-card-content--sm`)).toBeTruthy();
        });

        it('should set card content scroll success', () => {
            fixture.detectChanges();
            expect(cardContentElement.classList.contains('thy-card-content--scroll')).toBeFalsy();
            fixture.debugElement.componentInstance.isScroll = true;
            fixture.detectChanges();
            expect(cardContentElement.classList.contains(`thy-card-content--scroll`)).toBeTruthy();
        });
    });
});
