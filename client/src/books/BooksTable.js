import React, { Component, Fragment } from "react";
import { Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Box, Typography, Paper, Divider } from "@material-ui/core";
import * as BooksAPI from "./BooksAPI";
import AddBookBox from "./AddBookBox";

const INITIAL_SHOW_COUNT = 5;

class BooksTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCount: INITIAL_SHOW_COUNT,
            books: []
        };
    }

    componentDidMount() {
        BooksAPI.getBooks()
            .then(response => response.json())
            .then(books => this.setState({ books: books }));
    }

    onShowAllClick() {
        this.setState(prevState => ({
            showCount: prevState.books.length,
        }));
    }

    onShowLessClick() {
        this.setState({
            showCount: INITIAL_SHOW_COUNT,
        });
    }

    render() {
        let { showCount, books } = this.state;
        let showAll = showCount === books.length;
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
                                {books.slice(0, showCount).map((book) => (
                                    <TableRow key={book.id}>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell align="right">{book.authors}</TableCell>
                                        <TableCell align="right">{new Date(book.readDate).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                        {books.length > INITIAL_SHOW_COUNT &&
                            <Box textAlign="center">
                                {showAll ?
                                    <Button fullWidth color="primary" onClick={() => this.onShowLessClick()}>Show less</Button> :
                                    <Button fullWidth color="primary" onClick={() => this.onShowAllClick()}>Show all ({books.length})</Button>
                                }
                            </Box>
                        }
                        <Divider />
                        <AddBookBox />
                    </TableContainer>
                </Paper>
            </Fragment>
        );
    }
}

export default BooksTable;