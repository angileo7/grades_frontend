import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Snackbar} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

async function loginUser(credentials) {
    return fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {
    const classes = useStyles();
    const [showSummaryError, setShowSummaryError] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        if(token.message === "invalid credentials")
            setShowSummaryError(true)
        else{
            setToken(token);
            window.location.href = '/';
        }
    }

    return(
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Login/Sign in
                </Typography>
                {showSummaryError && <Snackbar
                    open={true}
                    autoHideDuration={3000}
                    message="invalid credentials. Try with email: example@example.com and password supersecretpassword"
                />}

                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Email</p>
                        <input type="text" onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)}/>
                    </label>

                    <div style={{alignItems: 'center'}}>
                        <br/>
                        <button type="submit">Submit</button>
                    </div>
                </form>
        </div>
</Container>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}