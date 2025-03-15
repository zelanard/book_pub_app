const Update = async (api, id, data) => {
    try {
        const url = `${api}/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export default Update;
