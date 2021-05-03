import styled from 'styled-components';
import { isPropertySignature } from 'typescript';


export const Parent = styled.div(()=> `
  width: 500px;
  margin: auto;
`);

export const Background = styled.div(()=> `
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #f5f5f5;
`);

type StyledDivProps = {
  width?: string;
  height?: string;
  flexGrow?: number;
}

export const StyledDiv = styled.div<StyledDivProps>((props)=> `
  width: ${props.width ? props.width : 'auto'};
  height: ${props.height ? props.height : 'auto'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  box-sizing: border-box; 
`)

type StyledTextProps = {
  width?: string;
  height?: string;
  size?: string;
  fontWeight?: string;
  fontColor?: string;
  flexGrow?: number;
  isClickable?: boolean;
  isHidden?: boolean;
}

export const StyledText = styled.div<StyledTextProps>((props)=> `
  width: ${props.width ? props.width : 'auto'};
  height: ${props.height ? props.height : 'auto'};
  font-size: ${props.size ? props.size : '1.5em'};
  font-weight: ${ props.fontWeight ? props.fontWeight : 'bold'};
  color: ${props.fontColor ? props.fontColor : '#000000'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  cursor: ${props.isClickable ? 'pointer' : 'default'};
  visibility: ${props.isHidden ? 'hidden' : 'visible'};
`);

/* Styled-Componentsでは、呼び出し側のReactコンポーネントから、値を受け取って柔軟に装飾を変えることができるのが特徴。
   その際、受け取る変数の名前とデータ型の一覧を前もって定義し、下のように読み込む。 */
type FlexBoxProps = {
  width?: string;
  height?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  flexGrow?: number;
}

/* ${}の中には、JSのようなコードを書いて、propsから受け取った値を記述する。 */
export const FlexBox = styled.div<FlexBoxProps>(props => `
  width: ${props.width ? props.width : '100%'};
  height: ${props.height ? props.height  : '100%'};
  display: flex;
  flex-direction: ${props.flexDirection ? props.flexDirection : 'row'};
  align-items: ${props.alignItems ? props.alignItems : 'flex-start'} ;
  justify-content: ${props.justifyContent ? props.justifyContent : 'flex-start'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  box-sizing: border-box; 
`);

/* propsの型定義は、用途に応じて適当なものを選ぼう。 */
type StyledInputProps = {
  width?: string;
  height?: string;
  flexGrow?: number;
  warning?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>((props)=> `
  width: ${props.width ? props.width : '300px'};
  height: ${props.height ? props.height : '2em'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  border: solid;
  border-width: 1px;
  border-radius: 3px;
  border-color: ${ props.warning ? '#ff0000' : '#000000'};
  box-sizing: border-box; 
`);

type StyledButtonProps = {
  width?: string;
  height?: string;
  flexGrow?: number;
}

export const StyledButton = styled.button<StyledButtonProps>((props)=> `
  width: ${props.width ? props.width : 'auto'};
  height: ${props.height ? props.height : '2rem'};
  border: none;
  border-radius: 4px;
  background-color: #87cefa;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  cursor: pointer;
`);

export const ModalBase = styled.div(()=> `
    width: 10cm;
    height: 12cm;
    border-radius: 4px;
    border: none;
    background-color: #fefefe;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; 
    margin: auto;
`);