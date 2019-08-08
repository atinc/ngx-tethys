import { Injectable } from '@angular/core';

@Injectable()
export class ThyDragDropService {
    public item: any;
    public previousIndex: number;
    public previousContainer: any;
    constructor() {}
}
