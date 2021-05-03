
/* TypeScriptの大きな特徴は、扱うデータ型を意識してコーディングすること。
　　Todoリストで使うオブジェクトの構成も以下のように定義する必要がある。（C言語の構造体に似ているかも） */

/* ちなみに、命名規則としては、

　　・Reactコンポーネント名
　　・Styled-Componentsで定義したコンポーネント名
　　・自分で定義した型定義の名前
　　は「アッパーキャメルケース」

　　・コンポーネント内で使う変数
　　・state名、props名
　　・各型定義内での変数名
　　は「ローワーキャメルケース」を使用して欲しい。 */

/* Todoのリストのデータ型。今回は、タスク1個分のオブジェクトであるOneTaskType型のオブジェクトからなる配列。 
   ○○[] とすると、○○オブジェクトの配列であることを示す*/
export type TasksType = OneTaskType[];

export type DataType = OneDataType[];

export type OneDataType = {
    key: string;
    content: OneTaskType;
}

/* Todoリスト内のタスク1個分のデータ型を定義。 */
export type OneTaskType = {
    id: number;
    name: string;
    isDone: boolean;
    createdAt: number;
    updatedAt: number;
}

/* 他ファイルで使うファイルは、定義時にexportを付与すること。使用先のファイルでimportを用いて使うようにできる。 */