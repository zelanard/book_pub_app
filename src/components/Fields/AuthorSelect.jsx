import { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import api from "../../Objects/api";
import fetchTempData from "../../Objects/fetch/fetchTempItem";

const AuthorSelect = ({ showId, authorId, setAuthorId }) => {
    const [authors, setAuthors] = useState([]);

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
                {/* If no author is selected, the empty value will be shown by default */}
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
