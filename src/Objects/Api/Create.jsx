/**
 * Sends a POST request to the specified API to create new data.
 * 
 * @param {string} api - The URL of the API endpoint to send the data to.
 * @param {Object} data - The data to send in the body of the request.
 * @returns {Promise<Object|null>} The response data in JSON format or null if an error occurred.
 */
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