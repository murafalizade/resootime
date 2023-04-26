import RestaurantService from '@/app/api/services/restaurantService';
import {
    filterTables,
    makeLoading,
    selectChoosenTable,
    selectFilteredTables,
    selectIsLoading,
} from '@/app/redux/commonSlice';
import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../layout/loading';
import Table from '../restaurant/table';
import AdminModal from './adminModal';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useRouter } from 'next/router';
import Image from 'next/dist/client/image';
import styles from '@/app/styles/createMapTool.module.scss';
import { formatDate } from '@/app/constants/date';

const ReservationMap = ({ restId }: any) => {
    const filterTable = useSelector(selectFilteredTables);
    const selectedTable = useSelector(selectChoosenTable);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();
    const router = useRouter();
    const [wall, setWall] = React.useState<string>('');

    let { date } = router.query;
    // fetch table with date
    const getReservs = async (date: string) => {
        const filterTable = await RestaurantService.getAvaibleTablesWithReserv(
            restId,
            date,
        );
        const map = await RestaurantService.getTables(restId);
        setWall(map?.wall);
        dispatch(filterTables(filterTable));
    };

    useEffect(() => {
        if (!date || typeof date == 'object') {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            date = new Date().toLocaleDateString(formatDate.locale);
        }
        getReservs(date);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query]);

    return (
        <div
            style={{
                backgroundColor: '#1a2236',
                width: '100%',
                minHeight: '100vh',
            }}>
            <AdminModal
                date={date}
                restId={restId}
                selectedTable={selectedTable}
            />
            {isLoading ? <Loading /> : null}
            <div className="position-relative">
                <TransformWrapper
                    initialScale={0.75}
                    minScale={0.5}
                    maxScale={2}
                    limitToBounds={false}>
                    <TransformComponent
                        wrapperStyle={{
                            height: '89.1vh',
                            width: '91vw',
                        }}>
                        {wall ? (
                            <Image
                                className={styles.image}
                                src={wall}
                                objectFit="contain"
                                alt="map"
                                fill
                            />
                        ) : null}
                        {filterTable?.map((table: any, index: number) => (
                            <Table
                                userName={
                                    table.user_id
                                        ? `${table.user_id.first_name} ${table.user_id.last_name}`
                                        : `${table.first_name ?? ''} ${
                                              table.last_name ?? ''
                                          }`
                                }
                                date={table?.date}
                                key={index}
                                table={table.table_id}
                            />
                        ))}
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </div>
    );
};

export default ReservationMap;
