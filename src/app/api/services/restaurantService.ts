import { IRestaurant } from "@/app/types/IRestaurant";
import fetch from "./interceptor";

export default class RestaurantService {
  static async getRestaurants(page?: string | number): Promise<any> {
    return await fetch.get(`/api/restaurant/?page=${page ? page : 1}`);
  }

  static async getRestaurant(id: number): Promise<IRestaurant>;
  static async getRestaurant(id: string): Promise<IRestaurant>;

  static async getRestaurant(token: any): Promise<IRestaurant> {
    return await fetch.get(`/api/restaurant/${token}`);
  }

  static async createTable(data: any, id: number): Promise<any> {
    return await fetch.post(`/api/restaurant/${id}/create-table/`, data);
  }

  static async getTables(id: number): Promise<any> {
    const map: any[] = await fetch.get(`/api/restaurant/${id}/map`);
    return map[0];
  }

  static async makeReservation(data: any, id: number): Promise<any> {
    return await fetch.post(`/api/restaurant/${id}/make-reservation/`, data);
  }

  static async getReservationByRestraunt(id: number): Promise<any> {
    return await fetch.get(`/api/restaurant/${id}/reservations/`);
  }

  static async getReservationByDate(id: number, date?: string): Promise<any> {
    if (!date) {
      return await this.getReservationByRestraunt(id);
    }
    return await fetch.get(`/api/restaurant/${id}/reservations/?date=${date}`);
  }

  static async getAvailableTables(
    id: number,
    query: string,
    count: number
  ): Promise<any> {
    const map = await this.getTables(id);
    const tables = map?.table;
    const reservations = await this.getReservationByDate(id, query);
    const filteredTable = tables?.map((x: any) =>
      reservations.find((e: any) => e.table_id.id === x.id) || x.count < count
        ? { ...x, is_full: true }
        : { ...x, is_full: false }
    );
    return filteredTable;
  }

  static async getAvaibleTablesWithReserv(
    id: number,
    query: string
  ): Promise<any> {
    const map = await this.getTables(id);
    const tables = map?.table;
    const reservations = await this.getReservationByDate(id, query);
    const filteredTable = tables?.map((x: any) =>
      reservations.find((e: any) => e.table_id.id == x.id)
        ? reservations.find((e: any) => e.table_id.id == x.id)
        : { table_id: { ...x, is_full: false } }
    );
    return filteredTable;
  }

  static async cancelReservation(id: string | number): Promise<any> {
    return await fetch.patch(`/api/cancel/${id}/`);
  }

  static async createMap(data: any, id: number): Promise<any> {
    return await fetch.post(`/api/restaurant/${id}/create-map/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async updateMap(data: any, id: number): Promise<any> {
    return await fetch.put(`/api/restaurant/${id}/update-map/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async updateTable(data: any, id: number): Promise<any> {
    return await fetch.patch(
      `/api/restaurant/${id}/update-table/${data.id}/`,
      data
    );
  }

  static async deleteTable(id: number, tableId: number): Promise<any> {
    return await fetch.delete(`/api/restaurant/${id}/delete-table/${tableId}/`);
  }

  static async addImage(data: any, id: number): Promise<any> {
    return await fetch.post(`/api/restaurant/${id}/create-image/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async updateRestaurant(data: any, id: number): Promise<any> {
    return await fetch.put(`/api/complete-registration/${id}/`, data);
  }
}
