import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ThyAffix } from '../affix.component';
import { ThyButton } from 'ngx-tethys/button';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-test-affix-basic',
    template: `
        <thy-affix [thyOffsetTop]="offsetTop" (thyChange)="onChange($event)">
            <button thyButton thyType="primary">
                <span>Affix Button</span>
            </button>
        </thy-affix>
    `,
    imports: [ThyAffix, ThyButton]
})
class ThyAffixTestBasicComponent {
    offsetTop = 0;
    onChange(status: boolean): void {
        console.log(status);
    }
}

describe('thy-affix', () => {
    let fixture: ComponentFixture<ThyAffixTestBasicComponent>;
    let affixDebugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ThyAffixTestBasicComponent],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyAffixTestBasicComponent);
        fixture.detectChanges();
        affixDebugElement = fixture.debugElement.query(By.directive(ThyAffix));
    });

    it('should create', () => {
        expect(affixDebugElement).toBeTruthy();
        const element: HTMLElement = affixDebugElement.nativeElement;
        expect(element.querySelector('button')).toBeTruthy();
    });

    it('should emit change event when fixed', fakeAsync(() => {
        const onChangeSpy = spyOn(fixture.componentInstance, 'onChange');
        const element: HTMLElement = affixDebugElement.nativeElement;
        const fixedElement = element.querySelector('.thy-affix');
        if (fixedElement) {
            fixedElement.classList.add('thy-affix');
            fixture.detectChanges();
            tick();
            expect(onChangeSpy).toHaveBeenCalledWith(true);
        }
    }));
});
