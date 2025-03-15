import ApiGetAll from "../ApiGetAll";

const fetchTempData = async (api, id) => {
    try {
        
        const response = await ApiGetAll(api);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (err) {
        return err.message;
    }
};

export default fetchTempData;