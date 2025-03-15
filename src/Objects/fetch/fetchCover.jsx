import Get from "../Api/Get";

const fetchCover = async (
    api,
    id,
    setBook,
    setArtist,
    setDesignIdeas,
    setBookId,
    setDigitalOnly,
    setArtistIds,
    setErrorSelected,
    setLoadingSelected
) => {
    try {
        const response = await Get(api, id);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        const artIds = result.artists.map(item => item.id);
        setBook(result.book);
        setArtist(result.artists);
        setDesignIdeas(result.designIdeas);
        setBookId(result.bookId);
        setDigitalOnly(result.digitalOnly);
        setArtistIds(artIds);
    } catch (err) {
        setErrorSelected(err.message);
    } finally {
        setLoadingSelected(false);
    }
};

export default fetchCover;