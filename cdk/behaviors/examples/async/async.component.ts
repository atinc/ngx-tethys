import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { setDefaultErrorHandler, useAsync } from '@tethys/cdk/behaviors';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

interface Todo {
    id: number;
    title: string;
}

@Component({
    selector: 'thy-behaviors-async',
    templateUrl: './async.component.html',
    styleUrls: ['./async.component.scss']
})
export class ThyBehaviorsAsyncComponent implements OnInit {
    http = inject(HttpClient);

    todosFetcher = useAsync((name: string) => {
        return this.http.get<Todo[]>(`https://62f70d4273b79d015352b5e5.mockapi.io/items`);
    });

    todosFetcherWithError = useAsync(() => {
        return of([]).pipe(
            delay(1000),
            tap(() => {
                throw new Error(`Http Request fail`);
            })
        );
    });

    todos: Todo[];

    constructor(private notifyService: ThyNotifyService) {
        setDefaultErrorHandler(error => {
            this.notifyService.error(error.message);
        });
    }

    ngOnInit(): void {
        this.fetchTodos();
    }

    refresh() {
        this.fetchTodos();
    }

    refreshWithError() {
        this.todosFetcherWithError.execute({
            success: data => {
                this.todos = data;
            }
            // 自定义错误提示，默认使用 defaultErrorHandler
            // error: error => {
            //     this.notifyService.error('refreshWithError' + error.message);
            // }
        });
    }

    private fetchTodos() {
        this.todosFetcher('name').execute(data => {
            this.todos = data;
        });
    }
}
