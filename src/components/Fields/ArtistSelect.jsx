import { useState, useEffect } from "react";
import { Checkbox, FormControl, List, ListItem, ListItemText, CircularProgress, Divider, Typography } from "@mui/material";
import api from "../../Objects/api";
import fetchTempData from "../../Objects/fetch/fetchTempItem";

const ArtistSelect = ({ showId, artistIds, setArtistIds }) => {
    const [artistItems, setArtistItems] = useState();

    useEffect(() => {
        const fetchAuthors = async () => {
            const data = await fetchTempData(api.artist);
            if (data) {
                setArtistItems(data.map(value => ({
                    id: value.id,
                    name: `${value.firstName} ${value.lastName}`
                })));
            }
        };
        fetchAuthors();
    }, []);

    const handleChange = (artistId) => {
        const newSelectedIds = artistIds.includes(artistId)
            ? artistIds.filter(id => id !== artistId)
            : [...artistIds, artistId];
        setArtistIds(newSelectedIds);
    };

    const CB = (artistId) => {
        const isChecked = artistIds && artistIds.includes(artistId);
        return (
            <Checkbox
                checked={isChecked}
                onChange={() => handleChange(artistId)}
                color="primary"
            />
        );
    };

    if (artistItems === undefined) {
        return <CircularProgress />;
    }

    return (
        <FormControl
            sx={showId ? { marginLeft: "15px" } : { marginTop: "15px" }}
            style={{ minWidth: "250px" }}
        >
            <List>
                <ListItem><ListItemText primary={<Typography variant="h6" sx={{textAlign:"center"}}>Artists</Typography>} /></ListItem>
                {artistItems.map((artist) => (
                    <div key={artist.id}>
                        <ListItem button onClick={() => handleChange(artist.id)} sx={{ cursor: "pointer" }}>
                            {CB(artist.id)}
                            <ListItemText primary={artist.name} />
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </FormControl>
    );
};

export default ArtistSelect;
