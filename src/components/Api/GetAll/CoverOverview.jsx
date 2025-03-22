import { useEffect, useState } from "react";
import api from "../../../Objects/api";
import { Box, CircularProgress, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import ButtonBox from "../../Boxes/ButtonBox";
import Update from "../../../Objects/Api/Update";
import Delete from "../../../Objects/Api/Delete";
import Create from "../../../Objects/Api/Create";
import fetchData from "../../../Objects/fetch/fetchData";
import CustomGridToolbar from "../../Toolbars/CustomGridToolbar";
import AsyncDataGridView from "../../AsyncDataGridView";
import CreateForm from "../../Forms/CreateForm";
import DeleteButton from "../../Buttons/DeleteButton";
import EditButton from "../../Buttons/EditButton";
import CoverForm from "../../Forms/CoverForm";
import fetchCover from "../../../Objects/fetch/fetchCover";
import DataField from "../../Fields/DataField";
import { DataGrid } from "@mui/x-data-grid";

/**
 * CoverOverview component that displays a list of covers and allows CRUD operations
 * @returns {JSX.Element} The rendered component
 */
const CoverOverview = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [designIdeas, setDesignIdeas] = useState("");
    const [digitalOnly, setDigitalOnly] = useState(false);
    const [bookId, setBookId] = useState("");
    const [artistIds, setArtistIds] = useState([]);
    const [id, setId] = useState("");

    const [book, setBook] = useState();
    const [artists, setArtist] = useState();

    const [loadingSelected, setLoadingSelected] = useState(true);
    const [errorSelected, setErrorSelected] = useState(null);
    const [shouldFetchData, setShouldFetchData] = useState(false);

    const [newCover, setNewCover] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    const activeApi = api.cover;

    /**
     * Fetches cover data when the component is mounted or when `id` or `shouldFetchData` changes.
     * Retrieves the cover details based on the selected cover id, and updates the state for book, artist, and other related data.
     */
    useEffect(() => {
        if (id) {
            fetchCover(activeApi, id, setBook, setArtist, setDesignIdeas, setBookId, setDigitalOnly, setArtistIds, setErrorSelected, setLoadingSelected);
        }
        fetchData(activeApi, setData, setError, setLoading);
    }, [id, shouldFetchData]);

    /**
     * Handles the edit action for an existing cover by updating the cover data using the `Update` API method.
     * After the update, triggers data re-fetch.
     */
    const handleEditCover = async () => {
        await Update(activeApi, id, { id, designIdeas, digitalOnly, bookId, artistIds });
        setShouldFetchData(prev => !prev);
    };

    /**
     * Handles the delete action for a cover by calling the `Delete` API method.
     * After deletion, resets the cover form and triggers data re-fetch.
     */
    const handleDeleteCover = async () => {
        await Delete(activeApi, id);
        resetCover();
        setShouldFetchData(prev => !prev);
    };

    /**
     * Handles the creation of a new cover by calling the `Create` API method.
     * After the cover is created, resets the form and triggers data re-fetch.
     */
    const handleNewCover = async () => {
        await Create(activeApi, { designIdeas, digitalOnly, bookId, artistIds });
        setNewCover(false);
        resetCover();
        setShouldFetchData(prev => !prev);
    }

    /**
     * Resets the form fields to their initial state.
     */
    const resetCover = () => {
        setDesignIdeas("");
        setDigitalOnly(false);
        setBookId(null);
        setArtist(null);
        setArtistIds([]);
        setBook(null);
        setId("");
    }

    /**
     * Initializes the state for creating a new cover, and resets the cover form fields.
     */
    const handleInitSetNewCover = () => {
        resetCover();
        setNewCover(true);
    }

    /**
     * Maps the fetched cover data into a format suitable for displaying in the data grid.
     */
    const dataRows = data.map((value, index) => ({
        id: value.id,
        designIdeas: value.designIdeas,
        digitalOnly: value.digitalOnly,
        bookId: value.bookId
    }));

    /**
     * Defines the columns to be displayed in the cover data grid.
     */
    const dataColumns = [
        { field: "id", headerName: "id", width: 60 },
        { field: "designIdeas", headerName: "designIdeas", flex: 1 },
        { field: "digitalOnly", headerName: "digitalOnly" },
        { field: "bookId", headerName: "bookId" }
    ];

    /**
     * Maps the artist data into a format suitable for displaying in the artist data grid.
     */
    const artistRows = artists?.map((value, index) => ({
        id: value.id,
        firstName: value.firstName,
        lastName: value.lastName,
    }));

    /**
     * Defines the columns to be displayed in the artist data grid.
     */
    const artistColumns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "firstName", headerName: "First Name", flex: 1 },
        { field: "lastName", headerName: "Last Name", flex: 1 },
    ];

    /**
     * Handles the row click event in the cover data grid. Sets the `id` state to the clicked cover's `id`.
     * @param {Object} params - The data from the clicked row.
     */
    const handleRowClick = (params) => {
        setId(params.row["id"]);
    }

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
                    label="Add Cover"
                    init={handleInitSetNewCover}
                />
                <Divider orientation="vertical" sx={{ marginLeft: "10px", marginRight: "10px", height: "400px" }} />
                <Box sx={{ height: 400, width: "66%" }}>
                    {loadingSelected && id && <CircularProgress />}
                    {errorSelected && <Box>Error: {errorSelected}</Box>}
                    {!loadingSelected && !errorSelected && id &&
                        <Box>
                            <CoverForm
                                showId={true}
                                id={id}
                                designIdeas={designIdeas}
                                digitalOnly={digitalOnly}
                                bookId={bookId}
                                artistIds={artistIds}
                                setDesignIdeas={setDesignIdeas}
                                setDigitalOnly={setDigitalOnly}
                                setBookId={setBookId}
                                setArtistIds={setArtistIds}
                            />
                            <EditButton
                                label="Edit Cover"
                                onClick={() => handleEditCover()}
                            />
                            <DeleteButton
                                label="Delete Cover"
                                onClick={() => handleDeleteCover()}
                            />
                            <Divider sx={{ marginTop: "40px", marginBottom: "10px" }} > Artist </Divider>

                            <DataGrid
                                rows={artistRows}
                                columns={artistColumns}
                                pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
                                paginationModel={paginationModel}
                                onPaginationModelChange={setPaginationModel}
                            />
                            <Divider sx={{ marginTop: "40px", marginBottom: "10px" }} > Book </Divider>
                            <DataField data={book} />
                        </Box>
                    }
                </Box>
            </ButtonBox>
            <CreateForm
                view={newCover}
                setView={setNewCover}
                title="Add New Cover"
                handleCreate={handleNewCover}
                dataFields={
                    <CoverForm
                        showId={false}
                        id={id}
                        designIdeas={designIdeas}
                        digitalOnly={digitalOnly}
                        bookId={bookId}
                        artistIds={artistIds}
                        setDesignIdeas={setDesignIdeas}
                        setDigitalOnly={setDigitalOnly}
                        setBookId={setBookId}
                        setArtistIds={setArtistIds}
                    />
                }
            />
        </Box >
    );
}

export default CoverOverview;
