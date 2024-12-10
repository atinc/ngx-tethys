import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyStatisticModule } from '../statistic.module';
import { NgModule, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyStatistic } from '../statistic.component';
describe('thy-statistic', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StatisticTestModule]
        });
        TestBed.compileComponents();
    });
    describe('thy-statistic-basic', () => {
        let fixture: ComponentFixture<ThyDemoStatisticBasicComponent>;
        let basicTestComponent: ThyDemoStatisticBasicComponent;
        let statisticComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoStatisticBasicComponent);
            basicTestComponent = fixture.debugElement.componentInstance;
            statisticComponent = fixture.debugElement.query(By.directive(ThyStatistic));
        });

        it('should have correct class', () => {
            fixture.detectChanges();
            expect(statisticComponent.nativeElement.classList.contains('thy-statistic')).toBe(true);
            expect(statisticComponent.nativeElement.classList.contains('thy-statistic-default')).toBe(true);
            expect(statisticComponent.nativeElement.classList.contains('thy-statistic-primary')).toBe(true);
        });

        it('should have correct element', () => {
            fixture.detectChanges();

            const prefixElement = statisticComponent.nativeElement.querySelector('.thy-statistic-content-prefix');
            const valueElement = statisticComponent.nativeElement.querySelector('.thy-statistic-content-value');
            const titleElement = statisticComponent.nativeElement.querySelector('.thy-statistic-title');
            expect(prefixElement.textContent).toBe('$');
            expect(valueElement.textContent).toBe('10');
            expect(titleElement.textContent).toBe('价值');
            expect(statisticComponent.nativeElement.querySelector('.thy-statistic-content-suffix')).toBe(null);
        });

        it('title should in bottom when thyTitlePosition set bottom', () => {
            fixture.detectChanges();
            expect(statisticComponent.nativeElement.children[1].classList.contains('thy-statistic-title')).toBe(true);
        });

        it('title should in top when thyTitlePosition set top', () => {
            basicTestComponent.thyTitlePosition = 'top';
            fixture.detectChanges();
            expect(statisticComponent.nativeElement.children[0].classList.contains('thy-statistic-title')).toBe(true);
        });

        it('should have thy-statistic-success when thyColor is success', () => {
            basicTestComponent.thyColor = 'success';
            fixture.detectChanges();
            expect(statisticComponent.nativeElement.classList.contains('thy-statistic-success')).toBe(true);
        });

        it('should set color #fa8b7c when thyColor is #fa8b7c', () => {
            basicTestComponent.thyColor = '#fa8b7c';
            fixture.detectChanges();
            expect(statisticComponent.nativeElement.style.color === 'rgb(250, 139, 124)').toBe(true);
            expect(statisticComponent.nativeElement.style.borderColor === '').toBe(true);
            expect(statisticComponent.nativeElement.style.backgroundColor === '').toBe(true);
        });

        it('should set color #fa8b7c and thyShape is card  when thyColor is #fa8b7c', () => {
            basicTestComponent.thyColor = '#fa8b7c';
            basicTestComponent.thyShape = 'card';
            fixture.detectChanges();
            expect(statisticComponent.nativeElement.style.color === 'rgb(250, 139, 124)').toBe(true);
            expect(statisticComponent.nativeElement.style.borderColor === 'rgb(250, 139, 124)').toBe(true);
            expect(statisticComponent.nativeElement.style.backgroundColor === 'rgba(250, 139, 124, 0.05)').toBe(true);
        });

        it('should have style when thyValueStyle set', () => {
            basicTestComponent.thyValueStyle = { 'font-size': '40px', color: '#666666' };
            fixture.detectChanges();
            const contentElement = statisticComponent.nativeElement.querySelector('.thy-statistic-content');
            expect(contentElement.style.fontSize).toBe('40px');
            expect(contentElement.style.color).toBe('rgb(102, 102, 102)');
        });

        it('should show value when value is 0', () => {
            basicTestComponent.thyValue = 0;
            fixture.detectChanges();
            const valueElement = statisticComponent.nativeElement.querySelector('.thy-statistic-content-value');
            expect(valueElement.textContent).toBe('0');
        });
    });

    describe('thy-statistic-template', () => {
        let fixture: ComponentFixture<ThyDemoStatisticTemplateComponent>;
        let templateTestComponent: ThyDemoStatisticTemplateComponent;
        let statisticComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoStatisticTemplateComponent);
            templateTestComponent = fixture.debugElement.componentInstance;
            statisticComponent = fixture.debugElement.query(By.directive(ThyStatistic));
        });

        it('prefix template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement.query(By.css('.thy-statistic-content-prefix')).nativeElement.innerText.includes('前缀')
            ).toBeTruthy();
        });

        it('value template', () => {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.thy-statistic-content-value')).nativeElement.innerText.includes('value')).toBe(true);
        });

        it('suffix template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement.query(By.css('.thy-statistic-content-suffix')).nativeElement.innerText.includes('后缀')
            ).toBeTruthy();
        });

        it('title template', () => {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.thy-statistic-title')).nativeElement.innerText.includes('标题')).toBe(true);
        });
    });

    describe('thy-statistic-template-outside', () => {
        let fixture: ComponentFixture<ThyDemoStatisticTemplateOutsideComponent>;
        let templateTestComponent: ThyDemoStatisticTemplateOutsideComponent;
        let statisticComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoStatisticTemplateOutsideComponent);
            templateTestComponent = fixture.debugElement.componentInstance;
            statisticComponent = fixture.debugElement.query(By.directive(ThyStatistic));
        });

        it('prefix template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement.query(By.css('.thy-statistic-content-prefix')).nativeElement.innerText.includes('前缀')
            ).toBeTruthy();
        });

        it('value template', () => {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.thy-statistic-content-value')).nativeElement.innerText.includes('value')).toBe(true);
        });

        it('suffix template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement.query(By.css('.thy-statistic-content-suffix')).nativeElement.innerText.includes('后缀')
            ).toBeTruthy();
        });

        it('title template', () => {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.thy-statistic-title')).nativeElement.innerText.includes('标题')).toBe(true);
        });
    });
});

@Component({
    selector: 'thy-demo-statistic-basic',
    template: `
        <thy-statistic
            [thyValue]="thyValue"
            [thyTitle]="thyTitle"
            [thyPrefix]="thyPrefix"
            [thyColor]="thyColor"
            [thyShape]="thyShape"
            [thySuffix]="thySuffix"
            [thyValueStyle]="thyValueStyle"
            [thyTitlePosition]="thyTitlePosition"></thy-statistic>
    `,
    standalone: false
})
class ThyDemoStatisticBasicComponent {
    thyValue = 10;
    thyTitle = '价值';
    thyPrefix = '$';
    thyColor = 'primary';
    thyShape = undefined;
    thySuffix = undefined;
    thyValueStyle = undefined;
    thyTitlePosition = 'bottom';
}

@Component({
    selector: 'thy-demo-statistic-template',
    template: `
        <thy-statistic [thyValue]="thyValue">
            <ng-template #value>value</ng-template>
            <ng-template #prefix>前缀</ng-template>
            <ng-template #suffix>后缀</ng-template>
            <ng-template #title>标题</ng-template>
        </thy-statistic>
    `,
    standalone: false
})
class ThyDemoStatisticTemplateComponent {
    thyValue = 80;
}

@Component({
    selector: 'thy-demo-statistic-template-outside',
    template: `
        <thy-statistic [thyPrefixTemplate]="prefix" [thyValueTemplate]="value" [thySuffixTemplate]="suffix" [thyTitleTemplate]="title">
        </thy-statistic>
        <ng-template #value>value</ng-template>
        <ng-template #prefix>前缀</ng-template>
        <ng-template #suffix>后缀</ng-template>
        <ng-template #title>标题</ng-template>
    `,
    standalone: false
})
class ThyDemoStatisticTemplateOutsideComponent {}

@NgModule({
    imports: [ThyStatisticModule],
    declarations: [ThyDemoStatisticBasicComponent, ThyDemoStatisticTemplateComponent, ThyDemoStatisticTemplateOutsideComponent],
    exports: [ThyDemoStatisticBasicComponent, ThyDemoStatisticTemplateComponent, ThyDemoStatisticTemplateOutsideComponent]
})
export class StatisticTestModule {}
