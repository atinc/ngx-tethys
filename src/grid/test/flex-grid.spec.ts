import { Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ThyGridModule } from 'ngx-tethys/grid';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'thy-flex-grid-text',
    template: `
        <div id="basic" thyRow [thyGutter]="gutter">
            <div id="basic-col-1" [thyCol]="span">
                <div class="demo-col">col - 1</div>
            </div>
            <div id="basic-col-2" thyCol [thySpan]="span">
                <div class="demo-col">col - 2</div>
            </div>
        </div>
    `,
    imports: [ThyGridModule]
})
class FlexGridTestComponent implements OnInit {
    gutter: number;
    span: number;

    constructor() {}

    ngOnInit(): void {}
}

describe('flex-grid', () => {
    let component!: FlexGridTestComponent;
    let fixture!: ComponentFixture<FlexGridTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlexGridTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    function getBasicRowElement(): HTMLElement {
        const debugElement = fixture.debugElement.query(By.css('#basic'));
        expect(debugElement).toBeTruthy();
        return debugElement.nativeElement as HTMLElement;
    }

    function getBasicColElement(id: string = 'basic-col-1'): HTMLElement {
        const debugElement = fixture.debugElement.query(By.css(`#${id}`));
        expect(debugElement).toBeTruthy();
        return debugElement.nativeElement as HTMLElement;
    }

    it('should create flex grid success', () => {
        const rowElement = getBasicRowElement();
        expect(rowElement).toBeTruthy();
        expect(rowElement.classList.contains('thy-row')).toBeTruthy();

        const col1Element = getBasicColElement();
        expect(col1Element).toBeTruthy();
        expect(col1Element.classList.contains('thy-col')).toBeTruthy();
        expect(col1Element.classList.contains('thy-col-24')).toBeTruthy();
    });

    it('should set gutter to 16 success', () => {
        component.gutter = 16;
        fixture.detectChanges();
        const rowElement = getBasicRowElement();
        expect(rowElement).toBeTruthy();
        expect(rowElement.classList.contains('thy-row')).toBeTruthy();
        expect(rowElement.style.marginLeft).toEqual('-8px');
        expect(rowElement.style.marginRight).toEqual('-8px');

        const col1Element = getBasicColElement();
        expect(col1Element).toBeTruthy();
        expect(col1Element.classList.contains('thy-col')).toBeTruthy();
        expect(col1Element.classList.contains('thy-col-24')).toBeTruthy();
        expect(col1Element.style.paddingLeft).toEqual('8px');
        expect(col1Element.style.paddingRight).toEqual('8px');
    });

    it('should set span success', () => {
        component.span = 8;
        fixture.detectChanges();

        const col1Element = getBasicColElement();
        expect(col1Element).toBeTruthy();
        expect(col1Element.classList.contains('thy-col')).toBeTruthy();
        expect(col1Element.classList.contains('thy-col-8')).toBeTruthy();

        const col2Element = getBasicColElement('basic-col-2');
        expect(col2Element).toBeTruthy();
        expect(col2Element.classList.contains('thy-col')).toBeTruthy();
        expect(col2Element.classList.contains('thy-col-8')).toBeTruthy();
    });
});
