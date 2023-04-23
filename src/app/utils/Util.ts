import { formatDate } from '../constants/date';

class Util {
    static mapDateToLocaleString(date: Date): string {
        return (
            date.toLocaleDateString(formatDate.locale).split('/')[2] +
            '-' +
            date.toLocaleDateString(formatDate.locale).split('/')[1] +
            '-' +
            date.toLocaleDateString(formatDate.locale).split('/')[0] +
            'T' +
            date.toLocaleString(formatDate.locale).split(',')[1].slice(1, 6)
        );
    }

    static mapStringToDate(date: string): Date {
        // 27/02/2023-11:22
        const validDate =
            date.slice(6, 10) +
            date.slice(2, 6) +
            date.slice(0, 2) +
            date.slice(10, 16);
        return new Date(validDate);
    }

    static formatDate(date?: string): string {
        if (!date) return '';
        const validDate = this.mapStringToDate(date);
        return (
            validDate.toString().slice(3, 11) +
            validDate.toString().slice(15, 21)
        );
    }

    static randomId(length: number): number {
        return (
            Math.pow(10, length) + Math.random() * 9 * Math.pow(10, length - 1)
        );
    }
    /**
     * Returns the id which is the larger of a set of supplied id of data.
     * @param data Data object which exist id property inside the data.
     */
    static idGenerator(data: any[]): number {
        let id = 0;
        data.forEach((value: any) => {
            const absoluteValue = Math.abs(value.id);
            if (absoluteValue > id) {
                id = absoluteValue;
            }
        });
        return id + 1;
    }
}
export default Util;
