import { ThyTranslate } from '../../../src/shared';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable()
export class DemoThyTranslate extends ThyTranslate {

    constructor(private translate: TranslateService) {
        super();
    }

    instant(key: string | Array<string>, interpolateParams?: Object): string | any {
        return this.translate.instant(key, interpolateParams);
    }

    get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
        return this.translate.get(key, interpolateParams);
    }
}
