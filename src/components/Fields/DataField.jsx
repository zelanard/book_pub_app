import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

/**
 * DataField component dynamically renders either a SingleField or MultiField component 
 * based on whether the provided data is an array or a single object.
 * @param {*} param0 - The props passed to the component, including:
 *   - data (object|array): The data to be displayed in a table.
 * @returns {JSX.Element} A table displaying the provided data either as a single field or multiple fields.
 */
const DataField = ({ data }) => {
    if (Array.isArray(data)) {
        return (<MultiField data={data} />);
    } else {
        return (<SingleField data={data} />);
    }
}

/**
 * GenerateHeader component renders the table headers based on the provided data.
 * @param {*} param0 - The props passed to the component, including:
 *   - data (object): The data object that contains the keys to be displayed as column headers.
 * @returns {JSX.Element} A table header with columns corresponding to the keys of the provided data object.
 */
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

/**
 * toJsonOptional function processes a value and converts it into a string representation.
 * Handles arrays and objects with specific properties (firstName and lastName).
 * @param {*} value - The value to be converted into a string.
 * @returns {string} A string representation of the value.
 */
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

/**
 * GenerateRow component renders a single row of data in the table.
 * @param {*} param0 - The props passed to the component, including:
 *   - data (object): The data object to be displayed in a single row.
 * @returns {JSX.Element} A table row containing the values of the provided data object.
 */
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

/**
 * SingleField component renders a table for a single data object.
 * @param {*} param0 - The props passed to the component, including:
 *   - data (object): The data to be displayed in a single row of the table.
 * @returns {JSX.Element|null} A table displaying a single row or null if no data is provided.
 */
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

/**
 * MultiField component renders a table for multiple data objects.
 * @param {*} param0 - The props passed to the component, including:
 *   - data (array): An array of data objects to be displayed in multiple rows of the table.
 * @returns {JSX.Element} A table displaying multiple rows based on the provided array of data objects.
 */
const MultiField = ({ data }) => {
    return (
        <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table size="small" sx={{ width: "100%" }}>
                <GenerateHeader data={data[0]} />
                {data && data.map((obj, index) => (
                    <GenerateRow data={obj} key={index} />
                ))}
            </Table>
        </TableContainer>
    )
}

/**
 * DataField component is exported for use in other parts of the application.
 */
export default DataField;
