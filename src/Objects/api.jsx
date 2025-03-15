const base = "https://localhost:7135/api/";
const api = {
    login: base + "authenticate/login",
    register: base + "authenticate/register",
    artist: base + "Artist",
    authors: base + "Authors",
    book: base + "Book",
    cover: base + "Cover"
}

export default api;