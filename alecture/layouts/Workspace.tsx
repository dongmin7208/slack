import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';

const Workspace: FC = ({ children }) => {
    const { data, error, revalidate } = useSWR('http://localhost:3095/api/users', fetcher,);

    const onLogout = useCallback(() => {
        axios.post('http://localhost:3095/api/users/logout', null, {
            withCredentials: true,
        })
            .then(() => {
                revalidate();
            });
    }, []);

    return (
        <div>
            <button onClick={onLogout}> logout</button>
            {children}
        </div>
    )
}
export default Workspace;