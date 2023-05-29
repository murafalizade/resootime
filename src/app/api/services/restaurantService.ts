import { IRestaurant } from '@/app/types/IRestaurant';
import fetch from './interceptor';

export default class RestaurantService {
    static async getRestaurants(page?: string | number): Promise<any> {
        return await fetch.get(`/api/restaurant/?page=${page ? page : 1}`, {
            headers: {
                'public-request': true,
            },
        });
    }

    static async getRestaurant(id: number): Promise<IRestaurant>;
    static async getRestaurant(id: string): Promise<IRestaurant>;
    static async getRestaurant(id: any): Promise<IRestaurant> {
        return await fetch.get(`/api/restaurant/${id}/`, {
            headers: {
                'public-request': true,
            },
        });
    }

    static async getRestaurantByToken(token: string): Promise<IRestaurant> {
        return await fetch.get(`/api/restaurant/token/${token}`, {
            headers: {
                'public-request': true,
            },
        });
    }

    static async createTable(
        data: any,
        id: number,
        token?: string,
    ): Promise<any> {
        return await fetch.post(`/api/restaurant/${id}/create-table/`, data, {
            headers: {
                'permanent-token': token,
            },
        });
    }

    static async getTables(id: number): Promise<any> {
        const map: any[] = await fetch.get(`/api/restaurant/${id}/map`, {
            headers: {
                'public-request': true,
            },
        });
        return map[0];
    }

    static async makeReservation(data: any, id: number): Promise<any> {
        return await fetch.post(
            `/api/restaurant/${id}/make-reservation/`,
            data,
            {
                headers: {
                    'public-request': true,
                },
            },
        );
    }

    static async getReservationByRestraunt(id: number): Promise<any> {
        return await fetch.get(`/api/restaurant/${id}/reservations/`, {
            headers: {
                'public-request': true,
            },
        });
    }

    static async getReservationByDate(id: number, date?: string): Promise<any> {
        if (!date) {
            return await this.getReservationByRestraunt(id);
        }
        return await fetch.get(
            `/api/restaurant/${id}/reservations/?date=${date}`,
            {
                headers: {
                    'public-request': true,
                },
            },
        );
    }

    static async getAvailableTables(
        id: number,
        query: string,
        count: number,
    ): Promise<any> {
        const map = await this.getTables(id);
        const tables = map?.table;
        const reservations = await this.getReservationByDate(id, query);
        const filteredTable = tables?.map((x: any) =>
            reservations.find((e: any) => e.table_id.id === x.id) ||
            x.count < count
                ? { ...x, is_full: true }
                : { ...x, is_full: false },
        );
        return filteredTable;
    }

    static async getAvaibleTablesWithReserv(
        id: number,
        query: string,
    ): Promise<any> {
        const map = await this.getTables(id);
        const tables = map?.table;
        const reservations = await this.getReservationByDate(id, query);
        const filteredTable = tables?.map((x: any) =>
            reservations.find((e: any) => e.table_id.id == x.id)
                ? reservations.find((e: any) => e.table_id.id == x.id)
                : { table_id: { ...x, is_full: false } },
        );
        return filteredTable;
    }

    static async cancelReservation(id: string | number): Promise<any> {
        return await fetch.patch(`/api/cancel/${id}/`, {
            headers: {
                'public-request': 'true',
            },
        });
    }

    static async createMap(
        data: any,
        id: number,
        token?: string,
    ): Promise<any> {
        return await fetch.post(`/api/restaurant/${id}/create-map/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'permanent-token': token,
            },
        });
    }

    static async updateMap(
        data: any,
        id: number,
        token?: string,
    ): Promise<any> {
        return await fetch.put(`/api/restaurant/${id}/update-map/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'permanent-token': token,
            },
        });
    }

    static async updateTable(
        data: any,
        id: number,
        token?: string,
    ): Promise<any> {
        return await fetch.patch(
            `/api/restaurant/${id}/update-table/${data.id}/`,
            data,
            {
                headers: {
                    'permanent-token': token,
                },
            },
        );
    }

    static async deleteTable(
        id: number,
        tableId: number,
        token?: string,
    ): Promise<any> {
        return await fetch.delete(
            `/api/restaurant/${id}/delete-table/${tableId}/`,
            {
                headers: {
                    'permanent-token': token,
                },
            },
        );
    }

    static async addImage(data: any, id: number, token?: string): Promise<any> {
        return await fetch.post(`/api/restaurant/${id}/create-image/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static async deleteImage(id: number, token?: string): Promise<any> {
        return await fetch.delete(`/api/restaurant/${id}/delete-images/`, {
            headers: {
                'permanent-token': token,
            },
        });
    }

    static async updateRestaurant(
        data: any,
        id: number,
        token?: string,
    ): Promise<any> {
        return await fetch.put(`/api/complete-registration/${id}/`, data, {
            headers: {
                'permanent-token': token,
            },
        });
    }
}
