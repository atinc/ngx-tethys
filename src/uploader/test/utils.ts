export function createFile(fileName = 'testFile.txt') {
    const fileContent =
        'Were converting our compatibility data into a machine-readable JSON format. This compatibility table still uses the old format, because we have not yet converted the data it contains. Find out how you can help!';
    const file = new File([fileContent], fileName);
    Object.defineProperty(file, 'type', {
        get: () => {
            return 'text/plain';
        }
    });

    return file;
}
