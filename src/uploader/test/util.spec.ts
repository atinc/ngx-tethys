import { MIME_Map } from '../constant';
import { mimeTypeConvert } from './../util';

describe(`uploader-util`, () => {
    describe('#mimeTypeConvert', () => {
        it('should get application/vnd.ms-excel,.xls for .xls', () => {
            const result = mimeTypeConvert('.xls');
            expect(result).toEqual(`application/vnd.ms-excel,.xls`);
        });

        it('should get application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xlsx for .xlsx', () => {
            const result = mimeTypeConvert('.xlsx');
            expect(result).toEqual(`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xlsx`);
        });

        it('should get application/json for .json', () => {
            const result = mimeTypeConvert('.json');
            expect(result).toEqual(`application/json`);
        });

        it('should get result for all types', () => {
            Object.keys(MIME_Map).forEach(key => {
                const result = mimeTypeConvert(key);
                expect(result).toEqual(MIME_Map[key]);
            });
        });

        it('should get result for multiple files', () => {
            const result = mimeTypeConvert(['.json', '.xls']);
            expect(result).toEqual(`application/json,application/vnd.ms-excel,.xls`);
        });

        it('should get origin value When the type does not match', () => {
            const result = mimeTypeConvert('application/json1,.json');
            expect(result).toEqual(`application/json1,application/json`);
        });

        it('should get empty when input is not Array<string> and string', () => {
            const result = mimeTypeConvert({} as string);
            expect(result).toEqual('');
        });
    });
});
