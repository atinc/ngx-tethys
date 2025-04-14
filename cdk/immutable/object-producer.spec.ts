import { produce } from '@tethys/cdk';

type Address = {
    postCode: string;
    street: [string, string | undefined];
};
type UserInfo = {
    name: string;
    address: Address;
    previousAddress?: Address;
};
const data: UserInfo = {
    name: 'peter',
    address: {
        postCode: '1000000',
        street: ['Beijing', 'Hai Dian']
    },
    previousAddress: {
        postCode: '238391',
        street: ['An Hui', 'He Fei']
    }
};

describe('object-producer', () => {
    it('should get one-level property "name"', () => {
        const result = produce(data).get('name');
        expect(result).toBe('peter');
    });

    it('should get nested property "address.street"', () => {
        const result = produce(data).get('address.street');
        expect(result).toEqual(data.address.street);
    });

    it('should set one-level property "name"', () => {
        const result = produce(data).set('name', 'lily');
        expect(result.name).toBe('lily');
        expect(result).not.toBe(data);
        expect(data.name).toBe('peter');
    });

    it('should set nested property "address.street"', () => {
        const result = produce(data).set('address.street', ['Shan Xi', 'Xi An']);
        expect(result.address.street).toEqual(['Shan Xi', 'Xi An']);
        expect(result).not.toBe(data);
        expect(data.address.street).toEqual(['Beijing', 'Hai Dian']);
    });
});
