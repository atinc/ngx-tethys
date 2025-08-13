import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, DomSanitizer } from '@angular/platform-browser';
import { ThyI18nService } from '../../../i18n';
import { THY_DATE_PICKER_CONFIG, useDatePickerDefaultConfig } from '../../date-picker.config';
import { DateTableCell } from './date-table-cell.component';

@Component({
    standalone: true,
    template: `
        <ng-template #testTemplate let-date>
            <div class="custom-template">Template Date: {{ date }}</div>
        </ng-template>
    `
})
class TestHostComponent {
    @ViewChild('testTemplate') testTemplate!: TemplateRef<Date>;

    sanitizer = inject(DomSanitizer);
}

describe('DateTableCell config', () => {
    let component: DateTableCell | undefined = undefined;
    let fixture: ComponentFixture<DateTableCell> | undefined = undefined;
    let testHostFixture: ComponentFixture<TestHostComponent> | undefined = undefined;
    let testHostComponent: TestHostComponent | undefined = undefined;

    // Mock cell data
    const mockCell = {
        value: new Date('2025-05-15'),
        isSelected: false,
        isDisabled: false
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DateTableCell, TestHostComponent],
            declarations: [],
            providers: [
                {
                    provide: DomSanitizer,
                    useValue: {
                        bypassSecurityTrustHtml: (html: string) => html
                    }
                },
                {
                    provide: THY_DATE_PICKER_CONFIG,
                    useFactory: (sanitizer: DomSanitizer) => ({
                        ...useDatePickerDefaultConfig(),
                        dateCellRender: (date: Date) => {
                            return sanitizer.bypassSecurityTrustHtml(`<em>${date.getDate()}</em>`);
                        }
                    }),
                    deps: [DomSanitizer, ThyI18nService]
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DateTableCell);
        component = fixture.componentInstance;

        // Initialize component with mock data
        Object.defineProperty(component, 'cell', {
            get: () => () => ({ ...mockCell })
        });
        Object.defineProperty(component, 'prefixCls', {
            get: () => signal('thy-calendar'),
            configurable: true
        });

        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('date-table-cell', () => {
        it('should render template when cellRender is TemplateRef', () => {
            component.cellRender = signal(testHostComponent.testTemplate);
            fixture.detectChanges();

            const templateContent = fixture.debugElement.query(By.css('.custom-template'));
            expect(templateContent).toBeTruthy();
            expect(templateContent.nativeElement.textContent).toContain('Template Date:');
        });

        it('should render HTML string when cellRender is string', () => {
            component.cellRender = signal('<strong>Custom</strong> Content');
            fixture.detectChanges();

            const spanElement = fixture.debugElement.query(By.css('span'));
            expect(spanElement).toBeTruthy();
            expect(spanElement.nativeElement.innerHTML).toBe('<strong>Custom</strong> Content');
        });

        it('should render function result when cellRender is function', () => {
            const mockFn = (date: Date) => `Function: ${date.getDate()}`;
            component.cellRender = signal(mockFn);
            fixture.detectChanges();

            const spanElement = fixture.debugElement.query(By.css('span'));
            expect(spanElement).toBeTruthy();
            expect(spanElement.nativeElement.innerHTML).toContain('Function: 15');
        });

        it('should handle SafeHtml return from function', () => {
            fixture.detectChanges();
            const spanElement = fixture.debugElement.query(By.css('span'));
            expect(spanElement.nativeElement.innerHTML).toContain('<em>15</em>');
        });
    });
});
