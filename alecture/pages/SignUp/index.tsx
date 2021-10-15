import React, { useState, useCallback, VFC } from 'react';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { Form, Label, Input, LinkContainer, Button, Header, Error } from './styles';

const SignUp = () => {
    const [email, onChangeEmail, setEmail] = useInput('');
    const [nickname, onChangeNickname, setNickname] = useInput('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [mismatchError, setMismatchError] = useState(false);
    const [signUpError, setSignUpError] = useState(false);


    const onChangePassword = useCallback((e) => { setPassword(e.target.value); setMismatchError(e.target.value !== passwordCheck) }, [passwordCheck]);
    const onChangePasswordCheck = useCallback((e) => { setPasswordCheck(e.target.value); setMismatchError(e.target.value !== password) }, [password]);
    const onSubmit = useCallback((e) => {
        e.preventDefault(); if (!mismatchError && nickname) {
            console.log('serverに会員登録しましょう')
            axios.post('/api/users', {
                email,
                nickname,
                password,
            })
                .then((response) => { console.log(response) })
                .catch((error) => { console.log(error); setSignUpError(true) })
                .finally(() => { });

        } try { } catch (err) {

        } finally {

        }
    }, [email, nickname, password, passwordCheck, mismatchError]);

    return (
        <div id="container">
            <Header>slack</Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span>メール</span>
                    <div>
                        <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                    </div>
                </Label>
                <Label id="nickname-label">
                    <span>nickname</span>
                    <div>
                        <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
                    </div>
                </Label>
                <Label id="password-label">
                    <span>パスワード</span>
                    <div>
                        <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                    </div>
                </Label>
                <Label id="password-check-label">
                    <span>password-check</span>
                    <div>
                        <Input
                            type="password"
                            id="password-check"
                            name="password-check"
                            value={passwordCheck}
                            onChange={onChangePasswordCheck}
                        />
                    </div>
                    {mismatchError && <Error>パスワードが違います。</Error>}
                    {!nickname && <Error>NICKNAMEを入力してください。</Error>}
                    {signUpError && <Error>もう使ってあるIDです。</Error>}
                    {/* {signUpSuccess && <Success>会員登録おめでとうございます。ログインしてください。</Success>} */}
                </Label>
                <Button type="submit">会員登録</Button>
            </Form>
            <LinkContainer>
                もう会員ですか？&nbsp;
                <a href="/login">ログインしよう</a>
            </LinkContainer>
        </div>
    );
};

export default SignUp;

