/**
 * Sends a GET request to the specified API endpoint to retrieve data by ID.
 * 
 * @param {string} api - The URL of the API endpoint to fetch data from.
 * @param {string} id - The ID of the data to retrieve.
 * @returns {Promise<Object|null>} The response data in JSON format or null if an error occurred.
 */
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
