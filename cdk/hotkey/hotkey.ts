const modifierKeyNames: string[] = [`Control`, 'Alt', 'Meta', 'Shift'];

// We don't want to show `Shift` when `event.key` is capital
function showShift(event: KeyboardEvent): boolean {
    const { shiftKey, code, key } = event;
    return shiftKey && !(code.startsWith('Key') && key.toUpperCase() === key);
}

export function hotkey(event: KeyboardEvent): string {
    const { ctrlKey, altKey, metaKey, key } = event;
    const hotkeyString: string[] = [];
    const modifiers: boolean[] = [ctrlKey, altKey, metaKey, showShift(event)];
    for (const [i, mod] of modifiers.entries()) {
        if (mod) hotkeyString.push(modifierKeyNames[i]);
    }

    if (!modifierKeyNames.includes(key)) {
        hotkeyString.push(key);
    }

    return hotkeyString.join('+');
}

export function isHotkey(event: KeyboardEvent, key: string) {
    return key.toUpperCase() === hotkey(event).toUpperCase();
}
