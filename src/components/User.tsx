import React from 'react';
import { Box, Typography } from '@material-ui/core';



interface IUserProps {
    name: string,
    username: string,
    email: string,
}

const User = ({name, username, email} : IUserProps) : JSX.Element => {
    return <>
        <Box>
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="body1">{username}</Typography>
            <Typography variant="body1">{email}</Typography>
        </Box>
    </>
}

export default User;