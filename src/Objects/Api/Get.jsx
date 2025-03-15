const Get = async (api, id) => {
    try {
        const url = `${api}/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export default Get;
