import { TethysVersionChanges } from '../core/target-version';

interface SymbolRemovalUpgradeData {
    /** Module that the symbol was removed from. */
    module: string;

    /** Name of the symbol being removed. */
    name: string;

    /** Message to log explaining why the symbol was removed. */
    message: string;
}

export const symbolRemoval: TethysVersionChanges<SymbolRemovalUpgradeData> = {};
