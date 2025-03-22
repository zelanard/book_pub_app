/**
 * Fetches all data from the specified API endpoint.
 * 
 * @param {string} getAll - The URL of the API endpoint to fetch data from.
 * @returns {Promise<Object | null>} The response data in JSON format, or null if an error occurred.
 */
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