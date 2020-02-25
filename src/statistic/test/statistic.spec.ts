import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyStatisticModule } from '../statistic.module';
import { NgModule, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyStatisticComponent } from '../statistic.component';
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
            statisticComponent = fixture.debugElement.query(By.directive(ThyStatisticComponent));
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

        it('should have thy-statistic-success when thyStatistic is success-weak', () => {
            basicTestComponent.thyValueStyle = { 'font-size': '40px', color: '#666666' };
            fixture.detectChanges();
            const contentElement = statisticComponent.nativeElement.querySelector('.thy-statistic-content');
            expect(contentElement.style.fontSize).toBe('40px');
            expect(contentElement.style.color).toBe('rgb(102, 102, 102)');
        });
    });

    describe('thy-statistic-template', () => {
        let fixture: ComponentFixture<ThyDemoStatisticTemplateComponent1>;
        let templateTestComponent: ThyDemoStatisticTemplateComponent1;
        let statisticComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoStatisticTemplateComponent1);
            templateTestComponent = fixture.debugElement.componentInstance;
            statisticComponent = fixture.debugElement.query(By.directive(ThyStatisticComponent));
        });

        it('prefix template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement
                    .query(By.css('.thy-statistic-content-prefix'))
                    .nativeElement.innerText.includes('前缀')
            ).toBeTruthy();
        });

        it('value template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement
                    .query(By.css('.thy-statistic-content-value'))
                    .nativeElement.innerText.includes('value')
            ).toBe(true);
        });

        it('suffix template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement
                    .query(By.css('.thy-statistic-content-suffix'))
                    .nativeElement.innerText.includes('后缀')
            ).toBeTruthy();
        });

        it('title template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement.query(By.css('.thy-statistic-title')).nativeElement.innerText.includes('标题')
            ).toBe(true);
        });
    });

    describe('thy-statistic-template2', () => {
        let fixture: ComponentFixture<ThyDemoStatisticTemplateComponent2>;
        let templateTestComponent: ThyDemoStatisticTemplateComponent2;
        let statisticComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoStatisticTemplateComponent2);
            templateTestComponent = fixture.debugElement.componentInstance;
            statisticComponent = fixture.debugElement.query(By.directive(ThyStatisticComponent));
        });

        it('prefix template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement
                    .query(By.css('.thy-statistic-content-prefix'))
                    .nativeElement.innerText.includes('前缀')
            ).toBeTruthy();
        });

        it('value template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement
                    .query(By.css('.thy-statistic-content-value'))
                    .nativeElement.innerText.includes('value')
            ).toBe(true);
        });

        it('suffix template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement
                    .query(By.css('.thy-statistic-content-suffix'))
                    .nativeElement.innerText.includes('后缀')
            ).toBeTruthy();
        });

        it('title template', () => {
            fixture.detectChanges();
            expect(
                fixture.debugElement.query(By.css('.thy-statistic-title')).nativeElement.innerText.includes('标题')
            ).toBe(true);
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
        ></thy-statistic>
    `
})
class ThyDemoStatisticBasicComponent {
    thyValue = 10;
    thyTitle = '价值';
    thyPrefix = '$';
    thyColor = 'primary';
    thyShape = undefined;
    thySuffix = undefined;
    thyValueStyle = undefined;
}

@Component({
    selector: 'thy-demo-statistic-template',
    template: `
        <thy-statistic>
            <ng-template #value>value</ng-template>
            <ng-template #prefix>前缀</ng-template>
            <ng-template #suffix>后缀</ng-template>
            <ng-template #title>标题</ng-template>
        </thy-statistic>
    `
})
class ThyDemoStatisticTemplateComponent1 {}

@Component({
    selector: 'thy-demo-statistic-template2',
    template: `
        <thy-statistic
            [thyPrefixTemplate]="prefix"
            [thyValueTemplate]="value"
            [thySuffixTemplate]="suffix"
            [thyTitleTemplate]="title"
        >
        </thy-statistic>
        <ng-template #value>value</ng-template>
        <ng-template #prefix>前缀</ng-template>
        <ng-template #suffix>后缀</ng-template>
        <ng-template #title>标题</ng-template>
    `
})
class ThyDemoStatisticTemplateComponent2 {}

@NgModule({
    imports: [ThyStatisticModule],
    declarations: [
        ThyDemoStatisticBasicComponent,
        ThyDemoStatisticTemplateComponent1,
        ThyDemoStatisticTemplateComponent2
    ],
    exports: [ThyDemoStatisticBasicComponent, ThyDemoStatisticTemplateComponent1, ThyDemoStatisticTemplateComponent2]
})
export class StatisticTestModule {}
