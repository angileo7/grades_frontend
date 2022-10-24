import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";
import useToken from "./useToken";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    container: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

export default function UserList() {
    const classes = useStyles();
    const { token } = useToken();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        UsersGet()
    }, [])

    const UsersGet = () => {
        fetch("http://localhost:3000/students",
            {headers: new Headers({
            'token': token,
            'Content-Type': 'application/json'
        })} )
            .then(res => res.json())
            .then(
                (result) => {
                    setUsers(result)
                }
            )
    }

    const UpdateUser = id => {
        window.location = '/update/'+id
    }
    const UserCourses = id => {
        window.location = '/my-courses/'+id
    }
    const UserDelete = id => {
        var data = {
            'id': id
        }
        fetch('http://localhost:3000/students/'+id, {
            method: 'DELETE',
            headers: {
                'token': token,
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(
                (result) => {
                        UsersGet();
                }
            )
    }

    function UpdateUserGrade(id) {
        window.location = '/update-grade/'+id
    }

    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="lg">
                <Paper className={classes.paper}>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                USERS
                            </Typography>
                        </Box>
                        <Box>
                            <Link to="/create">
                                <Button variant="contained" color="primary">
                                    CREATE
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">First Name</TableCell>
                                    <TableCell align="left">Last Name</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (<>
                                    <TableRow key={user.ID}>
                                        <TableCell align="left">{user.name}</TableCell>
                                        <TableCell align="left">{user.last_name}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                                <Button onClick={() => UpdateUser(user.id)}>Edit</Button>
                                                <Button onClick={() => UserDelete(user.id)}>Del</Button>
                                            </ButtonGroup>
                                            { ' - ' }
                                            <ButtonGroup color="secondary" aria-label="outlined primary button group">
                                                <Button onClick={() => UserCourses(user.id)}><span style={{fontWeight: 'bold'}}>{`Go to ${user.name}'s Courses`}</span></Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell colSpan="3">
                                    <Table>
                                    <TableHead>
                                    <TableRow>
                                    <TableCell>Course Name</TableCell>
                                    <TableCell>Quarter number</TableCell>
                                    <TableCell> Has Passed?</TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user.courses.map((course) => (
                                            course.grades.map((grade) => (
                                                <TableRow>
                                                    <TableCell>{course.name}</TableCell>
                                                    <TableCell>{grade.title}</TableCell>
                                                    <TableCell>{`${grade.result} (${grade.rate})`}</TableCell>
                                                    <ButtonGroup color="primary" aria-label="primary button group">
                                                        <Button onClick={() => UpdateUserGrade(grade.id)}>Edit</Button>
                                                    </ButtonGroup>
                                                </TableRow>
                                            ))
                                        ))}
                                    </TableBody>
                                    </Table>
                                    </TableCell>
                                    </TableRow></>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </div>

    );
}