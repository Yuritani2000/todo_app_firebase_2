import React, { useState } from 'react';
import firebase from '../../firebase';
import { Parent, Background, StyledDiv, StyledText, FlexBox, StyledInput, StyledButton, ModalBase } from './StyledComponents';
import { useHistory } from 'react-router-dom';


const SignUp: React.FC = () => {
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repeatedPassword, setRepeatedPassword] = useState("");
    const [ warning, setWarning ] = useState(false);

    const history = useHistory();

    const onChangeEmailAddress = (value: string) => {
        setEmailAddress(value);
    }

    const onChangePassword = (value: string) => {
        setPassword(value);
    }

    const onChangeRepeatedPassword = (value: string) => {
        setRepeatedPassword(value);
    }


    const onClickToSignInPage = () => {
        history.push('/sign_in');
    }

    const onSubmit = () => {
        if(emailAddress === '' || password === '' || repeatedPassword === ''){
            handleAccountRegistrationFailed();
            return;
        }

        if(password !== repeatedPassword){
            handleAccountRegistrationFailed();
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
            .then(res => {
                setWarning(false);
                history.push('/');
            })
            .catch(error => {
                console.log('signup failed');
                alert(error);
                handleAccountRegistrationFailed();
            });
        

    }

    const handleAccountRegistrationFailed = () => {
        setWarning(true);
        setPassword('');
        setRepeatedPassword('');
    } 

    return (
        <ModalBase>
            <FlexBox    flexDirection='column'
                        alignItems='center'
                        justifyContent='space-around'>
                <StyledDiv  flexGrow={4}>
                    <FlexBox alignItems='center'>
                        <StyledText >
                        新規アカウント登録
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={0.3}>
                    <StyledText isHidden={!warning} fontColor='#ff0000' fontWeight='normal' size='0.8em'>
                        *入力した情報に誤りがあるか、既に使用されています
                    </StyledText>
                </StyledDiv>
                <StyledDiv  flexGrow={1}
                            width='70%'>
                    <FlexBox alignItems='center'>
                        <StyledInput    value={emailAddress}
                                        flexGrow={1}
                                        width='100%'
                                        height='2.5rem'
                                        className='mailAddress'
                                        placeholder='メールアドレス'
                                        onChange={(e)=> onChangeEmailAddress(e.target.value)}/>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv  flexGrow={1}
                            width='70%'>
                    <FlexBox alignItems='center'>
                        <StyledInput    value={password}
                                        flexGrow={1}
                                        width='100%'
                                        height='2.5rem'
                                        className='passWord'
                                        type='password'
                                        placeholder='パスワード'
                                        onChange={(e) => onChangePassword(e.target.value)}/>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv  flexGrow={1}
                            width='70%'>
                    <FlexBox alignItems='center'>
                        <StyledInput    value={repeatedPassword}
                                        flexGrow={1}
                                        width='100%'
                                        height='2.5rem'
                                        className='passWordRepeat'
                                        type='password'
                                        placeholder='パスワード再入力'
                                        onChange={(e) => onChangeRepeatedPassword(e.target.value)}/>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv  flexGrow={2}
                            width='70%'>
                    <FlexBox alignItems='center'>
                        <StyledButton   width='100%'
                                        height='2.5rem'
                                        flexGrow={1}
                                        onClick={()=> onSubmit()}>
                                アカウント作成
                        </StyledButton>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={0.5}>
                    <StyledText onClick={() => { onClickToSignInPage() }} isClickable={true} fontColor='#1e90ff' size='0.8em' fontWeight='normal'>
                            アカウントをお持ちの方はこちら
                    </StyledText>
                </StyledDiv>
            </FlexBox>
        </ModalBase>
    );
}

export default SignUp;