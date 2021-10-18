import React, { FC, useCallback, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect, Route, Switch } from 'react-router';
import { Header, RightMenu, ProfileImg, ProfileModal, LogOutButton, AddButton } from '@layouts/Workspace/styles';
import gravatar from 'gravatar';
import { WorkspaceWrapper, Workspaces, Channels, Chats, WorkspaceName, MenuScroll, WorkspaceButton } from './styles';
import loadable from '@loadable/component';
import Menu from '@components/Menu';
import { Link } from 'react-router-dom';
import { IUser } from '@typings/db';
import { Label } from '@pages/SignUp/styles';
import { Input } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import { Button } from '@pages/SignUp/styles';
import Modal from '@components/Modal';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC = ({ children }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
    const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
    const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

    const { data: userData, error, revalidate, mutate } = useSWR<IUser | false>(
        'http://localhost:3095/api/users',
        fetcher,
        {
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

    const onCloseUserProfile = useCallback((e) => {
        e.stopPropagation();
        setShowUserMenu(false);
    }, []);

    const onClickUserProfile = useCallback(() => {
        setShowUserMenu((prev) => !prev)
    }, [])

    const onClickCreateWorkspace = useCallback(() => {
        setShowCreateWorkspaceModal(true);
    }, [])

    const onCreateWorkspace = useCallback(() => { }, [])

    const onCloseModal = useCallback(() => {
        setShowCreateWorkspaceModal(false);
    }, []);

    if (!userData) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={gravatar.url(userData.nickname, { s: '27px', d: 'retro' })} alt={userData.nickname} />
                        {showUserMenu && (
                            <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                                <ProfileModal>
                                    <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                                    <div>
                                        <span id="profile-name">{userData.nickname}</span>
                                        <span id="profile-active">Active</span>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={onLogout}>logout!!</LogOutButton>
                            </Menu>
                        )}
                    </span>
                </RightMenu>
            </Header>
            <WorkspaceWrapper>
                <Workspaces>
                    {userData?.Workspaces.map((ws) => {
                        return (
                            <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                            </Link>
                        );

                    })}
                    <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
                </Workspaces>
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
            <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
                <form onSubmit={onCreateWorkspace}>
                    <Label id="workspace-label">
                        <span>Workspace name</span>
                        <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
                    </Label>
                    <Label id="workspace-url-label">
                        <span>Workspace url</span>
                        <Input id="worjkspace" value={newUrl} onChange={onChangeNewUrl} />
                    </Label>
                    <Button type="submit">create</Button>
                </form>
            </Modal>
        </div>
    )
}
export default Workspace;