import { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import api from "../../Objects/api";
import fetchTempData from "../../Objects/fetch/fetchTempItem";

/**
 * AuthorSelect component allows the user to select an author from a dropdown list.
 * It fetches a list of authors from an API and updates the selected author ID when the user selects an option.
 * @param {*} param0 - The props passed to the component, including:
 *   - showId (boolean): Determines whether to apply specific margin styles.
 *   - authorId (string|number): The currently selected author ID.
 *   - setAuthorId (function): A function to update the selected author ID in the parent component.
 * @returns {JSX.Element} A FormControl with a Select input for selecting an author.
 */
const AuthorSelect = ({ showId, authorId, setAuthorId }) => {
    const [authors, setAuthors] = useState([]);

    /**
     * Fetches author data from an API and maps the response to a list of author objects.
     * The author data is stored in the state variable `authors`.
     */
    useEffect(() => {
        const fetchAuthors = async () => {
            const data = await fetchTempData(api.authors);
            if (data) {
                setAuthors(data.map(value => ({
                    id: value.id,
                    name: `${value.firstName} ${value.lastName}`
                })));
            }
        };
        fetchAuthors();
    }, []);

    /**
     * Handles the change in the selected author.
     * Updates the authorId state when a different author is selected from the dropdown.
     * @param {*} event - The change event triggered by the Select input.
     */
    const handleChange = (event) => {
        setAuthorId(event.target.value);
    };

    return (
        <FormControl
            sx={
                showId
                    ? { marginLeft: "15px" }
                    : { marginTop: "15px" }
            }
            style={{
                minWidth: "250px"
            }}
        >
            <InputLabel>Author</InputLabel>
            <Select value={authorId} onChange={handleChange} displayEmpty variant="filled">
                {authors.map(author => (
                    <MenuItem key={author.id} value={author.id}>
                        {author.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default AuthorSelect;
