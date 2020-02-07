import React, {SFC, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface HeaderProps {
  handleAddClick(todoItem: object): void;
}

const Header: SFC<HeaderProps> = ({handleAddClick, ...restProps}) => {
  let initItem: TodoItem = {
    id: 0,
    content: '',
    complete: false,
  };
  // const [value, onChangeText] = useState('');
  const [todoItem, setTodo] = useState(initItem);
  const [tips, setTips] = useState('');
  const handleChange = (text: string): void => {
    let item: TodoItem = {
      id: Date.now(),
      content: text,
      complete: false,
      isTop: false,
    };
    setTips('');
    setTodo(item);
  };

  const addTodoItem = (): void => {
    if (todoItem.content === '') {
      setTips('输入内容为空！');
      return;
    }
    handleAddClick(todoItem);
    setTodo(initItem);
  };

  return (
    <View style={styles.headerWrap}>
      <Text style={styles.appTitle}>TodoList</Text>
      <View style={styles.inputWrap}>
        <TextInput
          multiline={true}
          placeholder="请输入"
          style={styles.input}
          onChangeText={text => handleChange(text)}
          value={todoItem.content}
        />
        <TouchableOpacity onPress={addTodoItem} activeOpacity={0.7}>
          <Text style={styles.btnTxt}>+</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.tips}>{tips}</Text>
      </View>
    </View>
  );
};
export default Header;
// styles
const styles = StyleSheet.create({
  headerWrap: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 80,
    color: '#841584',
  },
  inputWrap: {
    flexDirection: 'row',
    // flex: 1,
  },
  input: {
    marginRight: 10,
    paddingLeft: 10,
    height: 40,
    borderColor: '#841584',
    borderWidth: 1,
    flex: 1,
  },
  tips: {
    color: 'red',
  },
  btnTxt: {
    color: '#fff',
    backgroundColor: '#841584',
    width: 40,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
