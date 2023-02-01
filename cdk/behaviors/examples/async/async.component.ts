import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { useAsync } from '@tethys/cdk/behaviors';

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

    todosFetcher = useAsync(() => {
        return this.http.get<Todo[]>(`https://62f70d4273b79d015352b5e5.mockapi.io/items`);
    });

    todos: Todo[];

    constructor() {}

    ngOnInit(): void {
        this.fetchTodos();
    }

    refresh() {
        this.fetchTodos();
    }

    private fetchTodos() {
        this.todosFetcher.execute().subscribe(data => {
            this.todos = data;
        });
    }
}
