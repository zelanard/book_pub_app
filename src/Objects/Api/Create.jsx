const Create = async (api, data) => {
    try {
        const response = await fetch(api, {
            method: "POST",
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

export default Create;