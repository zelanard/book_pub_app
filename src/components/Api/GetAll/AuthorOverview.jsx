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
import fetchAuthorBooks from "../../../Objects/fetch/fetchAuthorBooks";

const AuthorOverview = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [id, setId] = useState("");
    const [books, setBooks] = useState([]);
    const [loadingSelected, setLoadingSelected] = useState(true);
    const [errorSelected, setErrorSelected] = useState(null);
    const [shouldFetchData, setShouldFetchData] = useState(false);

    const [newAuthor, setNewAuthor] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    const activeApi = api.authors;

    useEffect(() => {
        if (id) {
            fetchAuthorBooks(activeApi, id, setBooks, setFirstName, setLastName, setErrorSelected, setLoadingSelected);
        }
        fetchData(activeApi, setData, setError, setLoading);
    }, [id, shouldFetchData]);

    const handleEditAuthor = async () => {
        await Update(activeApi, id, { id, firstName, lastName });
        setShouldFetchData(prev => !prev);
    };

    const handleDeleteAuthor = async () => {
        await Delete(activeApi, id);
        resetAuthor();
        setShouldFetchData(prev => !prev);
    };

    const handleNewAuthor = async () => {
        await Create(activeApi, { firstName, lastName });
        setNewAuthor(false);
        resetAuthor();
        setShouldFetchData(prev => !prev);
    }

    const resetAuthor = () => {
        setFirstName("");
        setLastName("");
        setId("");
    }

    const handleInitSetNewAuthor = () => {
        resetAuthor();
        setNewAuthor(true);
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

    const bookRows = books.map((value, index) => ({
        id: value.id,
        Title: value.title,
        PublishDate: value.publishDate,
        BasePrice: value.basePrice,
        AuthorId: value.authorId,
    }));

    const bookColumns = [
        { field: "id", headerName: "ID" },
        { field: "Title", headerName: "Title" },
        { field: "PublishDate", headerName: "PublishDate" },
        { field: "BasePrice", headerName: "BasePrice" },
        { field: "AuthorId", headerName: "AuthorId" },
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
                    label="Add Author"
                    init={handleInitSetNewAuthor}
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
                                label="Edit Author"
                                onClick={() => handleEditAuthor()}
                            />
                            <DeleteButton
                                label="Delete Author"
                                onClick={() => handleDeleteAuthor()}
                            />
                            <Divider sx={{ marginTop: "40px", marginBottom: "10px" }} > Covers </Divider>
                            <DataGrid
                                rows={bookRows}
                                columns={bookColumns}
                                pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
                                paginationModel={paginationModel}
                                onPaginationModelChange={setPaginationModel}
                            />
                        </Box>
                    }
                </Box>
            </ButtonBox>
            <CreateForm
                view={newAuthor}
                setView={setNewAuthor}
                title="Add New Author"
                handleCreate={handleNewAuthor}
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

export default AuthorOverview;