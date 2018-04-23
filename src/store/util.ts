import { StoreMetaInfo, META_KEY } from './types';

export function findAndCreateStoreMetadata(target): StoreMetaInfo {
    if (!target.hasOwnProperty(META_KEY)) {
        const defaultMetadata: StoreMetaInfo = {
            actions: {},
            path: null,
            children: [],
            instance: null
        };
        target[META_KEY] = defaultMetadata;
    }
    return target[META_KEY];
}
