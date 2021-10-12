import React, { useState, useCallback } from 'react';
import { Form, Label, Input, LinkContainer, Button, Header, Error } from './styles';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [mismatchError, setMismatchError] = useState(false);

    const onChangeEmail = useCallback((e) => { setEmail(e.target.value) }, []);
    const onChangeNickname = useCallback((e) => { setNickname(e.target.value) }, []);
    const onChangePassword = useCallback((e) => { setPassword(e.target.value); setMismatchError(e.target.value !== passwordCheck) }, [passwordCheck]);
    const onChangePasswordCheck = useCallback((e) => { setPasswordCheck(e.target.value); setMismatchError(e.target.value !== password) }, [password]);
    const onSubmit = useCallback((e) => {
        e.preventDefault(); if (!mismatchError) {
            console.log('serverに会員登録しましょう')
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
                    {/* {signUpError && <Error>{signUpError}</Error>}
                    {signUpSuccess && <Success>会員登録おめでとうございます。ログインしてください。</Success>} */}
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

