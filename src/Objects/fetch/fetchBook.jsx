import Get from "../Api/Get";

const fetchBook = async (api, id, setCover, setAuthor, setTitle, setPublishDate, setBasePrice, setAuthorId, setErrorSelected, setLoadingSelected) => {
    try {
        const response = await Get(api, id);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setCover(result.cover);
        setAuthor(result.author);
        setTitle(result.title);
        setPublishDate(result.publishDate);
        setBasePrice(result.basePrice);
        setAuthorId(result.authorId);
    } catch (err) {
        setErrorSelected(err.message);
    } finally {
        setLoadingSelected(false);
    }
};

export default fetchBook;