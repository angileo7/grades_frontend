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

export default function CourseList() {
    const classes = useStyles();
    const { token } = useToken();

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        CoursesGet()
    }, [])

    const CoursesGet = () => {
        fetch("http://localhost:3000/courses",
            {headers: new Headers({
            'token': token,
            'Content-Type': 'application/json'
        })} )
            .then(res => res.json())
            .then(
                (result) => {
                    setCourses(result)
                }
            )
    }

    const UpdateCourse = id => {
        window.location = '/courses-update/'+id
    }
    const CourseDelete = id => {
        var data = {
            'id': id
        }
        fetch('http://localhost:3000/courses/'+id, {
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
                        CoursesGet();
                }
            )
    }
    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="lg">
                <Paper className={classes.paper}>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Course
                            </Typography>
                        </Box>
                        <Box>
                            <Link to="/create-course">
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
                                    <TableCell align="left">Course Name</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.map((course) => (<>
                                    <TableRow key={course.ID}>
                                        <TableCell align="left">{course.name}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                                <Button onClick={() => UpdateCourse(course.id)}>Edit</Button>
                                                <Button onClick={() => CourseDelete(course.id)}>Del</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell colSpan="3">
                                    <Table>
                                    <TableHead>
                                    <TableRow>
                                    <TableCell>Student Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {course.students.map((student) => (
                                                <TableRow>
                                                    <TableCell>{student.name}</TableCell>
                                                    <TableCell>{student.last_name}</TableCell>
                                                </TableRow>
                                            )
                                        )}
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