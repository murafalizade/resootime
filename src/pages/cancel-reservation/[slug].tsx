import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import Router, { useRouter } from 'next/router';
import RestaurantService from '@/app/api/services/restaurantService';
import withErrorHandeler from '@/app/hof/withErrorHandler';
import Cookie from '@/app/utils/Cookie';

const CancelReservation = () => {
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        // Make sure that reservation is not already cancelled
        if (Cookie.get('reservation') === slug) {
            Swal.fire({
                title: 'Rezervasiyanız uğurla ləğv edilmişdir!',
                showCancelButton: false,
                confirmButtonText: 'Bəli',
            })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        Router.push('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    Router.push('/');
                });
        }

        // Show confirmation dialog
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
                            await RestaurantService.cancelReservation(
                                { resturant_id: '' },
                                args,
                            );
                            Cookie.set('reservation', slug, '1');
                        },
                        'Reservasiya uğurla ləğv edildi!',
                        '/',
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
