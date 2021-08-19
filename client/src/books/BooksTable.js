import React, { Component, Fragment } from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Box, Typography, Paper } from "@material-ui/core";
import * as BooksAPI from "./BooksAPI";

class BooksTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        BooksAPI.getBooks()
            .then(response => response.json())
            .then(books => this.setState({ books: books }));
    }

    render() {
        return (
            <Fragment>
                <Box my={4}>
                    <Typography align="center" variant="h4" color="textSecondary">
                        My bookshelf
                    </Typography>
                </Box>

                <Paper elevation={0} variant="outlined">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Author</TableCell>
                                    <TableCell align="right">Read Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.books.map((book) => (
                                    <TableRow key={book.id}>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell align="right">{book.authors}</TableCell>
                                        <TableCell align="right">{book.readDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Fragment>
        );
    }
}

export default BooksTable;