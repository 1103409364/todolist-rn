import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import React, {SFC, useState} from 'react';
import {TODOTYPE} from './todoType';

interface FooterProps {
  filterTodo: (type: string) => void;
}

const Footer: SFC<FooterProps> = ({filterTodo}) => {
  const tabData: Array<Tab> = [
    {tabName: '全部', tabId: '0', type: TODOTYPE.ALL},
    {tabName: '未完成', tabId: '1', type: TODOTYPE.ALL},
    {tabName: '已完成', tabId: '2', type: TODOTYPE.ALL},
  ];

  const [activeTab, setActiveTab] = useState('0');

  const handleClick = (tabIndex: string): void => {
    setActiveTab(tabIndex);

    filterTodo(tabIndex);
  };

  return (
    <View style={styles.footerWrap}>
      {tabData.map((item: Tab) => (
        <Text
          key={item.tabId}
          style={activeTab === item.tabId ? styles.active : styles.tab}
          onPress={() => handleClick(item.tabId)}>
          {item.tabName}
        </Text>
      ))}
    </View>
  );
};

export default Footer;
// styles
const styles = StyleSheet.create({
  footerWrap: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 40,
  },
  active: {
    flex: 1,
    lineHeight: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#841584',
  },
});
