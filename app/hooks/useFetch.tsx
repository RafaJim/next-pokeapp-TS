import { useState, useEffect } from "react";

interface Data {
    id: number;
    abilities: any[];
}

const useFetch = (url: string) => {
    
    const [data, setData] = useState<Data>();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    
    const fetchData = async() => {
        let data;

        try {
            setLoading(true);
            const res = await fetch(url, {cache: 'no-store'});
            if(!res.ok)
                throw new Error('Bad response', {
                    cause: { res }
                })
            data = await res.json();

        } catch (err) {
            setError(true);
            console.log(error);
        }

        setLoading(false);
        return data;
    }

    useEffect(() => {
        const getData = async() => {
            setData(await fetchData())
        }
        getData();
    }, [url])

    return { data, loading, error };
}
 
export default useFetch;
