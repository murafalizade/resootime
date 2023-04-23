import { decode, encode } from 'js-base64';

class Cryption {
    static encrypt(data: string) {
        return encode(data);
    }

    static decrypt(data: string) {
        return decode(data);
    }
}

export default Cryption;
