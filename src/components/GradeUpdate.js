import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import useToken from "./useToken";

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

export default function GradeUpdate() {
    const classes = useStyles();
    const { token } = useToken();

    const { id } = useParams();
    useEffect(() => {
        fetch("http://localhost:3000/grades/"+id,
            {headers: new Headers({
            'token': token,
            'Content-Type': 'application/json'
        })} )
            .then(res => res.json())
            .then(
                (result) => {
                    setGrade(result.grade)
                    setFname(result.grade.rate)
                }
            )
    }, [id])

    const handleSubmit = event => {
        event.preventDefault();
        var data = {
            'id': id,
            'rate': fname
        }
        fetch('http://localhost:3000/grades/'+id, {
            method: 'PUT',
            headers: {
                Accept: 'application/form-data',
                'token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(
                (result) => {
                        window.location.href = '/';
                }
            )
    }

    const [fname, setFname] = useState('');
    const [grade, setGrade] = useState({});

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {`Grade ${grade.title}`}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={24} sm={12}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Update
                    </Button>
                </form>
            </div>
        </Container>
    );
}