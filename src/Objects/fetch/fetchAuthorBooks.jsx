import Get from "../Api/Get";

const fetchAuthorBooks = async (api, id, setBooks, setFirstName, setLastName, setErrorSelected, setLoadingSelected) => {
    try {
        const response = await Get(api, id);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setBooks(result.books);
        setFirstName(result.firstName);
        setLastName(result.lastName);
    } catch (err) {
        setErrorSelected(err.message);
    } finally {
        setLoadingSelected(false);
    }
};

export default fetchAuthorBooks;