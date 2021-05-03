import React from 'react';
import {TasksType } from './DataType';
import styled from 'styled-components';

/* 呼び出し側のコンポーネントから受け取るpropsのデータ型をここで定義しておく。関数を受け取ることも可能 */
type TaskListAreaProps = {
    tasks: TasksType;
    deleteTask: (taskId: number) => void;
    checkTask: (taskId: number) => void;
}

/* Reactコンポーネントの本体では、上で定義したデータ型を<>内で指定して使えるようにする。 */
/* また、Reactコンポーネントは以下のようにアロー関数の形で記述して、引数にpropsと置くと、そのpropsに呼び出し側からの値が入ってくる。 */
const TaskListArea: React.FC<TaskListAreaProps> = (props) => {
    /* props(呼び出し元のコンポーネントから受け取ってくる値)はここで定義する */
    /* 下のように、上で定義した型定義に合わせて、受け取るpropsを記述する。複数個の場合はコンマ区切りで上から順に記述する。 */
    /* すると、propsから各変数に値が入るようになっている。 */
    const { tasks, deleteTask, checkTask } = props;
    return (
        <Parent>
            {
                tasks.map((task, index)=> {
                    return <FlexBox key={task.id}
                                    justifyContent='space-between'
                                    flexDirection='row'
                                    alignItems='center'
                                    marginTop={10}
                                    opacity={task.isDone ? 0.5 : 1.0}>
                                <StyledButton backgroundColor='transparent'
                                    onClick={()=> checkTask(task.id)}>
                                    {task.isDone ? '☒' : '☐'}
                                </StyledButton>
                                <StyledDiv  flexGrow={2}
                                            isLigneThrough={task.isDone}>
                                    {task.name}
                                </StyledDiv>
                                <StyledButton   onClick={() => {deleteTask(task.id)}}
                                                backgroundColor='#ff4500'
                                                fontColor='#fefefe'
                                                fontWeight='bold'>削除</StyledButton>
                            </FlexBox>
                })
            }
        </Parent>
    )
}

export default TaskListArea;

/* 個々より下の部分でStyled-Componentsを定義する */
const Parent = styled.div((props) => `
    width: 100%;
`);

/* ちなみに、propsには基本的にundefinedや渡されるpropsの過不足が許容されないが、
   下のように?をつければ、その値がundefinedでもよいことになる。
   場合によって値を受け取らないことがあるときには、?をつけるとよい。*/
type FlexBoxProps = {
    width?: number;
    height?: number;
    flexDirection?: string;
    alignItems?: string;
    justifyContent?: string;
    marginTop?: number;
    marginBottom?: number;
    opacity?: number;
}

/* 値を受け取らないことがあるpropsについては、その値が空であった時の場合分けを行う。 */
const FlexBox = styled.div<FlexBoxProps>(props => `
    width: ${props.width ? props.width + 'px' : '100%'};
    height: ${props.height ? props.height + 'px' : '100%'};
    display: flex;
    flex-direction: ${props.flexDirection ? props.flexDirection : 'row'};
    align-items: ${props.alignItems ? props.alignItems : 'flex-start'} ;
    background-color: #fefefe;
    justify-content: ${props.justifyContent ? props.justifyContent : 'flex-start'};
    margin-top: ${props.marginTop ? props.marginTop + 'px' : '0px'};
    margin-bottom: ${props.marginBottom ? props.marginBottom + 'px' : '0px'};
    border-radius: 4px;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
    opacity: ${props.opacity ? props.opacity : '1.0'};
`);

type StyledDivProps = {
    size?: number;
    flexGrow?: number;
    isLigneThrough?: boolean
}

const StyledDiv = styled.div<StyledDivProps>((props)=> `
    size: ${props.size ? props.size + 'px' : '1.5em'};
    flex-grow: ${props.flexGrow ? props.flexGrow : '0'};
    text-decoration: ${props.isLigneThrough ? 'line-through' : 'none'};
`);

type StyledButtonProps = {
    width?: number;
    height?: number;
    flexGrow?: number;
    backgroundColor?: string;
    fontColor?: string;
    fontWeight?: string;
  }
  
  const StyledButton = styled.button<StyledButtonProps>((props)=> `
    width: ${props.width ? props.width + 'px' : '50px'};
    height: ${props.height ? props.height + 'px' : '50px'};
    flex-grow: ${props.flexGrow ? props.flexGrow : '0'};
    border: none;
    border-radius: 4px;
    background-color: ${props.backgroundColor ? props.backgroundColor : '#d2d2d2'};
    color: ${props.fontColor ? props.fontColor : '#000000'};
    font-weight: ${props.fontWeight ? props.fontWeight : 'none'};
  `);