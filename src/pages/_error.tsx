import Head from 'next/head';

function Error({ statusCode }: { statusCode: number }) {
    return (
        <>
            <Head>
                <title>{statusCode} - Səhifə tapılmadı</title>
            </Head>

            <div
                style={{ height: '100vh' }}
                className="d-flex justify-content-center align-items-center">
                {statusCode === 404 ? (
                    <div className="d-flex flex-column">
                        <h1 className="text-center">Səhifə tapılmadı</h1>
                        <p className="text-center">
                            Axtardığınız səhifə mövcud deyil.
                        </p>
                        <a href="/" className="btn btn-primary">
                            Ana səhifəyə qayıt
                        </a>
                    </div>
                ) : (
                    <p className="text-center">
                        Serverdə halhazırda dəyişiklik edilir. Zəhmət olmasa
                        biraz sonra yenidən cəhd edin.
                    </p>
                )}
            </div>
        </>
    );
}

Error.getInitialProps = ({ res, err }: any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
