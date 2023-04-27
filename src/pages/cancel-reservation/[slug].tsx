import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import Router, { useRouter } from 'next/router';
import RestaurantService from '@/app/api/services/restaurantService';
import withErrorHandeler from '@/app/hof/withErrorHandler';

const CancelReservation = () => {
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        Swal.fire({
            title: 'Rezervasınızı ləğv etmək istədiyinizə əminsiniz?',
            showCancelButton: true,
            confirmButtonText: 'Bəli',
            cancelButtonText: 'Xeyr',
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (slug && typeof slug === 'string') {
                    await withErrorHandeler(
                        async (args: any) => {
                            await RestaurantService.cancelReservation(args);
                        },
                        '/',
                        'Reservasiya uğurla ləğv edildi!',
                    )(slug);
                }
            } else {
                Router.push('/');
            }
        });
    }, [slug]);

    return <div></div>;
};

export default CancelReservation;
