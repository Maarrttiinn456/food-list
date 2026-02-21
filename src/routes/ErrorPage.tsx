import { useRouteError, isRouteErrorResponse } from "react-router";

const ErrorPage = () => {
    const error = useRouteError();

    console.log("error:", error);

    if (isRouteErrorResponse(error)) {
        return (
            <div style={{ padding: "20px", color: "red" }}>
                <h1>Chyba {error.status}</h1>
                <p>{error.data}</p>
            </div>
        );
    }

    return <div>Něco se hodně pokazilo.</div>;
};

export default ErrorPage;
