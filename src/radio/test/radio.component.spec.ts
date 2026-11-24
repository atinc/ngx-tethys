import { Component, DebugElement, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyRadioModule, ThyRadio, ThyRadioGroup, ThyRadioOption } from 'ngx-tethys/radio';

@Component({
    selector: 'thy-radio-test',
    template: ` <label thyRadio [thyLabelText]="labelText" [thyDisabled]="isDisabled"></label> `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRadioModule, FormsModule]
})
class RadioTestComponent {
    labelText = '单选选项';
    isDisabled: boolean = false;
}

describe('radio component', () => {
    let fixture!: ComponentFixture<RadioTestComponent>;
    let testRadioComponent!: RadioTestComponent;
    let radioDebugComponent!: DebugElement;
    let radioElement!: HTMLElement;
    let labelNode!: any;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioTestComponent);
        testRadioComponent = fixture.debugElement.componentInstance;
        radioDebugComponent = fixture.debugElement.query(By.directive(ThyRadio));
        radioElement = radioDebugComponent.nativeElement;
        labelNode = radioElement.children[0];
    });

    it('should create', () => {
        expect(testRadioComponent).toBeTruthy();
        expect(radioElement).toBeTruthy();
    });

    it('should select when click', () => {
        labelNode.click();
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].children[0].checked).toBe(true);
    });

    it('should have correct class when it‘s isDisabled has changed', () => {
        testRadioComponent.labelText = null;
        fixture.detectChanges();
        expect(labelNode.classList.contains('form-check-no-label-text')).toBeTruthy();
        testRadioComponent.isDisabled = true;
        fixture.detectChanges();
        expect(labelNode.tabIndex).toBe(-1);
    });

    it('should has default tabindex', () => {
        expect(labelNode.tabIndex).toBe(0);
    });
});

@Component({
    selector: 'thy-radio-group-test',
    template: `
        <thy-radio-group #radioGroup [(ngModel)]="checkedValue" [thySize]="size" [thyDisabled]="disabled">
            <label thyRadio thyLabelText="选项一" [thyValue]="1" [thyInline]="inlineStatus"></label>
            <label thyRadioButton thyLabelText="选项二" [thyValue]="2" [thyInline]="inlineStatus"></label>
            <label thyRadio thyLabelText="选项三" [thyValue]="3" [thyInline]="inlineStatus"></label>
        </thy-radio-group>
        <p class="mt-2">选中的选项值： {{ checkedValue }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRadioModule, FormsModule]
})
class RadioGroupTestComponent {
    @ViewChild('radioGroup', { static: true }) radioGroup: ThyRadioGroup;
    checkedValue = 1;
    inlineStatus = false;
    size!: string;
    disabled = false;
}

describe('thy-radio-group component', () => {
    let groupFixture!: ComponentFixture<RadioGroupTestComponent>;
    let groupComponent!: RadioGroupTestComponent;
    let radioGroupDebugComponent!: DebugElement;
    let labelComponent!: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({}).compileComponents();
    });

    beforeEach(() => {
        groupFixture = TestBed.createComponent(RadioGroupTestComponent);
        groupComponent = groupFixture.componentInstance;
        radioGroupDebugComponent = groupFixture.debugElement.query(By.directive(ThyRadioGroup));
        labelComponent = radioGroupDebugComponent.nativeElement.children;
        groupFixture.detectChanges();
    });

    it('should create thy-radio-group component', () => {
        expect(groupFixture).toBeTruthy();
        expect(groupComponent).toBeTruthy();
        expect(labelComponent).toBeTruthy();
        groupFixture.detectChanges();
    });

    it(`should has class thyRadioButton to thy-radio-group`, fakeAsync(() => {
        groupFixture.detectChanges();
        tick(500);
        groupFixture.detectChanges();
        expect(labelComponent[1].classList.contains('btn')).toBeTruthy();
    }));

    it(`should change select value`, fakeAsync(() => {
        groupComponent.checkedValue = 2;
        groupFixture.detectChanges();
        tick(500);
        groupFixture.detectChanges();
        expect(labelComponent[1].classList.contains('form-check-checked')).toBeTruthy();
    }));

    it(`should  has class Toggle inline to thy-radio-group`, fakeAsync(() => {
        groupComponent.inlineStatus = true;
        groupComponent.checkedValue = 3;
        groupFixture.detectChanges();
        tick(500);
        groupFixture.detectChanges();
        expect(labelComponent[2].classList.contains('form-check-checked')).toBeTruthy();
        [1, 2, 3].forEach((element: number, index: number) => {
            expect(labelComponent[index].classList.contains('form-check-inline')).toBeTruthy();
        });
    }));

    it('should set thySize success', fakeAsync(() => {
        const buttonGroupSizeMap: Record<string, string> = {
            sm: 'btn-group-sm',
            md: 'btn-group-md',
            lg: 'btn-group-lg'
        };
        const radioGroupElement = radioGroupDebugComponent.nativeElement as HTMLElement;

        ['sm', 'md', 'lg'].forEach(size => {
            groupComponent.size = size;
            groupFixture.detectChanges();
            expect(radioGroupElement.classList.contains(buttonGroupSizeMap[size])).toBeTruthy();
        });
    }));

    it('should update disable status success', fakeAsync(() => {
        groupComponent.disabled = true;
        groupComponent.checkedValue = 1;
        groupFixture.detectChanges();
        tick();
        groupFixture.detectChanges();
        expect(groupComponent.checkedValue).toBe(1);
        labelComponent[2].click();
        groupFixture.detectChanges();
        flush();
        groupFixture.detectChanges();
        expect(labelComponent[2].classList).not.toContain('form-check-checked');
        expect(groupComponent.checkedValue).toBe(1);
    }));

    it('should thyRadioButton disable status success', fakeAsync(() => {
        groupComponent.disabled = true;
        groupComponent.checkedValue = 1;
        groupFixture.detectChanges();
        tick();
        groupFixture.detectChanges();
        expect(groupComponent.checkedValue).toBe(1);
        labelComponent[1].click();
        groupFixture.detectChanges();
        flush();
        groupFixture.detectChanges();
        expect(labelComponent[1].classList).not.toContain('form-check-checked');
        expect(groupComponent.checkedValue).toBe(1);
    }));
});

@Component({
    selector: 'thy-radio-group-options-test',
    template: `
        <thy-radio-group
            [(ngModel)]="checkedValue"
            [thyOptions]="options"
            [thyDisabled]="disabled"
            [thyInline]="inline"
            [thyLayout]="layout">
            <label thyRadio thyLabelText="投影一" [thyValue]="'a'"></label>
            <label thyRadio thyLabelText="投影二" [thyValue]="'b'"></label>
        </thy-radio-group>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRadioModule, FormsModule]
})
class RadioGroupOptionsTestComponent {
    checkedValue: string | number | boolean = 'apple';
    disabled = false;
    inline = false;
    layout!: string;
    options: ThyRadioOption[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Pear', value: 'pear' },
        { label: 'Orange', value: 'orange', disabled: true }
    ];
}

@Component({
    selector: 'thy-radio-group-options-reactive-test',
    template: ` <thy-radio-group [formControl]="control" [thyOptions]="options" [thyDisabled]="disabled"></thy-radio-group> `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRadioModule, ReactiveFormsModule]
})
class RadioGroupOptionsReactiveTestComponent {
    control = new FormControl<string | number | boolean | null>('apple');
    disabled = false;
    options: ThyRadioOption[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'On', value: true },
        { label: 'Off', value: false }
    ];
}

@Component({
    selector: 'thy-radio-group-inline-attribute-test',
    template: ` <thy-radio-group [(ngModel)]="checkedValue" thyInline [thyOptions]="options"></thy-radio-group> `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRadioModule, FormsModule]
})
class RadioGroupInlineAttributeTestComponent {
    checkedValue: string | number | boolean = 'apple';
    options: ThyRadioOption[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Pear', value: 'pear' }
    ];
}

describe('thy-radio-group options mode', () => {
    let fixture!: ComponentFixture<RadioGroupOptionsTestComponent>;
    let testComponent!: RadioGroupOptionsTestComponent;
    let groupDebugElement!: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioGroupOptionsTestComponent);
        testComponent = fixture.debugElement.componentInstance;
        groupDebugElement = fixture.debugElement.query(By.directive(ThyRadioGroup));
    });

    it('should render options when thyOptions is not empty', () => {
        fixture.detectChanges();
        expect(groupDebugElement.nativeElement.querySelectorAll('input[type="radio"]').length).toBe(3);
        expect(groupDebugElement.nativeElement.querySelectorAll('.form-check-label')[0].textContent.trim()).toBe('Apple');
    });

    it('should check option from ngModel value', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        const inputs = groupDebugElement.nativeElement.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
        expect(inputs[0].checked).toBe(true);
        expect(inputs[1].checked).toBe(false);
    }));

    it('should update ngModel when click option', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const labels = groupDebugElement.nativeElement.querySelectorAll('.form-check') as NodeListOf<HTMLElement>;
        labels[1].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        expect(testComponent.checkedValue).toBe('pear');
    }));

    it('should not select disabled option', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const inputs = groupDebugElement.nativeElement.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
        expect(inputs[2].disabled).toBe(true);

        const labels = groupDebugElement.nativeElement.querySelectorAll('.form-check') as NodeListOf<HTMLElement>;
        labels[2].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        expect(testComponent.checkedValue).toBe('apple');
    }));

    it('should disable all options when thyDisabled is true', fakeAsync(() => {
        testComponent.disabled = true;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const inputs = groupDebugElement.nativeElement.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
        expect(Array.from(inputs).every(input => input.disabled)).toBe(true);
    }));

    it('should apply inline flex class when thyInline is true', () => {
        testComponent.inline = true;
        fixture.detectChanges();
        expect(groupDebugElement.nativeElement.classList.contains('radio-group-layout-flex')).toBe(true);
    });

    it('should apply flex class when deprecated thyLayout is flex', () => {
        testComponent.layout = 'flex';
        fixture.detectChanges();
        expect(groupDebugElement.nativeElement.classList.contains('radio-group-layout-flex')).toBe(true);
    });

    it('should coerce static thyInline attribute to true', () => {
        const staticFixture = TestBed.createComponent(RadioGroupInlineAttributeTestComponent);
        staticFixture.detectChanges();
        const group = staticFixture.debugElement.query(By.directive(ThyRadioGroup));
        expect(group.componentInstance.thyInline()).toBe(true);
        expect(group.nativeElement.classList.contains('radio-group-layout-flex')).toBe(true);
    });

    it('should prefer options over projected content when thyOptions is not empty', () => {
        fixture.detectChanges();
        const groupElement = groupDebugElement.nativeElement as HTMLElement;
        expect(groupElement.querySelectorAll('input[type="radio"]').length).toBe(3);
        expect(groupElement.querySelectorAll('[thyRadio]').length).toBe(0);
        expect(groupElement.textContent).not.toContain('投影一');
    });

    it('should fall back to content projection when thyOptions is empty', fakeAsync(() => {
        testComponent.options = [];
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const groupElement = groupDebugElement.nativeElement as HTMLElement;
        expect(groupElement.querySelectorAll('[thyRadio]').length).toBe(2);
        expect(groupElement.textContent).toContain('投影一');
    }));

    it('should keep content projection selection working after switching from options mode', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        testComponent.options = [];
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const labels = groupDebugElement.nativeElement.querySelectorAll('[thyRadio]') as NodeListOf<HTMLElement>;
        expect(labels.length).toBe(2);
        labels[1].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        expect(testComponent.checkedValue).toBe('b');
        expect(labels[1].classList.contains('form-check-checked')).toBe(true);
    }));

    it('should keep projected selection after options ↔ content round-trip', fakeAsync(() => {
        testComponent.options = [];
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(groupDebugElement.nativeElement.querySelectorAll('[thyRadio]').length).toBe(2);

        testComponent.options = [
            { label: 'Apple', value: 'apple' },
            { label: 'Pear', value: 'pear' }
        ];
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const groupElement = groupDebugElement.nativeElement as HTMLElement;
        expect(groupElement.querySelectorAll('[thyRadio]').length).toBe(0);
        expect(groupElement.querySelectorAll('input[type="radio"]').length).toBe(2);

        testComponent.options = [];
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const labels = groupElement.querySelectorAll('[thyRadio]') as NodeListOf<HTMLElement>;
        expect(labels.length).toBe(2);
        labels[0].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(testComponent.checkedValue).toBe('a');
        expect(labels[0].classList.contains('form-check-checked')).toBe(true);
    }));
});

describe('thy-radio-group options reactive forms', () => {
    let fixture!: ComponentFixture<RadioGroupOptionsReactiveTestComponent>;
    let testComponent!: RadioGroupOptionsReactiveTestComponent;
    let groupDebugElement!: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioGroupOptionsReactiveTestComponent);
        testComponent = fixture.debugElement.componentInstance;
        groupDebugElement = fixture.debugElement.query(By.directive(ThyRadioGroup));
    });

    it('should work with formControl and boolean values', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const labels = groupDebugElement.nativeElement.querySelectorAll('.form-check') as NodeListOf<HTMLElement>;
        labels[1].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        expect(testComponent.control.value).toBe(true);
    }));

    it('should respect formControl disable', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        testComponent.control.disable();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const inputs = groupDebugElement.nativeElement.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
        expect(Array.from(inputs).every(input => input.disabled)).toBe(true);
    }));

    it('should keep formControl disable when thyDisabled toggles back to false', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        testComponent.control.disable();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        testComponent.disabled = true;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        testComponent.disabled = false;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const inputs = groupDebugElement.nativeElement.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
        expect(Array.from(inputs).every(input => input.disabled)).toBe(true);

        const labels = groupDebugElement.nativeElement.querySelectorAll('.form-check') as NodeListOf<HTMLElement>;
        labels[1].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(testComponent.control.value).toBe('apple');
    }));
});
