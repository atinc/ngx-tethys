import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyVote } from 'ngx-tethys/vote';
import { provideHttpClient } from '@angular/common/http';

describe('ThyVote', () => {
    let fixture!: ComponentFixture<ThyDemoVoteBasicComponent>;
    let basicTestComponent!: ThyDemoVoteBasicComponent;
    let voteComponent!: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoVoteBasicComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        voteComponent = fixture.debugElement.query(By.directive(ThyVote));
    });

    it('should have correct class', () => {
        fixture.detectChanges();
        expect(voteComponent.nativeElement.classList.contains('thy-vote')).toBe(true);
        expect(voteComponent.nativeElement.classList.contains('thy-vote-primary')).toBe(true);
        expect(voteComponent.nativeElement.classList.contains('thy-vote-horizontal')).toBe(true);
        expect(voteComponent.nativeElement.classList.contains('thy-vote-round')).toBe(true);
        expect(voteComponent.nativeElement.classList.contains('thy-vote-horizontal-size-default')).toBe(true);
    });

    it('should have thy-vote-success when thyVote is success', () => {
        basicTestComponent.thyVote = 'success';
        fixture.detectChanges();
        expect(voteComponent.nativeElement.classList.contains('thy-vote-success')).toBe(true);
    });

    it('should have thy-vote-success when thyVote is success-weak', () => {
        basicTestComponent.thyVote = 'success-weak';
        fixture.detectChanges();
        expect(voteComponent.nativeElement.classList.contains('thy-vote-success-weak')).toBe(true);
    });

    it('should have thy-vote-vertical and hy-vote-vertical-size-sm when thyLayout is vertical', () => {
        basicTestComponent.layout = `vertical`;
        fixture.detectChanges();
        expect(voteComponent.nativeElement.classList.contains('thy-vote')).toBe(true);
        expect(voteComponent.nativeElement.classList.contains('thy-vote-vertical')).toBe(true);
        expect(voteComponent.nativeElement.classList.contains('thy-vote-vertical-size-default')).toBe(true);
        expect(voteComponent.nativeElement.classList.contains('thy-vote-horizontal')).toBe(false);
    });

    it('should have thy-vote-vertical and thy-vote-vertical-size-sm when thySize is md', () => {
        basicTestComponent.layout = `vertical`;
        basicTestComponent.size = `sm`;
        fixture.detectChanges();
        expect(voteComponent.nativeElement.classList.contains('thy-vote')).toBe(true);
        expect(voteComponent.nativeElement.classList.contains('thy-vote-vertical')).toBe(true);
        expect(voteComponent.nativeElement.classList.contains('thy-vote-vertical-size-sm')).toBe(true);
        expect(voteComponent.nativeElement.classList.contains('thy-vote-horizontal')).toBe(false);
    });

    it('should have thy-vote-disabled when thyDisabled is true', () => {
        fixture.detectChanges();
        expect(voteComponent.nativeElement.classList.contains('thy-vote-disabled')).toBe(false);

        basicTestComponent.isDisabled = true;
        fixture.detectChanges();
        expect(voteComponent.nativeElement.classList.contains('thy-vote-disabled')).toBe(true);
    });
});

@Component({
    selector: 'thy-demo-label-basic',
    template: `
        <div
            [thyVote]="thyVote"
            [thyVoteCount]="vote_count"
            [thyHasVoted]="has_voted"
            [thyLayout]="layout"
            [thySize]="size"
            [thyRound]="isRound"
            [thyDisabled]="isDisabled"></div>
    `,
    imports: [ThyVote]
})
class ThyDemoVoteBasicComponent {
    vote_count = '10';
    hasVoted = true;
    thyVote = '';
    layout = '';
    size = '';
    isRound = true;
    isDisabled = false;
}
