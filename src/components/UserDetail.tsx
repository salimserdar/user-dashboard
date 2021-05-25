import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components/macro';
import instance from "../api/axios";
import User from './User';


const UserDetail = () : JSX.Element => {
    const [curentUser, setCurrentUser] = useState<any>(null);
    const [curentUserPosts, setCurrentUserPosts] = useState<any>([]);
    let { userId } = useParams<any>();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await instance.get(`/users/${userId}`);
            const userPosts = await instance.get(`/posts?userId=${userId}`);
            setCurrentUser({...res.data});
            setCurrentUserPosts([...userPosts.data])
        }
        fetchUser();
    }, [])


    return (
        curentUser ?
         <UserDetails>
            <UserTitle>Users &gt; {curentUser.name}</UserTitle>
            <UserSections>
                <UserSection>
                    <UserSubTitle>Contact Info</UserSubTitle>
                    <UserSectionItem>
                        <UserLabel>User name: </UserLabel>
                        {curentUser.username}
                    </UserSectionItem>
                    <UserSectionItem>
                        <UserLabel>Email: </UserLabel>
                        {curentUser.email}
                    </UserSectionItem>
                    <UserSectionItem>
                        <UserLabel>Phone: </UserLabel>
                        {curentUser.phone}
                    </UserSectionItem>
                    <UserSectionItem>
                        <UserLabel>Website: </UserLabel>
                        {curentUser.website}
                    </UserSectionItem>
                </UserSection>
                <UserSection>
                    <UserSubTitle>Address</UserSubTitle>
                    <UserSectionItem>
                        {curentUser.address.suite}, {curentUser.address.street}, {curentUser.address.city}, {curentUser.address.zipcode}
                    </UserSectionItem>
                </UserSection>
                <UserSection>
                    <UserSubTitle>Company</UserSubTitle>
                    <UserSectionItem>
                        {curentUser.company.name}
                    </UserSectionItem>
                    <UserSectionItem>
                        {curentUser.company.bs}
                    </UserSectionItem>
                    <UserSectionItem>
                        {curentUser.company.catchPhrase}
                    </UserSectionItem>
                </UserSection>
            </UserSections>
            <UserTitle>Posts by &gt; {curentUser.name}</UserTitle>
            <UserSections>
                {curentUserPosts.map((post : any, index: any) => {
                    return (
                        index < 3 ?
                        <UserSection key={index}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </UserSection>
                        : null
                    )
                })}
            </UserSections>
        </UserDetails>
        : <></>
    )
}

export default UserDetail;


const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
`
const UserTitle = styled.h1`
    font-size: 32px;
`
const UserSubTitle = styled.h2`
    margin: 0;
    margin-bottom: 24px;
    font-size: 24px;
`
const UserSections = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-gap: 25px;
    margin-bottom: 64px;

    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
`

const UserSection = styled.div`
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
    border: 1px solid #000;
`

const UserSectionItem = styled.div`

`

const UserLabel = styled.span`
    font-weight: 600;
`