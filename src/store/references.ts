import { ArrayInferExtract } from '../util/helpers';

export type ReferencesIdDictionary<TReferences> = {
    [key in keyof TReferences]?: { [key: string]: ArrayInferExtract<TReferences[key]> }
};

export type OnCombineRefsFn<TEntity, TReferences> = (
    entity: TEntity,
    referencesIdMap: ReferencesIdDictionary<TReferences>,
    references?: TReferences
) => void;

export interface OnCombineRefs<TEntity, TReferences> {
    onCombineRefs(
        entity: TEntity,
        referencesIdMap: ReferencesIdDictionary<TReferences>,
        references?: TReferences
    ): void;
}
