import React, {useDebugValue, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useToken from "./useToken";
import {MenuItem} from "@material-ui/core";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function UserCreate() {
    const classes = useStyles();
    const { token } = useToken();
    const { id } = useParams();

    const handleSubmit = event => {
        event.preventDefault();
        var data = {
            'title': fname,
            'rate': rate,
            'course_id': id
        }
        fetch('http://localhost:3000/grades', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(
                () => {
                        window.location.href = '/';
                }
            ).catch(() => {
            alert('Grade already exist per this student-course')
        })
    }
    const [fname, setFname] = useState('1st Quarter');
    const [rate, setLRate] = useState('10');
    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Create Grade
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Select
                                labelId="rate"
                                id="rate"
                                value={rate}
                                label="Rate"
                                onChange={(e) => setLRate(e.target.value)}
                            >
                                <MenuItem value={'1'}>1</MenuItem>
                                <MenuItem value={'2'}>2</MenuItem>
                                <MenuItem value={'3'}>3</MenuItem>
                                <MenuItem value={'4'}>4</MenuItem>
                                <MenuItem value={'5'}>5</MenuItem>
                                <MenuItem value={'6'}>6</MenuItem>
                                <MenuItem value={'7'}>7</MenuItem>
                                <MenuItem value={'8'}>8</MenuItem>
                                <MenuItem value={'9'}>9</MenuItem>
                                <MenuItem value={'10'}>10</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                                labelId="quarter"
                                id="quarter"
                                value={fname}
                                label="quarter"
                                onChange={(e) => setFname(e.target.value)}
                            >
                                <MenuItem value={'1st Quarter'}>1st Quarter</MenuItem>
                                <MenuItem value={'2nd Quarter'}>2nd Quarter</MenuItem>
                                <MenuItem value={'3th Quarter'}>3th Quarter</MenuItem>
                                <MenuItem value={'4th Quarter'}>4th Quarter</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </Container>
    );
}