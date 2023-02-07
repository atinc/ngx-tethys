import { Observable } from 'rxjs';

export type ExtractObservableValue<T> = T extends Observable<infer V> ? V : T;
