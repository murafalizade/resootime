function Error({ statusCode }: { statusCode: number }) {
    console.log(statusCode);
    return (
        <div className="d-flex justify-content-center align-items-center">
            <p className="text-center">
                Serverdə halhazırda deyişiklik edilir. Zəhmət olmasa biraz sonra yenidən cəhd edin.
            </p>
        </div>
    );
}

Error.getInitialProps = ({ res, err }: any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
