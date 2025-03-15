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

    useEffect(() => {
        if (id) {
            fetchArtistCovers(api.artist, id, setCovers, setFirstName, setLastName, setErrorSelected, setLoadingSelected);
        }
        fetchData(api.artist, setData, setError, setLoading);
    }, [id, shouldFetchData]);

    const handleEditArtist = async () => {
        await Update(api.artist, id, { id, firstName, lastName });
        setShouldFetchData(prev => !prev);
    };

    const handleDeleteArtist = async () => {
        await Delete(api.artist, id);
        resetArtist();
        setShouldFetchData(prev => !prev);
    };

    const handleNewArtist = async () => {
        await Create(api.artist, { firstName, lastName });
        setNewArtist(false);
        resetArtist();
        setShouldFetchData(prev => !prev);
    }

    const resetArtist = () => {
        setFirstName("");
        setLastName("");
        setId("");
    }

    const handleInitSetNewArtist = () => {
        resetArtist();
        setNewArtist(true);
    }

    const dataRows = data.map((value, index) => ({
        id: value.id,
        firstName: value.firstName,
        lastName: value.lastName,
    }));

    const dataColumns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "firstName", headerName: "First Name", flex: 1 },
        { field: "lastName", headerName: "Last Name", flex: 1 },
    ];

    const coverRows = covers.map((value, index) => ({
        id: value.id,
        designIdeas: value.designIdeas,
        digitalOnly: value.digitalOnly,
        bookId: value.bookId
    }));

    const coverColumns = [
        { field: "id", headerName: "id", width: 60 },
        { field: "designIdeas", headerName: "designIdeas", flex: 1 },
        { field: "digitalOnly", headerName: "digitalOnly", flex: 1 },
        { field: "bookId", headerName: "bookId", flex: 1 }
    ];

    const handleRowClick = (params) => {
        setId(params.row["id"]);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

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
        </Box >
    );
};

export default ArtistOverview;
