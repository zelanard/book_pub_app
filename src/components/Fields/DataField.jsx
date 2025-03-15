import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const DataField = ({ data }) => {
    if (Array.isArray(data)) {
        return (<MultiField data={data} />);
    } else {
        return (<SingleField data={data} />);
    }
}

const GenerateHeader = ({ data }) => {
    const entries = Object.entries(data);
    return (
        <TableHead>
            <TableRow>
                {entries.map(([key], idx) => (
                    <TableCell key={`header-${idx}`}>{key}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const toJsonOptional = (value) => {
    if (value != null || value != undefined && (Array.isArray(value) || typeof value === "object")) {
        if (Array.isArray(value) && typeof value[0] === "object" && Object.hasOwn(value[0], "firstName") && Object.hasOwn(value[0], "lastName")) {
            let str = "";
            value.map(({ firstName, lastName }) => {
                str += `${firstName} ${lastName}, `;
            })
            return str.slice(0, -2);
        } else if (typeof value === "object" && Object.hasOwn(value, "firstName") && Object.hasOwn(value[0], "lastName")) {
            return str += `${firstName} ${lastName}`;
        }
    }
    return String(value);
}

const GenerateRow = ({ data }) => {
    const entries = Object.entries(data);
    return (<TableBody>
        <TableRow>
            {entries.map(([key, value], idx) => (
                <TableCell key={`value-${idx}`}>{toJsonOptional(value)}</TableCell>
            ))}
        </TableRow>
    </TableBody>)
}

const SingleField = ({ data }) => {
    if (!data) return null; // Early return if no data is provided.

    const entries = Object.entries(data);

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <GenerateHeader data={data} />
                <GenerateRow data={data} />
            </Table>
        </TableContainer>
    );
};

const MultiField = ({ data }) => {
    return (
        <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table size="small" sx={{ width: "100%" }}>
                <GenerateHeader data={data[0]} />
                {data && data.map((obj, index) => (
                    <GenerateRow data={obj} />
                ))}
            </Table>
        </TableContainer>
    )
}


export default DataField;