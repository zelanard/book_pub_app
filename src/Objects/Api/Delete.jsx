/**
 * Sends a DELETE request to the specified API endpoint to delete the data with the given ID.
 * 
 * @param {string} api - The URL of the API endpoint to delete data from.
 * @param {string} id - The ID of the data to delete.
 * @returns {Promise<Object|null>} The response data in JSON format or null if an error occurred.
 */
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