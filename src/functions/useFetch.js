import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddItem, DeleteItem, DoneItem, EditItem } from "../app/commonSlice";

const useFetch = (url, deps) => {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, SetError] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch data from resource');
                    }
                    return res.json();
                })
                .then(jsonData => {
                    setData(jsonData.data);
                    setIsLoading(false);
                    SetError(null);
                    dispatch(AddItem(false));
                    dispatch(DeleteItem(false));
                    dispatch(DoneItem(false));
                    dispatch(EditItem(false));
                })
                .catch(err => {
                    console.log(err)
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        setIsLoading(false);
                        SetError(err.message);
                    }
                })
        }, 2000);

        return () => abortCont.abort();
    }, deps || []);
    return { data, isLoading, error };
}

export default useFetch;
