import { SafeAny } from 'ngx-tethys/types';

/* eslint-disable prettier/prettier */
type GetIndexedField<T, K> = K extends keyof T
    ? T[K]
    : K extends `${number}`
      ? '0' extends keyof T
          ? undefined
          : number extends keyof T
            ? T[number]
            : undefined
      : undefined;
type FieldWithPossiblyUndefined<T, Key> = GetFieldType<Exclude<T, undefined>, Key> | Extract<T, undefined>;
type IndexedFieldWithPossiblyUndefined<T, Key> = GetIndexedField<Exclude<T, undefined>, Key> | Extract<T, undefined>;
export type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
    ? Left extends keyof T
        ? FieldWithPossiblyUndefined<T[Left], Right>
        : Left extends `${infer FieldKey}[${infer IndexKey}]`
          ? FieldKey extends keyof T
              ? FieldWithPossiblyUndefined<IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>, Right>
              : undefined
          : undefined
    : P extends keyof T
      ? T[P]
      : P extends `${infer FieldKey}[${infer IndexKey}]`
        ? FieldKey extends keyof T
            ? IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>
            : undefined
        : undefined;

export class ObjectProducer<TEntity> {
    entity: TEntity;

    constructor(entity: TEntity) {
        this.entity = entity;
    }

    get<TPath extends string>(propPath: TPath): GetFieldType<TEntity, TPath> {
        return propPath.split('.').reduce((previousValue: any, part: string) => previousValue && previousValue[part], this.entity);
    }

    set<TPath extends string>(propPath: TPath, value: GetFieldType<TEntity, TPath>) {
        const newEntity = { ...this.entity };

        const split = propPath.split('.');
        const lastIndex = split.length - 1;

        split.reduce((previousValue: SafeAny, part, index) => {
            if (index === lastIndex) {
                previousValue[part] = value;
            } else {
                previousValue[part] = Array.isArray(previousValue[part]) ? previousValue[part].slice() : { ...previousValue[part] };
            }

            return previousValue && previousValue[part];
        }, newEntity);

        this.entity = newEntity;
        return newEntity;
    }
}
