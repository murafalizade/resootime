import fetch from './interceptor';

export default class UserService {
    static async getUsers(): Promise<any[]> {
        return await fetch.get('/api/user');
    }

    static async getUser(id: number): Promise<any> {
        return await fetch.get(`/api/user/${id}`);
    }

    static async getUserByToken(token: string): Promise<any> {
        return await fetch.get(`/api/users/${token}`, {
            headers: {
                'public-request': true,
            },
        });
    }

    static async login(data: any): Promise<any> {
        return await fetch.post('/api/login/', data, {
            headers: {
                'public-request': true,
            },
        });
    }

    static async register(data: any): Promise<any> {
        return await fetch.post('/api/register/', data, {
            headers: {
                'public-request': true,
            },
        });
    }

    static async myReservations(id: number): Promise<any[]> {
        return await fetch.get(`/api/users/${id}/my-reservations/`);
    }
}
