import { Component, inject, OnInit } from '@angular/core';
import { useAction } from '@tethys/cdk/behaviors';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ThyNotifyService } from 'ngx-tethys/notify';

@Component({
    selector: 'thy-behaviors-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ThyBehaviorsActionComponent implements OnInit {
    addAction = useAction<{ name: string }>((obj: { name: string }) => {
        // 调用 API 添加/修改/删除数据
        return of(obj).pipe(delay(1000));
    });

    addActionWithError = useAction(() => {
        // 调用 API 添加/修改/删除数据
        return of(true).pipe(
            delay(1000),
            tap(() => {
                throw new Error(`Mock Error!`);
            })
        );
    });

    notifyService = inject(ThyNotifyService);

    constructor() {}

    ngOnInit(): void {}

    add() {
        this.addAction
            .success(result => {
                this.notifyService.success(`Add ${result.name} successfully!`);
            })
            .execute({ name: 'Pet' });
    }

    addWithError() {
        this.addActionWithError
            .error(error => {
                this.notifyService.error(error.message);
            })
            .execute();
    }
}
