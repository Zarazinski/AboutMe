import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import React, { Component } from "react";
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
            <TableContainer component={Paper}>
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
                            <TableRow>
                                <TableCell>{book.title}</TableCell>
                                <TableCell align="right">{book.authors}</TableCell>
                                <TableCell align="right">{book.readDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default BooksTable;