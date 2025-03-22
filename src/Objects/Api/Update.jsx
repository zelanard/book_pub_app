/**
 * Sends a PUT request to update data at the specified API endpoint.
 * 
 * @param {string} api - The URL of the API endpoint to send the request to.
 * @param {string} id - The ID of the data to update.
 * @param {Object} data - The updated data to send in the request body.
 * @returns {Promise<Object|null>} The response data in JSON format or null if an error occurred.
 */
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