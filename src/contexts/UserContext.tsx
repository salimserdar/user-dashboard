import React, { useState, useEffect, createContext, ReactNode } from "react";
import instance from "../api/axios";

type ProviderProps = {
    children: ReactNode;
}

export const UserContext = createContext<any>([]);

const UserContextProvider = ({ children } : ProviderProps ) => {
    const [ users, setUsers ] = useState<any[]>([])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await instance.get('/users');
            setUsers([users, ...res.data])
        }
        fetchUser();
    }, [])

    return (
        <UserContext.Provider value={{users}}>
            {children}
        </UserContext.Provider>
    );

};

export default UserContextProvider;
