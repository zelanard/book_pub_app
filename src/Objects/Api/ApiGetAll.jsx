const ApiGetAll = async (getAll) => {
    try {
        const response = await fetch(getAll, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        return response;
    } catch {
    }
}

export default ApiGetAll;