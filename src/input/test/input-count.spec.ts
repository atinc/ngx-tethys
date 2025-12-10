import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyInputCount, ThyInputModule } from 'ngx-tethys/input';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'test-input-count-basic',
    template: `
        <thy-input-group>
            <input thyInput name="name" [(ngModel)]="name" maxlength="100" placeholder="Please type name (auto find input-group's input)" />
            <ng-template #suffix>
                <thy-input-count></thy-input-count>
            </ng-template>
        </thy-input-group>
    `,
    imports: [ThyInputModule, FormsModule]
})
class TestInputCountBasicComponent {
    name!: '';
}

@Component({
    selector: 'test-input-count-specify-input',
    template: `
        <thy-input-group>
            <input
                thyInput
                name="name"
                #input="thyInput"
                [(ngModel)]="name"
                maxlength="100"
                placeholder="Please type name (auto find input-group's input)" />
            <ng-template #suffix>
                <thy-input-count [thyInput]="input"></thy-input-count>
            </ng-template>
        </thy-input-group>
    `,
    imports: [ThyInputModule, FormsModule]
})
class TestInputCountSpecifyInputBasicComponent {
    name!: '';
}

describe('input count', () => {
    let fixture!: ComponentFixture<TestInputCountBasicComponent>;
    let countDebugElement!: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestInputCountBasicComponent);
        fixture.detectChanges();
        countDebugElement = fixture.debugElement.query(By.directive(ThyInputCount));
    });

    it('should create input count', () => {
        expect(countDebugElement).toBeTruthy();
        const countElement = countDebugElement.nativeElement as HTMLElement;
        expect(countElement.classList.contains('text-muted')).toBeTruthy();
        expect(countElement.textContent).toEqual('0 / 100');
    });

    it('should type text trigger input count changed', () => {
        const inputDebugElement = fixture.debugElement.query(By.css('input'));
        const inputElement: HTMLInputElement = inputDebugElement.nativeElement;
        inputElement.value = 'NewValue';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(countDebugElement).toBeTruthy();
        const countElement = countDebugElement.nativeElement as HTMLElement;
        expect(countElement.classList.contains('text-muted')).toBeTruthy();
        expect(countElement.textContent).toEqual('8 / 100');
    });

    it('should create with specify input', () => {
        fixture = TestBed.createComponent(TestInputCountSpecifyInputBasicComponent);
        fixture.detectChanges();
        countDebugElement = fixture.debugElement.query(By.directive(ThyInputCount));
        expect(countDebugElement).toBeTruthy();
        const countElement = countDebugElement.nativeElement as HTMLElement;
        expect(countElement.classList.contains('text-muted')).toBeTruthy();
        expect(countElement.textContent).toEqual('0 / 100');
    });
});
