import { Component, inject, OnInit } from '@angular/core';
import { setDefaultErrorHandler, actionBehavior } from '@tethys/cdk/behaviors';
import { of, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ThyNotifyService } from 'ngx-tethys/notify';

@Component({
    selector: 'thy-behaviors-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss'],
    standalone: false
})
export class ThyBehaviorsActionComponent implements OnInit {
    addBehavior = actionBehavior((obj: { name: string }) => {
        // 调用 API 添加/修改/删除数据
        const result = of(obj).pipe(delay(1000));
        return result;
    });

    addBehaviorWithError = actionBehavior(() => {
        // 调用 API 添加/修改/删除数据
        return of(true).pipe(
            delay(1000),
            tap(() => {
                throw new Error(`Mock Error!`);
            })
        ) as Observable<boolean>;
    });

    notifyService = inject(ThyNotifyService);

    constructor() {
        // 全局设置错误提示，这样就不用每次调用的时候传递
        setDefaultErrorHandler(error => {
            this.notifyService.error(error.message);
        });
    }

    ngOnInit(): void {}

    add() {
        this.addBehavior({ name: 'Pet' }).execute(data => {
            this.notifyService.success(`Add ${data.name} successfully!`);
        });
    }

    addWithError() {
        this.addBehaviorWithError.execute();
    }
}
