import { Injectable } from '@angular/core';

@Injectable()
export class ComponentExample {
    anchor?: string;
    title?: string;
    description?: string;
    component?: string;
    html?: string;
    css?: string;
    outlet?: any; // ToDo: Component<T>
}
