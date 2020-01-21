import React, {SFC} from 'react';
import Todo from './Todo';
import {TODOTYPE} from './todoType';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

interface BodyProps {
  list: Array<TodoItem>;
  todoType: string;
  handleDelTodo(itemId: number): void;
  toggleComplete(itemId: number): void;
  toggleSticky(itemId: number): void;
}

const TodoBody: SFC<BodyProps> = ({
  list,
  todoType,
  handleDelTodo,
  toggleComplete,
  toggleSticky,
  ...restProps
}) => {
  return (
    <ScrollView style={styles.todoBody}>
      <View>
        {list
          .filter(item => item.isTop)
          .map((item: TodoItem) => (
            <Todo
              key={item.id}
              todoItem={item}
              handleDelTodo={handleDelTodo}
              toggleComplete={toggleComplete}
              toggleSticky={toggleSticky}
            />
          ))}
      </View>
      <View>
        {list
          .filter(item => !item.isTop)
          .filter(item => {
            if (todoType === TODOTYPE.UNDONE) {
              return !item.complete;
            }
            if (todoType === TODOTYPE.DONE) {
              return item.complete;
            }
            return item;
          })
          .map((item: TodoItem) => (
            <Todo
              key={item.id}
              todoItem={item}
              handleDelTodo={handleDelTodo}
              toggleComplete={toggleComplete}
              toggleSticky={toggleSticky}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default TodoBody;
// styles
const styles = StyleSheet.create({
  todoBody: {
    marginLeft: 10,
    marginRight: 10,
  },
});
