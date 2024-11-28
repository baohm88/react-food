import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
    }

    return data;
}

export default function useHttp(url, config, initialData = null) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(
        async (bodyData) => {
            setIsLoading(true);
            setError(null);

            try {
                const responseData = await sendHttpRequest(url, {
                    ...config,
                    body: bodyData ? JSON.stringify(bodyData) : undefined,
                });
                setData(responseData);
            } catch (err) {
                setError(err.message || "Something went wrong!");
            } finally {
                setIsLoading(false);
            }
        },
        [url, config]
    );

    useEffect(() => {
        if (!config.method || config.method === "GET") {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData: () => setData(initialData),
    };
}
