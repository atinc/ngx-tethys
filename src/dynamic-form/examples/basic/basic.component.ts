import { Component, OnInit } from '@angular/core';

import { QuestionService } from 'ngx-tethys/dynamic-form/question.service';
import { QuestionBase } from 'ngx-tethys/dynamic-form/question-base';
import { Observable } from 'rxjs';

@Component({
    selector: 'thy-watermark-basic-example',
    templateUrl: './basic.component.html',
    providers: [QuestionService]
})
export class ThyDynamicFormBasicExampleComponent implements OnInit {
    questions$: Observable<QuestionBase<any>[]>;

    constructor(service: QuestionService) {
        this.questions$ = service.getQuestions();
    }
    ngOnInit() {}
}
