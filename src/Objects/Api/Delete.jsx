const Delete = async (api, id) => {
    try {
        const url = `${api}/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export default Delete;