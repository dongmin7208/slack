import React, { FC, useCallback, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect, Route, Switch } from 'react-router';
import { Header, RightMenu, ProfileImg, ProfileModal, LogOutButton } from '@layouts/Workspace/styles';
import gravatar from 'gravatar';
import { WorkspaceWrapper, Workspaces, Channels, Chats, WorkspaceName, MenuScroll } from './styles';
import loadable from '@loadable/component';
import Menu from '@components/Menu';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC = ({ children }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
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

    const onClickUserProfile = useCallback(() => {
        setShowUserMenu((prev) => !prev)
    }, [])

    if (!data) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={gravatar.url(data.email, { s: '27px', d: 'retro' })} alt={data.nickname} />
                        {showUserMenu && (<Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                            <ProfileModal>
                                <img src={gravatar.url(data.nickname, { s: '36px', d: 'retro' })} alt={data.nickname} />
                                <div>
                                    <span id="profile-name">{data.nickname}</span>
                                    <span id="profile-active">Active</span>
                                </div>

                            </ProfileModal>
                            <LogOutButton onClick={onLogout}>logout!!</LogOutButton>
                        </Menu>)}
                    </span>
                </RightMenu>
            </Header>
            <WorkspaceWrapper>
                <Workspaces>test</Workspaces>
                <Channels>
                    <WorkspaceName>Slack</WorkspaceName>
                    <MenuScroll>
                        Menuscroll
                    </MenuScroll>
                </Channels>
                <Chats>
                    <Switch>
                        <Route path="/workspace/channel" component={Channel} />
                        <Route path="/workspace/dm" component={DirectMessage} />

                    </Switch>
                </Chats>
                {/* {children} */}
            </WorkspaceWrapper>
        </div>
    )
}
export default Workspace;