import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components/macro';
import _ from "lodash";
import { sortBy } from '../utils'


import { UserContext } from '../contexts/UserContext';

const Users = () : JSX.Element => {
    const [search, setSearch] = useState<any>('');
    const [sort, setSort] = useState<any>('name');
    const [currentUsers, setCurrentUsers] = useState<any[]>([]);
    const { users } = useContext(UserContext);

    useEffect(() => {
        const sorted = sortBy('name', users);
        setCurrentUsers([...sorted]);
    }, [users])

    const handleSearch = (e: any) => {
        if(e.key === 'Enter') {
            if(search !== '') {
                const searchUsers = _.find(currentUsers, (o) => o.name === search || o.username === search || o.email === search);
                if(typeof searchUsers !== undefined) {
                    setCurrentUsers([]);
                    setCurrentUsers([searchUsers]);
                }
            } else {
                setCurrentUsers([...users]);
            }
        }
    }

    const handleSort = (e: any) => {
        setSort(e.target.value);
        const sorted = sortBy(e.target.value, currentUsers);
        setCurrentUsers([]);
        setCurrentUsers([...sorted]);
    }

    return (
        <UserDashboard>
            <UserHeader>
                <UserDashboardTitle>
                    Users
                </UserDashboardTitle>
                <UserInputs>
                    <UserInputsCol>
                        <label>Search</label>
                        <UserInput
                            type={"text"}
                            onChange={(e) => setSearch(e.target.value)}
                            value={search} 
                            onKeyPress={handleSearch}
                        />
                    </UserInputsCol>
                    <UserInputsCol>
                        <label>Sort by</label>
                        <SortInput
                            value={sort}
                            onChange={handleSort}>
                            <option value="name">Name</option>
                            <option value="username">User Name</option>
                            <option value="email">Email</option>
                        </SortInput>
                    </UserInputsCol>
                </UserInputs>
            </UserHeader>
            <UserList>
                {currentUsers.map((user : any, index : number) => {
                    return (
                        user.name ? 
                            <Link to={`/user/${user.id}`} key={index}>
                                <UserListItem>
                                    <UserListCol>
                                        <UserListAvatar />                   
                                        <UserInfo>
                                            <h3>{user.name}</h3> 
                                            <p>{user.username}</p>
                                            <UserEmail>
                                                {user.email}
                                            </UserEmail>
                                        </UserInfo>
                                    </UserListCol>
                                    <UserListCol>
                                        <UserEmail>
                                            {user.email}
                                        </UserEmail>
                                    </UserListCol>
                                </UserListItem>
                            </Link>
                        : null
                    )
                })}
            </UserList>
        </UserDashboard>
    );
}

export default Users;

const UserDashboard = styled.div`
`

const UserDashboardTitle = styled.h1`
    font-size: 32px;
`

const UserInputs = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    @media only screen and (min-width: 768px) {
        flex-direction: row;
    }
`

const UserInputsCol = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    label {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 18px;
    }

    @media only screen and (min-width: 768px) {
        margin-bottom: 0;
    }
`

const UserInput = styled.input`
    width: 100%;
    min-width: 180px;
    height: 32px;
    margin-right: 32px;

    @media only screen and (min-width: 768px) {
        width: 280px;
    }
`

const SortInput = styled.select`
    padding: 0 15px;
    width: 100%;
    min-width: 180px;
    height: 38px;

    @media only screen and (min-width: 768px) {
        width: 280px;
    }
`

const UserList = styled.div`
    display: flex;
    flex-direction: column;
    border: solid 1px #000;

    a {
        text-decoration: none;

        &:nth-child(odd){
            background-color: rgba(201, 201, 201, 0.1);
        }
    }

`

const UserListItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 32px 24px;
`

const UserListCol = styled.div`
    display: flex;
    align-items: center;

    &:last-child {
        display: none;
    }

    @media only screen and (min-width: 768px) {
        &:last-child {
            display: flex;
        }
    }
`

const UserListAvatar = styled.div`
    margin-right: 24px;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    background: #989696;
`

const UserEmail = styled.span`
    font-size: 16px;
`

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;

    h3 {
        color: #000;
        margin: 0;
        margin-bottom: 6px;
    }

    p {
        color: #000;
        margin: 0;
        margin-bottom: 6px;
    }

    ${UserEmail} {
        display: block;

        @media only screen and (min-width: 768px) {
            display: none;
        }
    }
    
`

const UserHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media only screen and (min-width: 768px) {
       flex-direction: row;
    }
`




