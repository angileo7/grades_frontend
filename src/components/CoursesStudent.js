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
import {Link, useParams} from "react-router-dom";
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

export default function CourseStudentList() {
    const classes = useStyles();
    const { token } = useToken();
    const { id } = useParams();

    const [courses, setCourses] = useState({});
    useEffect(() => {
        CoursesGet()
    }, [])

    const CoursesGet = () => {
        fetch("http://localhost:3000/students/"+id,
            {headers: new Headers({
            'token': token,
            'Content-Type': 'application/json'
        })} )
            .then(res => res.json())
            .then(

                (result) => {
                    setCourses(result.student)
                }
            )
    }

    function setAverage(grades) {
        let average = 0;
        const gradesCounter = grades.length;
        grades.map((grade) => (
            average = average + grade.rate
        ))
        average = average/gradesCounter;

        return average > 5 ? 'passed' : 'failed';
    }

    function CourseGradeCreate(id) {
        window.location = '/create-grade/'+id
    }

    function setGrade(grades, numberGrade) {
        const currenGrade = grades.filter(function isCurrentOne(grade) {
            return grade.title === numberGrade;
        })

        return currenGrade.length > 0 ? currenGrade[0].rate : '--';
    }

    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="lg">
                <Paper className={classes.paper}>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                {`${courses.name}'s Courses`}
                            </Typography>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Course Name</TableCell>
                                    <TableCell align="center">Quarter 1</TableCell>
                                    <TableCell align="center">Quarter 2</TableCell>
                                    <TableCell align="center">Quarter 3</TableCell>
                                    <TableCell align="center">Quarter 4</TableCell>
                                    <TableCell align="center">Average</TableCell>
                                    <TableCell align="center">Grade Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.courses && courses.courses.map((course) => (
                                    <TableRow key={course.ID}>
                                        <TableCell align="left">{course.name}</TableCell>
                                        <TableCell align="center">{setGrade(course.grades, '1st Quarter')}</TableCell>
                                        <TableCell align="center">{setGrade(course.grades, '2nd Quarter')}</TableCell>
                                        <TableCell align="center">{setGrade(course.grades, '3th Quarter')}</TableCell>
                                        <TableCell align="center">{setGrade(course.grades, '4th Quarter')}</TableCell>
                                        <TableCell align="center">{setAverage(course.grades)}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => CourseGradeCreate(course.id)}>Assign Grade</Button>
                                         </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </div>
    );
}