// import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
// import { ThyStatisticModule } from '../statistic.module';
// import { NgModule, Component } from '@angular/core';
// import { By } from '@angular/platform-browser';
// import { ThyStatisticComponent } from '../statistic.component';

// describe('ThyStatistic', () => {
//     let fixture: ComponentFixture<ThyDemoStatisticBasicComponent>;
//     let basicTestComponent: ThyDemoStatisticBasicComponent;
//     let statisticComponent;

//     beforeEach(fakeAsync(() => {
//         TestBed.configureTestingModule({
//             imports: [ThyStatisticModule, StatisticTestModule],
//             providers: [
//                 // { provide: Location, useClass: SpyLocation }
//             ]
//         });

//         TestBed.compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ThyDemoStatisticBasicComponent);
//         basicTestComponent = fixture.debugElement.componentInstance;
//         statisticComponent = fixture.debugElement.query(By.directive(ThyStatisticComponent));
//     });

//     it('should have correct class', () => {
//         fixture.detectChanges();
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic')).toBe(true);
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-primary')).toBe(true);
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-horizontal')).toBe(true);
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-round')).toBe(true);
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-horizontal-size-default')).toBe(true);
//     });

//     it('should have thy-statistic-success when thyStatistic is success', () => {
//         basicTestComponent.thyStatistic = 'success';
//         fixture.detectChanges();
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-success')).toBe(true);
//     });

//     it('should have thy-statistic-success when thyStatistic is success-weak', () => {
//         basicTestComponent.thyStatistic = 'success-weak';
//         fixture.detectChanges();
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-success-weak')).toBe(true);
//     });

//     it('should have thy-statistic-vertical and hy-statistic-vertical-size-sm when thyLayout is vertical', () => {
//         basicTestComponent.layout = `vertical`;
//         fixture.detectChanges();
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic')).toBe(true);
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-vertical')).toBe(true);
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-vertical-size-default')).toBe(true);
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-horizontal')).toBe(false);
//     });

//     it('should have thy-statistic-vertical and thy-statistic-vertical-size-sm when thySize is md', () => {
//         basicTestComponent.layout = `vertical`;
//         basicTestComponent.size = `sm`;
//         fixture.detectChanges();
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic')).toBe(true);
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-vertical')).toBe(true);
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-vertical-size-sm')).toBe(true);
//         expect(statisticComponent.nativeElement.classList.contains('thy-statistic-horizontal')).toBe(false);
//     });
// });

// @Component({
//     selector: 'thy-demo-label-basic',
//     template: `
//         <div
//             [thyStatistic]="thyStatistic"
//             [thyStatisticCount]="statistic_count"
//             [thyHasStatisticd]="has_statisticd"
//             [thyLayout]="layout"
//             [thySize]="size"
//             [thyRound]="isRound"
//         ></div>
//     `
// })
// class ThyDemoStatisticBasicComponent {
//     statistic_count = '10';
//     hasStatisticd = true;
//     thyStatistic = '';
//     layout = '';
//     size = '';
//     isRound = true;
// }

// @NgModule({
//     imports: [ThyStatisticModule],
//     declarations: [ThyDemoStatisticBasicComponent],
//     exports: [ThyDemoStatisticBasicComponent]
// })
// export class StatisticTestModule {}
