import { ITable } from './ITable';
import IUser from './IUser';

export default interface IReservation {
    id?: number;
    user_id: IUser;
    date: string;
    table_id: ITable;
    is_active: boolean;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    comment?: string
    people_count:number;
}
