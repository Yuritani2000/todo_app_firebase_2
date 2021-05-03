import React, {useState, useEffect} from 'react';
import firebase from '../../firebase';
import { Parent, Background, StyledDiv, StyledText, FlexBox, StyledInput, StyledButton, ModalBase } from './StyledComponents';
import { useHistory } from 'react-router-dom';



const SignIn: React.FC = () => {
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ warning, setWarning ] = useState(false);

    const history = useHistory();

    let _isMounted = false;

    useEffect(() => {
        _isMounted = true;

        return (()=> {
            _isMounted = false;
        })
    });

    const onChangeEmailAddress = (value: string) => {
        setEmailAddress(value);
    }

    const onChangePassword = (value: string) => {
        setPassword(value);
    }

    const onSubmit = () => {
        if(emailAddress === '' || password === ''){
            handleAuthenticationFailed();
            return;
        }

        firebase.auth().signInWithEmailAndPassword(emailAddress, password)
            .then(res => {
                console.log('successfully logged in')
                setWarning(false);
                history.push('/');
            })
            .catch(error => {
                console.log('login failed');
                handleAuthenticationFailed();
            });
        

    }

    const handleAuthenticationFailed = () => {
        setWarning(true);
        setPassword('');
    } 


    const onClickToSignUpPage = () => {
        history.push('/sign_up');
    }


    return (
        <ModalBase>
            <FlexBox    flexDirection='column'
                        alignItems='center'
                        justifyContent='space-around'>
                <StyledDiv  flexGrow={4}>
                    <FlexBox alignItems='center'>
                        <StyledText >
                        アカウントにログイン
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={0.3}>
                    <StyledText isHidden={!warning} fontColor='#ff0000' fontWeight='normal' size='0.8em'>
                        *メールアドレスまたはパスワードに誤りがあります
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
                                        warning={false}
                                        onChange={(e) => onChangeEmailAddress(e.target.value)}/>
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
                                        warning={false}
                                        onChange={(e) => onChangePassword(e.target.value)}/>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv  flexGrow={2}
                            width='70%'>
                    <FlexBox alignItems='center'>
                        <StyledButton   width='100%'
                                        height='2.5rem'
                                        flexGrow={1}
                                        onClick={()=> onSubmit()}>
                                ログイン
                        </StyledButton>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={0.5}>
                    <StyledText onClick={()=> {onClickToSignUpPage()}} isClickable={true} fontColor='#1e90ff' size='0.8em' fontWeight='normal'>
                            アカウント新規登録はこちら
                    </StyledText>
                </StyledDiv>
            </FlexBox>
        </ModalBase>
    );
}

export default SignIn;