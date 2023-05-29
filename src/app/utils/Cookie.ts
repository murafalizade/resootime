import { parseCookies } from 'nookies';
import Cryption from './Cryption';

class Cookie {
    static set(key: string, value: string, expDate: string, domain?: string) {
        const encryptedKey = Cryption.encrypt(key);
        const encryptedValue = Cryption.encrypt(value);
        document.cookie = `${encryptedKey}=${encryptedValue};expires=${expDate};`;
        document.cookie = `${encryptedKey}=${encryptedValue};expires=${expDate};path=/;domain=.resootime.com;`;
    }

    static get(key: string) {
        const name = Cryption.encrypt(key) + '=';
        const cDecoded = decodeURIComponent(document.cookie);
        const cArr = cDecoded.split('; ');
        let res = null;

        cArr.forEach((val) => {
            if (val.indexOf(name) === 0) {
                res = Cryption.decrypt(val.substring(name.length));
            }
        });

        return res;
    }

    static getFromSSR(req: any, key: string) {
        const cookies = parseCookies({ req });
        const cryptedName = Cryption.encrypt(key).slice(0, 7);
        const encryptedValue = cookies[cryptedName];
        return Cryption.decrypt(encryptedValue);
    }

    static delete(key: string) {
        this.set(key, '', '');
    }
}

export default Cookie;
