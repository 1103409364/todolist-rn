import React, {SFC, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {timeFilter} from '../utils/filter';

interface ItemProps {
  todoItem: TodoItem;
  handleDelTodo(itemId: number): void;
  toggleComplete(itemId: number): void;
  toggleSticky(itemId: number): void;
}

// React.FunctionComponent为对icon组件的类型测试，后面是传入的值的类型
const Todo: SFC<ItemProps> = ({
  todoItem,
  handleDelTodo,
  toggleComplete,
  toggleSticky,
}) => {
  // Buttons 滑动按钮配置
  const swipeoutBtns = [
    {
      backgroundColor: '#a7a7a7',
      color: 'white',
      text: todoItem.isTop ? '取消置顶' : '置顶',
      onPress: () => toggleSticky(todoItem.id),
    },
    {
      backgroundColor: '#337ab7',
      color: 'white',
      text: todoItem.complete ? '撤销' : '完成',
      onPress: () => toggleComplete(todoItem.id),
    },
    {
      backgroundColor: 'red',
      color: 'white',
      text: '删除',
      onPress: () => handleDelTodo(todoItem.id),
    },
  ];

  return (
    <Swipeout style={styles.wrap} right={swipeoutBtns} autoClose={true}>
      <View
        style={[
          styles.todoItem,
          todoItem.complete ? styles.todoComplete : null,
          todoItem.isTop ? styles.top : null,
        ]}>
        <Text style={styles.time}>{timeFilter(todoItem.id)}</Text>
        <Text
          style={[
            styles.content,
            todoItem.complete ? styles.contentComplete : null,
          ]}>
          {todoItem.content}
        </Text>
      </View>
    </Swipeout>
  );
};

export default Todo;
// styles
const styles = StyleSheet.create({
  wrap: {
    marginBottom: 5,
  },
  todoItem: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 10,
    backgroundColor: '#fff7d1',
    borderLeftColor: '#337ab7',
    borderLeftWidth: 4,
    fontSize: 14,
  },
  todoComplete: {
    backgroundColor: '#eee',
    borderLeftColor: '#337ab7',
  },
  top: {
    borderLeftColor: 'red',
  },
  time: {
    fontSize: 12,
    color: '#888585',
  },
  content: {
    lineHeight: 25,
  },
  contentComplete: {
    color: '#888585',
    textDecorationLine: 'line-through',
  },
  // headerWrap: {
  //   paddingLeft: 10,
  //   paddingRight: 10,
  // },
  // appTitle: {
  //   textAlign: 'center',
  //   fontSize: 40,
  //   lineHeight: 80,
  //   color: '#841584',
  // },
  // inputWrap: {
  //   flexDirection: 'row',
  //   width: '100%',
  // },
  // input: {
  //   marginRight: 10,
  //   paddingLeft: 10,
  //   height: 40,
  //   width: 200,
  //   borderColor: '#841584',
  //   borderWidth: 1,
  //   flex: 1,
  // },
  // tips: {
  //   color: 'red',
  // },
  // button: {
  //   width: 40,
  //   paddingVertical: 0,
  //   color: '#841584',
  //   textAlignVertical: 'center',
  // },
});
