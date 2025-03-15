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
import PersonForm from "../../Forms/PersonForm";
import { DataGrid } from "@mui/x-data-grid";

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

    useEffect(() => {
        if (id) {
            fetchCover(activeApi, id, setBook, setArtist, setDesignIdeas, setBookId, setDigitalOnly, setArtistIds, setErrorSelected, setLoadingSelected);
        }
        fetchData(activeApi, setData, setError, setLoading);
    }, [id, shouldFetchData]);

    const handleEditCover = async () => {
        await Update(activeApi, id, { id, designIdeas, digitalOnly, bookId, artistIds });
        setShouldFetchData(prev => !prev);
    };

    const handleDeleteCover = async () => {
        await Delete(activeApi, id);
        resetCover();
        setShouldFetchData(prev => !prev);
    };

    const handleNewCover = async () => {
        await Create(activeApi, { designIdeas, digitalOnly, bookId, artistIds });
        setNewCover(false);
        resetCover();
        setShouldFetchData(prev => !prev);
    }

    const resetCover = () => {
        setDesignIdeas("");
        setDigitalOnly(false);
        setBookId(null);
        setArtist(null);
        setArtistIds([]);
        setBook(null);
        setId("");
    }

    const handleInitSetNewCover = () => {
        resetCover();
        setNewCover(true);
    }

    const dataRows = data.map((value, index) => ({
        id: value.id,
        designIdeas: value.designIdeas,
        digitalOnly: value.digitalOnly,
        bookId: value.bookId
    }));

    const dataColumns = [
        { field: "id", headerName: "id", width: 60 },
        { field: "designIdeas", headerName: "designIdeas", flex: 1 },
        { field: "digitalOnly", headerName: "digitalOnly" },
        { field: "bookId", headerName: "bookId" }
    ];

    const artistRows = artists?.map((value, index) => ({
        id: value.id,
        firstName: value.firstName,
        lastName: value.lastName,
    }));

    const artistColumns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "firstName", headerName: "First Name", flex: 1 },
        { field: "lastName", headerName: "Last Name", flex: 1 },
    ];

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