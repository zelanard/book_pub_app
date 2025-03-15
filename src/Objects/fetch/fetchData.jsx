import ApiGetAll from "../ApiGetAll";

const fetchData = async (api, setData, setError, setLoading) => {
    try {
        const response = await ApiGetAll(api);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

export default fetchData;