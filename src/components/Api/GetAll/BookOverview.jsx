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
import fetchBook from "../../../Objects/fetch/fetchBook";
import BookForm from "../../Forms/BookForm";
import dayjs from 'dayjs';
import DataField from "../../Fields/DataField";

const BookOverview = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState("");
    const [publishDate, setPublishDate] = useState(dayjs());
    const [basePrice, setBasePrice] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [id, setId] = useState("");

    const [cover, setCover] = useState();
    const [author, setAuthor] = useState();

    const [loadingSelected, setLoadingSelected] = useState(true);
    const [errorSelected, setErrorSelected] = useState(null);
    const [shouldFetchData, setShouldFetchData] = useState(false);

    const [newBook, setNewBook] = useState(false);

    const activeApi = api.book;

    useEffect(() => {
        if (id) {
            fetchBook(activeApi, id, setCover, setAuthor, setTitle, handlePublishDate, setBasePrice, setAuthorId, setErrorSelected, setLoadingSelected);
        }
        fetchData(activeApi, setData, setError, setLoading);
    }, [id, shouldFetchData]);

    const dateToString = (date) => {
        return date.format('YYYY-MM-DD');
    }

    const stringToDate = (date) => {
        return dayjs(date, 'YYYY-MM-DD', true);
    }

    const handlePublishDate = (date) => {
        setPublishDate(stringToDate(date));
    }

    const handleEditBook = async () => {
        await Update(activeApi, id, { id, title, publishDate: dateToString(publishDate), basePrice, authorId });
        setShouldFetchData(prev => !prev);
    };

    const handleDeleteBook = async () => {
        await Delete(activeApi, id);
        resetBook();
        setShouldFetchData(prev => !prev);
    };

    const handleNewBook = async () => {
        await Create(activeApi, { title, publishDate: dateToString(publishDate), basePrice, authorId });
        setNewBook(false);
        resetBook();
        setShouldFetchData(prev => !prev);
    }

    const resetBook = () => {
        setTitle("");
        setPublishDate(dayjs());
        setBasePrice(null);
        setAuthor(null);
        setCover(null);
        setId("");
    }

    const handleInitSetNewBook = () => {
        resetBook();
        setNewBook(true);
    }

    const dataRows = data.map((value, index) => ({
        id: value.id,
        Title: value.title,
        PublishDate: value.publishDate,
        BasePrice: value.basePrice
    }));

    const dataColumns = [
        { field: "id", headerName: "ID",width: 60 },
        { field: "Title", headerName: "Title", flex:1 },
        { field: "PublishDate", headerName: "PublishDate" },
        { field: "BasePrice", headerName: "BasePrice" }
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
                    label="Add Book"
                    init={handleInitSetNewBook}
                />
                <Divider orientation="vertical" sx={{ marginLeft: "10px", marginRight: "10px", height: "400px" }} />
                <Box sx={{ height: 400, width: "66%" }}>
                    {loadingSelected && id && <CircularProgress />}
                    {errorSelected && <Box>Error: {errorSelected}</Box>}
                    {!loadingSelected && !errorSelected && id &&
                        <Box>
                            <BookForm
                                showId={true}
                                id={id}
                                title={title}
                                setTitle={setTitle}
                                publishDate={publishDate}
                                setPublishDate={setPublishDate}
                                basePrice={basePrice}
                                setBasePrice={setBasePrice}
                                authorId={authorId}
                                setAuthorId={setAuthorId}
                            />
                            <EditButton
                                label="Edit Author"
                                onClick={() => handleEditBook()}
                            />
                            <DeleteButton
                                label="Delete Author"
                                onClick={() => handleDeleteBook()}
                            />
                            <Divider sx={{ marginTop: "40px", marginBottom: "10px" }} > Cover </Divider>
                            <DataField data={cover}/>
                        </Box>
                    }
                </Box>
            </ButtonBox>
            <CreateForm
                view={newBook}
                setView={setNewBook}
                title="Add New Author"
                handleCreate={handleNewBook}
                dataFields={<BookForm
                    showId={false}
                    id={null}
                    title={title}
                    setTitle={setTitle}
                    publishDate={publishDate}
                    setPublishDate={setPublishDate}
                    basePrice={basePrice}
                    setBasePrice={setBasePrice}
                    authorId={authorId}
                    setAuthorId={setAuthorId}
                />
                }
            />
        </Box >
    );
};

export default BookOverview;