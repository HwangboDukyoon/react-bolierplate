import {useLoaderData} from "react-router-dom";

export const AboutPage = () => {

    const loaderData = useLoaderData();
    return (
        <>
            어바웃 페이징비니다.
            {JSON.stringify(loaderData)}
        </>
    )
}

