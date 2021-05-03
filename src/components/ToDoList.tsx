/* 他ファイルで定義したコンポーネントや型定義を使えるようにしたり、パッケージを読み込んだりする。 */
/* 他ファイルのコンポーネントは、自分のいるディレクトリからの相対パスで指定する。 */
import React, { useState, useEffect } from 'react';
import { DataType, TasksType, OneDataType, OneTaskType } from './DataType';
import TaskList from './TaskList';
import styled from 'styled-components';
import firebase, { taskRef, pushTask } from '../firebase';
import { useHistory } from 'react-router-dom';


/* Reactコンポーネントの本体。「Hooks」といって、Appという関数がReactコンポーネントとしての役割をはたしている書き方。 */
const ToDoList:React.FC = () =>  {
  /* props(呼び出し元のコンポーネントから受け取ってくる値)はここで定義する */
  // 今回呼び出し側から受け取るデータはない。


  /* state(個のコンポーネントで保持しておく値)は、ここで定義する */
  /* 左側の値が、実際に保持する値。右側の値は、stateを更新するための関数。 */
  const [ newTaskName, setNewTaskName ] = useState("");
  const [ tasks, setTasks] = useState([] as DataType);
  /* useState()の括弧内は、各stateの初期値を入れる。この初期値で、stateのデータ型も確定する。 */


  /* 変数を宣言 */
  /* 変数は、できる限り定数constを使用する。変数を使う場合はletを使う。valは厄介なので使わない方がいい */
  const history = useHistory();

  /* 入力フォームの状態変化に伴い入力内容をstateに反映する関数 */
  const onChangeInput = (value: string) => {
    setNewTaskName(value);
  }

  /* タスクを追加する関数 */
  const addTask = () => {
    if(!newTaskName) return;
    const currentTime = new Date().getTime();
    console.log('current time: ' + currentTime);
    const newTask: OneTaskType = {
      id: currentTime,
      name: newTaskName,
      isDone: false,
      createdAt: currentTime,
      updatedAt: currentTime
    }
    setNewTaskName('');
    pushTask(newTask);
  }

  const deleteTask = (taskId: number) => {
    const targetTask = tasks.find((item) => item.content.id === taskId);
    if(!targetTask) return;
    const targetTaskRef = taskRef.child('/' + targetTask.key);
    if(!targetTaskRef) return;
    targetTaskRef.remove();
  }
  
  const checkTask = (taskId: number) => {
    console.log('button clicked');
    const targetTask = tasks.find((item) => item.content.id === taskId);
    if(!targetTask) return;
    const targetTaskRef = taskRef.child('/' + targetTask.key);
    if(!targetTaskRef) return;
    targetTaskRef.update({
      "isDone": !targetTask.content.isDone,
      "updatedAt": new Date().getTime()
    });
  }

  const onClickLogOut = () => {
    firebase.auth().signOut().then(()=> {
      console.log('successfully logged out');
      history.push('/sign_in');
    })
    .catch((error) => {
      console.log('logout failed')
      alert('ログアウトに失敗しました');
    });
  }

  useEffect(()=> {
    taskRef.on("value", (snapshot) => {
      const tasks = snapshot.val();
      console.log(tasks);
      if(tasks === null) return;
      // どうやらentriesには、オブジェクトのキー値と中身のペアが返ってきているらしい
      const entries = Object.entries(tasks);
      // 間隔
      console.log('mapped data contents: ')
      const gottenData = entries.map((data) => {
        const [ key, task ] = data
        console.log(task);
        return { key: key , content: task}; 
      })
      console.log('mapped array');
      console.log(gottenData);
      setTasks(gottenData as DataType);
    })
  }, []);

  /* 実際に画面に表示される要素は、JSXとしてここに記述する。*/
  return (
    <Parent>
      <div>ようこそ、{firebase.auth().currentUser?.email}さん</div>
      <StyledButton backgroundColor='#d2d2d2' onClick={()=> onClickLogOut()}>ログアウト</StyledButton>
      <FlexBox
        flexDirection='column'
        alignItems='center'>
          <StyledText>ToDoリスト</StyledText>
          {/* inputのReact要素には、定義しなくてもあらかじめ用意されているpropsもある。ここに、HTMLタグで書くような設定値を入れる。 */}
          <FlexBox flexDirection='row' width='auto'>
            <StyledInput
              type='text' 
              value={newTaskName}
              onChange={(e) => onChangeInput(e.target.value)}
              placeholder='タスク名を入力'/>
            <StyledButton
              onClick={addTask}>追加</StyledButton>
          </FlexBox>
          <TaskList tasks={tasks.map((data) => {return data.content})}
                    deleteTask={deleteTask}
                    checkTask={checkTask}/>
      </FlexBox>
    </Parent>
  );
}

export default ToDoList;



/* これより下は、Styled-Componentsで装飾したコンポーネントの定義。これを上のReactコンポーネントで使用する。 */

/* このような記法に従って、素のdivタグ、inputタグなど様々な要素に、CSSのようなな装飾を加える。 */
const Parent = styled.div(()=> `
  width: 500px;
  margin: auto;
`);

const Background = styled.div(()=> `
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #f5f5f5;
`);

const StyledText = styled.div(()=> `
  font-size: 1.5em;
  font-weight: bold;
`);

/* Styled-Componentsでは、呼び出し側のReactコンポーネントから、値を受け取って柔軟に装飾を変えることができるのが特徴。
   その際、受け取る変数の名前とデータ型の一覧を前もって定義し、下のように読み込む。 */
type FlexBoxProps = {
  width?: string;
  height?: string;
  flexDirection?: string;
  alignItems?: string;
}

/* ${}の中には、JSのようなコードを書いて、propsから受け取った値を記述する。 */
export const FlexBox = styled.div<FlexBoxProps>(props => `
  width: ${props.width ? props.width : '100%'};
  height: ${props.height ? props.height  : '100%'};
  display: flex;
  flex-direction: ${props.flexDirection ? props.flexDirection : 'row'};
  align-items: ${props.alignItems ? props.alignItems : 'flex-start'} ;
`);

/* propsの型定義は、用途に応じて適当なものを選ぼう。 */
type StyledInputProps = {
  width?: number;
  height?: number;
}

const StyledInput = styled.input<StyledInputProps>((props)=> `
  width: ${props.width ? props.width + 'px' : '300px'};
  height: ${props.height ? props.height + 'px' : '2em'};
`);

type StyledButtonProps = {
  width?: number;
  height?: number;
  backgroundColor?: string;
}

const StyledButton = styled.button<StyledButtonProps>((props)=> `
  width: ${props.width ? props.width + 'px' : 'auto'};
  height: ${props.height ? props.height + 'px' : '2rem'};
  border: none;
  border-radius: 4px;
  background-color: ${ props.backgroundColor ? props.backgroundColor : '#87cefa'};
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
`);