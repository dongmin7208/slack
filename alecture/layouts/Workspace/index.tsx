import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Header, RightMenu, ProfileImg } from '@layouts/Workspace/styles';
import gravatar from 'gravatar';

const Workspace: FC = ({ children }) => {
    const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher, {
        dedupingInterval: 2000, //2秒
    });

    // const { data } = useSWR('hello', (key) => { localStorage.setItem('data', key); return localStorage.getItem('data') })

    const onLogout = useCallback(() => {
        axios.post('http://localhost:3095/api/users/logout', null, {
            withCredentials: true,
        })
            .then(() => {
                // revalidate();
                mutate(false, false); //(1.data, 2.shouldRevalidate)
            });
    }, []);
    if (!data) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src={gravatar.url(data.email, { s: '27px', d: 'retro' })} alt={data.nickname} />
                    </span>
                </RightMenu>
            </Header>
            <button onClick={onLogout}> logout</button>
            {children}
        </div>
    )
}
export default Workspace;