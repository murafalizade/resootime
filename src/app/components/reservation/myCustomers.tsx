import RestaurantService from '@/app/api/services/restaurantService';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import IReservation from '@/app/types/IReservartion';
import Util from '@/app/utils/Util';
import withErrorHandeler from '@/app/hof/withErrorHandler';

const MyCustomers = ({ reserv }: { reserv: IReservation[] }) => {
    const cancelReservation = async (id?: number) => {
        if (!id) return;
        await withErrorHandeler(async (args: any) => {
            await RestaurantService.cancelReservation(args);
        }, 'Reservasiya uğurla ləğv edildi!')(id);
    };

    return (
        <div
            style={{ minHeight: '89vh', width: '100%' }}
            className="mx-1 bg-light p-3 overflow-scroll rounded-3">
            <table className="table table-hover">
                <thead className="text-center">
                    <tr className="text-muted muted">
                        <th scope="col">Müştəri</th>
                        <th scope="col">Email</th>
                        <th scope="col">Əlaqə nömrəsi</th>
                        <th scope="col">Tarix</th>
                        <th scope="col">Ziyarətçi sayı</th>
                        <th scope="col">Masa</th>
                        <th scope="col">Vəziyyət</th>

                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    {reserv?.map((r: IReservation) => (
                        <tr key={r.id}>
                            <td>
                                {r.user_id
                                    ? `${r.user_id.first_name} ${r.user_id.last_name}`
                                    : `${r.first_name} ${r.last_name}`}
                            </td>
                            <td>{r.user_id?.email || r.email}</td>
                            <td>{r.user_id?.phone_number || r.phone_number}</td>
                            <td>{Util.formatDate(r.date)}</td>
                            <td>{r.table_id.count}</td>
                            <td>{r.table_id.name}</td>
                            <td>{r.is_active ? 'Aktiv' : 'Passiv'}</td>
                            <td>
                                <button
                                    disabled={!r.is_active}
                                    onClick={() => cancelReservation(r.id)}
                                    className="btn btn-outline-primary">
                                    Ləğv et
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyCustomers;
