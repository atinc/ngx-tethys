import { provideHttpClient } from '@angular/common/http';
import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    Directive,
    inject,
    inputBinding,
    signal,
    viewChild,
    ViewContainerRef
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Field, FORM_FIELD, form, FormField, FormRoot } from '@angular/forms/signals';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ThySelect } from 'ngx-tethys/select';
import { bypassSanitizeProvider, injectDefaultSvgIconSet } from 'ngx-tethys/testing';

@Directive({ selector: '[thyProbeOutlet]' })
class ProbeOutletDirective {
    readonly viewContainerRef = inject(ViewContainerRef);
}

/** 验证 createComponent 可在无包装组件时挂上 FormField。 */
@Component({
    selector: 'thy-test-form-field-create-component',
    template: `
        <form [formRoot]="fieldTree">
            <ng-container thyProbeOutlet></ng-container>
            <input id="static-note" [formField]="fieldTree.note" />
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormRoot, FormField, ProbeOutletDirective]
})
class TestFormFieldCreateComponentHost {
    private readonly outlet = viewChild.required(ProbeOutletDirective);

    readonly model = signal<{ role: string | null; note: string }>({ role: null, note: '' });
    readonly fieldTree = form(this.model);

    selectRef?: ComponentRef<ThySelect>;
    attachedFormField?: FormField<unknown>;
    createError: unknown;

    constructor() {
        afterNextRender(() => {
            try {
                const field: Field<string | null> = this.fieldTree.role as unknown as Field<string | null>;
                this.selectRef = this.outlet().viewContainerRef.createComponent(ThySelect, {
                    directives: [
                        {
                            type: FormField,
                            bindings: [inputBinding('formField', () => field)]
                        }
                    ],
                    bindings: [
                        inputBinding('thyOptions', () => [
                            { value: 'dev', label: 'Developer' },
                            { value: 'pm', label: 'Product' }
                        ]),
                        inputBinding('thyPlaceholder', () => 'Select role')
                    ]
                });
                this.attachedFormField = this.selectRef.injector.get(FORM_FIELD) as FormField<unknown>;
            } catch (error) {
                this.createError = error;
            }
        });
    }
}

describe('FormField via createComponent directives', () => {
    let fixture: ComponentFixture<TestFormFieldCreateComponentHost>;
    let host: TestFormFieldCreateComponentHost;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [bypassSanitizeProvider, provideHttpClient(), provideNoopAnimations()]
        });
        injectDefaultSvgIconSet();
        fixture = TestBed.createComponent(TestFormFieldCreateComponentHost);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create ThySelect with FormField host directive without throwing', fakeAsync(() => {
        tick();
        fixture.detectChanges();

        expect(host.createError).toBeUndefined();
        expect(host.selectRef).toBeTruthy();
        expect(fixture.nativeElement.querySelector('thy-select')).toBeTruthy();
        expect(host.attachedFormField).toBeTruthy();
        expect(host.attachedFormField!.field()).toBe(host.fieldTree.role);
    }));

    it('should sync model through FormField attached by createComponent directives', fakeAsync(() => {
        tick();
        fixture.detectChanges();

        expect(host.createError).toBeUndefined();
        expect(host.attachedFormField).toBeTruthy();

        host.fieldTree.role().value.set('dev');
        tick();
        fixture.detectChanges();
        expect(host.model().role).toBe('dev');

        host.fieldTree.role().value.set('pm');
        tick();
        fixture.detectChanges();
        expect(host.model().role).toBe('pm');

        const staticInput = fixture.nativeElement.querySelector('#static-note') as HTMLInputElement;
        staticInput.value = 'hello';
        staticInput.dispatchEvent(new Event('input'));
        tick();
        fixture.detectChanges();
        expect(host.model().note).toBe('hello');
    }));
});


