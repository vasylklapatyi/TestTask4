import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FiltersDialog from './Dialog';
import axios from 'axios'
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

const useStyles = makeStyles();


const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                    row[name]
                )}
        </TableCell>
    );
};

export class FetchData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            previous: {}
        }
  
        this.onToggleEditMode = this.onToggleEditMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRevert = this.onRevert.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.classes = theme => ({
            root: {
                width: "100%",
                marginTop: theme.spacing(3),
                overflowX: "auto"
            },
            table: {
                minWidth: 650
            },
            selectTableCell: {
                width: 60
            },
            tableCell: {
                width: 130,
                height: 40
            },
            input: {
                width: 130,
                height: 40
            }
        });
	}

    componentDidMount() {
        let currentComponent = this;
        axios.get(window.location.origin + '/api/Home/GetGridData').then(function (response) {
            currentComponent.setState({ rows: response.data });
        });
	}


    onToggleEditMode = id => {
        this.setState({
            rows: (this.state.rows.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            })
            )
        });
    };

    onChange = (e, row) => {
        if (!this.state.previous[row.id]) {
            this.setState({previous: state => ({ ...state, [row.id]: row })});
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = this.state.rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        this.setState({
            rows: newRows
        });
    };

    onRevert = id => {
        const newRows = this.state.rows.map(row => {
            if (row.id === id) {
                return this.state.previous[id] ? this.state.previous[id] : row;
            }
            return row;
        });
        this.setState({ rows: newRows });
        this.setState({previous: state => {
            delete state[id];
            return state;
        }});
        this.onToggleEditMode(id);
    };

    renderRows() {
       return this.state.rows.map(row => (
            <TableRow key={row.id}>
                <TableCell className={this.classes.selectTableCell}>
                    {row.isEditMode ? (
                        <>
                            <IconButton
                                aria-label="done"
                                onClick={() => this.onToggleEditMode(row.id)}
                            >
                                <DoneIcon />
                            </IconButton>
                            <IconButton
                                aria-label="revert"
                                onClick={() => this.onRevert(row.id)}
                            >
                                <RevertIcon />
                            </IconButton>
                        </>
                    ) : (
                            <IconButton
                                aria-label="delete"
                                onClick={() => this.onToggleEditMode(row.id)}
                            >
                                <EditIcon />
                            </IconButton>
                        )}
                </TableCell>
                <CustomTableCell {...{ row, name: "name", onChange: this.onChange }} />
                <CustomTableCell {...{ row, name: "dateOfBirth", onChange: this.onChange }} />
                <CustomTableCell {...{ row, name: "married", onChange: this.onChange }} />
                <CustomTableCell {...{ row, name: "salary", onChange: this.onChange }} />
                <CustomTableCell {...{ row, name: "phone", onChange: this.onChange }} />
            </TableRow>
        ))
	}


    render() {
    return (
        <Paper className={this.classes.root}>
            <FiltersDialog/>
            <Table className={this.classes.table} aria-label="caption table">
                <caption>A barbone structure table example with a caption</caption>
                <TableHead>
                    <TableRow>
                        <TableCell align="left" />
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">DateOfBirth</TableCell>
                        <TableCell align="left">Married</TableCell>
                        <TableCell align="left">Salary</TableCell>
                        <TableCell align="left">Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        this.renderRows()
                    }
                </TableBody>
            </Table>
        </Paper>
    );
	}
}