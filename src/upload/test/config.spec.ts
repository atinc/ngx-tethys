import { sizeExceedsHandler } from 'ngx-tethys/upload';

describe(`uploader-config`, () => {
    it('should console incorrect error message for sizeExceedsHandler', () => {
        const file1 = new File([''], 'file1.png');
        Object.defineProperty(file1, 'size', { value: 1024 * 1024 + 1 });

        const file2 = new File([], 'file2.txt');
        Object.defineProperty(file2, 'size', { value: 1024 * 1024 + 2 });

        const errorSpy = spyOn(console, 'error');
        expect(errorSpy).not.toHaveBeenCalled();
        sizeExceedsHandler({
            files: [file1, file2],
            exceedsFiles: [file1, file2],
            nativeEvent: null,
            sizeThreshold: 200
        });
        expect(errorSpy).toHaveBeenCalled();
        expect(errorSpy).toHaveBeenCalledWith(
            `some files(file: ${file1.name}, size: ${file1.size},file: ${file2.name}, size: ${file2.size}) size exceeds threshold 200`
        );
    });
});
