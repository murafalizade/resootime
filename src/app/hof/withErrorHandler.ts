import Router from 'next/router';
import Swal from 'sweetalert2';

const withErrorHandeler = (
    callback: ({ args }: { args: any }) => void,
    succesMsj: string,
    callbackUrl?: string,
    errorMsj?: string,
) => {
    return async (args: any) => {
        try {
            await callback(args);
            Swal.fire(succesMsj, '', 'success').then(() => {
                callbackUrl ? Router.push(callbackUrl) : Router.reload();
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Xəta',
                text: errorMsj || 'Xəta baş verdi',
            }).then(() => Router.reload());
        }
    };
};

export default withErrorHandeler;
