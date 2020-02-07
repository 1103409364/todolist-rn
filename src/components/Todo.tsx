import React, {SFC, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {timeFilter} from '../utils/filter';

interface ItemProps {
  todoItem: TodoItem;
  handleDelTodo(itemId: number): void;
  handleEditTodo(item: object): void;
  toggleComplete(itemId: number): void;
  toggleSticky(itemId: number): void;
}

// React.FunctionComponent为对icon组件的类型测试，后面是传入的值的类型
const Todo: SFC<ItemProps> = ({
  todoItem,
  handleDelTodo,
  handleEditTodo,
  toggleComplete,
  toggleSticky,
}) => {
  const [isEdit, setEdit] = useState(false);
  const [editItem, setEditTodo] = useState({id: 0, content: ''});
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

  const handLongPress = (item: TodoItem): void => {
    // console.log(item);
    setEditTodo({
      id: item.id,
      content: item.content,
      // 修改时间 Date.now()
    });
    setEdit(true);
  };

  const handleChange = (text: string): void => {
    setEditTodo({
      id: editItem.id,
      content: text,
    });
  };

  const handleBlur = (): void => {
    setEdit(false);
    handleEditTodo(editItem);
  };

  return (
    <Swipeout style={styles.wrap} right={swipeoutBtns} autoClose={true}>
      <View
        style={[
          styles.todoItem,
          todoItem.complete ? styles.todoComplete : null,
          todoItem.isTop ? styles.top : null,
          isEdit ? styles.edit : null,
        ]}>
        <Text style={styles.time}>{timeFilter(todoItem.id)}</Text>
        {isEdit ? (
          <TextInput
            multiline={true}
            editable={isEdit}
            value={editItem.content}
            autoFocus={true}
            onChangeText={text => handleChange(text)}
            onBlur={handleBlur}
            style={[
              styles.input,
              todoItem.complete ? styles.contentComplete : null,
            ]}
          />
        ) : (
          <Text
            onPress={() => handLongPress(todoItem)} //长按编辑
            style={[
              styles.content,
              todoItem.complete ? styles.contentComplete : null,
            ]}>
            {todoItem.content}
          </Text>
        )}
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
  edit: {
    backgroundColor: '#fff',
    borderColor: '#841584',
    borderWidth: 1,
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
    paddingTop: 10,
    paddingBottom: 10,
    lineHeight: 25,
    color: '#333',
  },
  contentComplete: {
    color: '#888585',
    textDecorationLine: 'line-through',
  },
});
