import Get from "../Api/Get";

const fetchArtistCovers = async (api, id, setCovers, setFirstName, setLastName, setErrorSelected, setLoadingSelected) => {
    try {
        const response = await Get(api, id);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setCovers(result.covers);
        setFirstName(result.firstName);
        setLastName(result.lastName);
    } catch (err) {
        setErrorSelected(err.message);
    } finally {
        setLoadingSelected(false);
    }
};

export default fetchArtistCovers;