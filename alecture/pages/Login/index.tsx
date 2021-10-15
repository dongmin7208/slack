import useInput from '@hooks/useInput';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const LogIn = () => {
    const { data, error } = useSWR('http://localhost:3095/api/users', fetcher);
    const [logInError, setLogInError] = useState(false);
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setLogInError(false);
            axios
                .post(
                    '/api/users/login',
                    { email, password },
                )
                .then((response) => {
                })
                .catch((error) => {
                    setLogInError(error.response?.data?.statusCode === 401);
                })
        },
        [email, password]
    );

    return (
        <div id="container">
            <Header>Slack</Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span>メール</span>
                    <div>
                        <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                    </div>
                </Label>
                <Label id="password-label">
                    <span>パスワード</span>
                    <div>
                        <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                    </div>
                    {logInError && <Error>メールとパスワードが違います。</Error>}
                </Label>
                <Button type="submit">ログイン</Button>
            </Form>
            <LinkContainer>
                まだ、会員じゃないですか？&nbsp;
                <Link to="/signup">会員登録しましょう</Link>
            </LinkContainer>
        </div>
    );
};

export default LogIn;