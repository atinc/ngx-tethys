import { ThyCommentComponent, ThyCommentModule } from 'ngx-tethys/comment';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyCommentNestExampleComponent } from './../examples/nest/nest.component';
import { ThyCommentBasicExampleComponent } from './../examples/basic/basic.component';

describe('thyCommentComponent', () => {
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyCommentModule],
                declarations: [ThyCommentBasicExampleComponent, ThyCommentNestExampleComponent]
            }).compileComponents();
        })
    );

    describe('basic', () => {
        it('it should basic work', () => {
            const fixture = TestBed.createComponent(ThyCommentBasicExampleComponent);
            const comment = fixture.debugElement.query(By.directive(ThyCommentComponent));

            fixture.detectChanges();
            expect(comment.nativeElement.classList).toContain('thy-comment');
            expect(comment.nativeElement.querySelector('.thy-comment-inner')).toBeTruthy();
            expect(comment.nativeElement.querySelector('.thy-comment-nested')).toBeTruthy();
            expect(comment.nativeElement.querySelector('.thy-comment-avatar')).toBeTruthy();
            expect(comment.nativeElement.querySelector('.thy-comment-body')).toBeTruthy();
            expect(comment.nativeElement.querySelector('.thy-comment-body-author')).toBeTruthy();
            expect(comment.nativeElement.querySelector('.thy-comment-content')).toBeTruthy();
            expect(comment.nativeElement.querySelector('.thy-comment-actions')).toBeTruthy();
            expect(comment.nativeElement.querySelector('.thy-comment-body-author-name')).toBeTruthy();
            expect(comment.nativeElement.querySelector('.thy-comment-body-author-time')).toBeTruthy();
            expect(comment.nativeElement.querySelector('.thy-comment-body-author-name').innerText).toBe('章三');
            expect(comment.nativeElement.querySelector('.thy-comment-body-author-time').innerText).toBe('2022-10-18 17:01:06');
        });

        it('should nested work', () => {
            const fixture = TestBed.createComponent(ThyCommentNestExampleComponent);
            fixture.detectChanges();

            const rootComment = fixture.debugElement.query(By.directive(ThyCommentComponent));
            expect(rootComment.nativeElement).toBeTruthy();

            const levelTwoComment = rootComment.query(By.directive(ThyCommentComponent));
            expect(levelTwoComment.nativeElement).toBeTruthy();

            const levelThreeComments = levelTwoComment.queryAll(By.directive(ThyCommentComponent));
            expect(levelThreeComments.length).toBe(2);
        });
    });
});
