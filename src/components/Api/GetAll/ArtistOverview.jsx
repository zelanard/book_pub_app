import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../Objects/api";
import { Box, CircularProgress, Divider } from "@mui/material";
import ButtonBox from "../../Boxes/ButtonBox";
import Update from "../../../Objects/Api/Update";
import Delete from "../../../Objects/Api/Delete";
import Create from "../../../Objects/Api/Create";
import fetchData from "../../../Objects/fetch/fetchData";
import fetchArtistCovers from "../../../Objects/fetch/fetchArtistCovers";
import CustomGridToolbar from "../../Toolbars/CustomGridToolbar";
import AsyncDataGridView from "../../AsyncDataGridView";
import CreateForm from "../../Forms/CreateForm";
import PersonForm from "../../Forms/PersonForm";
import DeleteButton from "../../Buttons/DeleteButton";
import EditButton from "../../Buttons/EditButton";

/**
 * ArtistOverview component that displays a list of artists and allows CRUD operations
 * @returns {JSX.Element} The rendered component
 */
const ArtistOverview = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [id, setId] = useState("");
    const [covers, setCovers] = useState([]);
    const [loadingSelected, setLoadingSelected] = useState(true);
    const [errorSelected, setErrorSelected] = useState(null);
    const [shouldFetchData, setShouldFetchData] = useState(false);

    const [newArtist, setNewArtist] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    /**
     * Fetches artist list and selected artist's covers when ID changes.
     * Triggers a refresh when `shouldFetchData` changes.
     */
    useEffect(() => {
        if (id) {
            fetchArtistCovers(api.artist, id, setCovers, setFirstName, setLastName, setErrorSelected, setLoadingSelected);
        }
        fetchData(api.artist, setData, setError, setLoading);
    }, [id, shouldFetchData]);

    /**
     * Handles updating an existing artist's details.
     * Updates first name and last name based on form input.
     */
    const handleEditArtist = async () => {
        await Update(api.artist, id, { id, firstName, lastName });
        setShouldFetchData(prev => !prev);
    };

    /**
     * Handles deleting an artist.
     * Resets the selected artist and refreshes the data.
     */
    const handleDeleteArtist = async () => {
        await Delete(api.artist, id);
        resetArtist();
        setShouldFetchData(prev => !prev);
    };

    /**
     * Handles creating a new artist.
     * Resets input fields and refreshes the data.
     */
    const handleNewArtist = async () => {
        await Create(api.artist, { firstName, lastName });
        setNewArtist(false);
        resetArtist();
        setShouldFetchData(prev => !prev);
    };

    /**
     * Resets artist form fields.
     */
    const resetArtist = () => {
        setFirstName("");
        setLastName("");
        setId("");
    };

    /**
     * Initializes the form for creating a new artist.
     */
    const handleInitSetNewArtist = () => {
        resetArtist();
        setNewArtist(true);
    };

    /**
     * Transforms artist data into rows for the DataGrid component.
     */
    const dataRows = data.map((value) => ({
        id: value.id,
        firstName: value.firstName,
        lastName: value.lastName,
    }));

    /**
     * Defines column structure for the artist DataGrid.
     */
    const dataColumns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "firstName", headerName: "First Name", flex: 1 },
        { field: "lastName", headerName: "Last Name", flex: 1 },
    ];

    /**
     * Transforms artist cover data into rows for the DataGrid component.
     */
    const coverRows = covers.map((value) => ({
        id: value.id,
        designIdeas: value.designIdeas,
        digitalOnly: value.digitalOnly,
        bookId: value.bookId
    }));

    /**
     * Defines column structure for the artist covers DataGrid.
     */
    const coverColumns = [
        { field: "id", headerName: "id", width: 60 },
        { field: "designIdeas", headerName: "Design Ideas", flex: 1 },
        { field: "digitalOnly", headerName: "Digital Only", flex: 1 },
        { field: "bookId", headerName: "Book ID", flex: 1 }
    ];

    /**
     * Handles row selection in the artist DataGrid.
     * 
     * @param {Object} params - DataGrid row parameters.
     */
    const handleRowClick = (params) => {
        setId(params.row["id"]);
    };

    /**
     * Handles change in the first name input field.
     * 
     * @param {Object} event - Change event.
     */
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    /**
     * Handles change in the last name input field.
     * 
     * @param {Object} event - Change event.
     */
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    return (
        <Box>
            <ButtonBox>
                <AsyncDataGridView
                    loading={loading}
                    error={error}
                    rows={dataRows}
                    columns={dataColumns}
                    onRowClick={(params) => handleRowClick(params)}
                    toolbar={CustomGridToolbar}
                    label="Add Artist"
                    init={handleInitSetNewArtist}
                />
                <Divider orientation="vertical" sx={{ marginLeft: "10px", marginRight: "10px", height: "400px" }} />
                <Box sx={{ height: 400, width: "66%" }}>
                    {loadingSelected && id && <CircularProgress />}
                    {errorSelected && <Box>Error: {errorSelected}</Box>}
                    {!loadingSelected && !errorSelected && id &&
                        <Box>
                            <PersonForm
                                showId={true}
                                id={id}
                                firstName={firstName}
                                lastName={lastName}
                                onFirstNameChange={handleFirstNameChange}
                                onLastNameChange={handleLastNameChange}
                            />
                            <EditButton
                                label="Edit Artist"
                                onClick={() => handleEditArtist()}
                            />
                            <DeleteButton
                                label="Delete Artist"
                                onClick={() => handleDeleteArtist()}
                            />
                            <Divider sx={{ marginTop: "40px", marginBottom: "10px" }} > Covers </Divider>
                            <DataGrid
                                rows={coverRows}
                                columns={coverColumns}
                                pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
                                paginationModel={paginationModel}
                                onPaginationModelChange={setPaginationModel}
                            />
                        </Box>
                    }
                </Box>
            </ButtonBox>
            <CreateForm
                view={newArtist}
                setView={setNewArtist}
                title="Add New Artist"
                handleCreate={handleNewArtist}
                dataFields={<PersonForm
                    showId={false}
                    id={null}
                    firstName={firstName}
                    lastName={lastName}
                    onFirstNameChange={handleFirstNameChange}
                    onLastNameChange={handleLastNameChange}
                />}
            />
        </Box>
    );
};

export default ArtistOverview;
