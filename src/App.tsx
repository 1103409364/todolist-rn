import React, {SFC, useState, useEffect} from 'react';
import {StyleSheet, Button, Text, View, StatusBar} from 'react-native';
import Header from './components/Header';
import TodoBody from './components/TodoBody';
import Footer from './components/Footer';
import {TODOTYPE} from './components/todoType';
import DeviceStorage from './utils/storage';

const App: SFC = () => {
  let initial: Array<TodoItem> = [];
  const [todoList, setTodoList] = useState(initial);
  const [todoType, setType] = useState(TODOTYPE.ALL);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 默认返回一个空数组
    DeviceStorage.get('todolist').then(res => {
      let todolist = res;
      setTodoList(todolist);
    });
  }, []);

  useEffect(() => {
    DeviceStorage.save('todolist', todoList);
  }, [todoList]); // 只在todolist发生变化时执行

  const handleAddClick = (
    todoitem: TodoItem,
  ): void => {
    // console.log(todoitem);

    let newList: Array<TodoItem> = [todoitem, ...todoList];
    setCount(count + 1);
    setTodoList(newList);
  };

  const handleDelTodo = (itemId: number): void => {
    let newList: Array<TodoItem> = todoList.filter(
      (item: TodoItem): boolean => item.id !== itemId,
    );
    setTodoList(newList);
  };

  const toggleComplete = (itemId: number): void => {
    // console.log(itemId);

    let newList: Array<TodoItem> = todoList.map(
      (item: TodoItem): TodoItem => {
        if (item.id === itemId) {
          item.complete = !item.complete;
        }
        return item;
      },
    );
    setTodoList(newList);
  };

  const toggleSticky = (itemId: number): void => {
    let newList: Array<TodoItem> = todoList.map(
      (item: TodoItem): TodoItem => {
        if (item.id === itemId) {
          item.isTop = !item.isTop;
        }
        return item;
      },
    );
    setTodoList(newList);
  };

  const filterTodo = (type: string): void => {
    setType(type);
  };

  return (
    <View style={styles.app}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <Header handleAddClick={handleAddClick}></Header>
      </View>
      <View style={styles.body}>
        <TodoBody
          todoType={todoType}
          list={todoList}
          handleDelTodo={handleDelTodo}
          toggleComplete={toggleComplete}
          toggleSticky={toggleSticky}
        />
      </View>
      <View>
        <Footer filterTodo={filterTodo} />
      </View>
    </View>
  );
};
export default App;
// styles
const styles = StyleSheet.create({
  app: {
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    minHeight: '70%', //防止底栏被输入法顶上去
  },
  footer: {
    backgroundColor: '#fff',
  },
});
