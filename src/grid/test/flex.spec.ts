import { Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ThyGridModule } from '../module';
import { ThyFlexAlignItems, ThyFlexDirection, ThyFlexGrow, ThyFlexJustifyContent, ThyFlexShrink, ThyFlexWrap } from '../flex';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'thy-grid-flex-text',
    template: `
        <div
            id="flex-basic"
            thyFlex
            [thyDirection]="direction"
            [thyWrap]="wrap"
            [thyJustifyContent]="justifyContent"
            [thyAlignItems]="alignItems"
            [thyGap]="gap">
            <div id="flex-basic-item-1" [thyFlexItem]="itemFlex" [thyGrow]="itemGrow" [thyShrink]="itemShrink" [thyBasis]="itemBasis">
                <div class="light-blue">Item 1</div>
            </div>
            <div id="flex-basic-item-2" thyFlexItem><div class="blue">Item 2</div></div>
        </div>
        <thy-flex id="flex-component" thyDirection="column">
            <thy-flex-item thyGrow="1" id="flex-component-item-1"><div class="blue">Item 1</div></thy-flex-item>
        </thy-flex>
    `,
    imports: [ThyGridModule]
})
class FlexTestComponent implements OnInit {
    direction: ThyFlexDirection;
    wrap: ThyFlexWrap;
    justifyContent: ThyFlexJustifyContent;
    alignItems: ThyFlexAlignItems;
    gap: number;
    itemFlex: string;
    itemGrow: ThyFlexGrow;
    itemShrink: ThyFlexShrink;
    itemBasis: string;

    constructor() {}

    ngOnInit(): void {}
}

describe('flex', () => {
    let component: FlexTestComponent;
    let fixture: ComponentFixture<FlexTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlexTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    function getBasicFlexElement(): HTMLElement {
        const flexBasicDebugElement = fixture.debugElement.query(By.css('#flex-basic'));
        expect(flexBasicDebugElement).toBeTruthy();
        return flexBasicDebugElement.nativeElement as HTMLElement;
    }
    function getBasicFlexItemElement(): HTMLElement {
        const flexItem1DebugElement = fixture.debugElement.query(By.css('#flex-basic-item-1'));
        expect(flexItem1DebugElement).toBeTruthy();
        const flexItem1Element = flexItem1DebugElement.nativeElement as HTMLElement;
        return flexItem1Element;
    }

    function assertFlexElement(
        flexElement: HTMLElement,
        expected: {
            direction: ThyFlexDirection;
            wrap?: ThyFlexWrap;
            justifyContent?: ThyFlexJustifyContent;
            alignItems?: ThyFlexAlignItems;
            gap?: number;
        } = { direction: 'row' }
    ) {
        expect(flexElement.classList.contains('d-flex')).toBeTruthy();
        expect(flexElement.classList.contains('thy-flex')).toBeTruthy();
        expect(flexElement.classList.contains(`flex-${expected.direction || 'row'}`)).toBeTruthy();
        if (expected.justifyContent) {
            expect(flexElement.classList.contains(`justify-content-${expected.justifyContent}`)).toBeTruthy(
                `justify content expected: ${expected.justifyContent}, classList: ${flexElement.classList}`
            );
        }
        if (expected.alignItems) {
            expect(flexElement.classList.contains(`align-items-${expected.alignItems}`)).toBeTruthy(
                `align items expected: ${expected.alignItems}, classList: ${flexElement.classList}`
            );
        }
        if (expected.wrap) {
            expect(flexElement.classList.contains(`flex-${expected.wrap}`)).toBeTruthy();
        }
        if (expected.gap) {
            expect(flexElement.style.gap).toEqual(`${expected.gap}px`);
        }
    }

    it('should create thyFlex success', () => {
        const flexElement = getBasicFlexElement();
        expect(flexElement).toBeTruthy();
        assertFlexElement(flexElement);

        const flexItem1Element = getBasicFlexItemElement();
        expect(flexItem1Element.classList.contains('thy-flex-item')).toBeTruthy();
    });

    it('should create thy-flex and thy-flex-item success', () => {
        const flexDebugElement = fixture.debugElement.query(By.css('#flex-component'));
        expect(flexDebugElement).toBeTruthy();
        const flexElement = flexDebugElement.nativeElement as HTMLElement;
        expect(flexElement).toBeTruthy();
        assertFlexElement(flexElement, {
            direction: 'column'
        });

        const flexItemDebugElement = fixture.debugElement.query(By.css('#flex-component-item-1'));
        expect(flexItemDebugElement).toBeTruthy();
        const flexItemElement = flexItemDebugElement.nativeElement as HTMLElement;
        expect(flexItemElement).toBeTruthy();
        expect(flexItemElement.classList.contains('thy-flex-item')).toBeTruthy();
        expect(flexItemElement.classList.contains('flex-grow-1')).toBeTruthy();
    });

    it('should set thyFlex inputs success', () => {
        const flexElement = getBasicFlexElement();
        expect(flexElement).toBeTruthy();
        assertFlexElement(flexElement);

        component.direction = 'column';
        component.alignItems = 'flex-end';
        component.gap = 10;
        component.wrap = 'wrap';
        component.justifyContent = 'flex-end';
        fixture.detectChanges();
        assertFlexElement(flexElement, { direction: 'column', alignItems: 'end', gap: 10, justifyContent: 'end', wrap: 'wrap' });
    });

    it('should normalize start and end to flex-start and flex-end', () => {
        const flexElement = getBasicFlexElement();
        expect(flexElement).toBeTruthy();
        assertFlexElement(flexElement);

        ['start', 'end'].forEach(align => {
            component.alignItems = align as ThyFlexAlignItems;
            component.justifyContent = align as ThyFlexJustifyContent;
            fixture.detectChanges();
            assertFlexElement(flexElement, {
                direction: 'row',
                alignItems: `${align}` as ThyFlexAlignItems,
                justifyContent: `${align}` as ThyFlexJustifyContent
            });

            component.alignItems = `flex-${align}` as ThyFlexAlignItems;
            component.justifyContent = `flex-${align}` as ThyFlexJustifyContent;
            fixture.detectChanges();
            assertFlexElement(flexElement, {
                direction: 'row',
                alignItems: `${align}` as ThyFlexAlignItems,
                justifyContent: `${align}` as ThyFlexJustifyContent
            });
        });
    });

    it('should set item flex success', () => {
        const flexItem1Element = getBasicFlexItemElement();

        component.itemFlex = '1 0 auto';
        fixture.detectChanges();
        expect(flexItem1Element.style.flex).toEqual('1 0 auto');

        component.itemFlex = 'fill';
        fixture.detectChanges();
        expect(flexItem1Element.style.flex).toEqual('');
        expect(flexItem1Element.classList.contains('flex-fill')).toBeTruthy();
    });

    it('should set item grow, shrink and basis success', () => {
        component.itemGrow = 1;
        component.itemShrink = 1;
        component.itemBasis = 'initial';
        fixture.detectChanges();
        const flexItem1Element = getBasicFlexItemElement();
        expect(flexItem1Element.style.flexBasis).toEqual('initial');
        expect(flexItem1Element.classList.contains('flex-grow-1')).toBeTruthy();
        expect(flexItem1Element.classList.contains('flex-shrink-1')).toBeTruthy();
    });
});
