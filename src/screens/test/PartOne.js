import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import localPlaceholderData from '../../localPlaceholderData';

const PartOne = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <AntDesign name="filetext1" size={24} />
      <View style={styles.textContainer}>
        <Text style={styles.id}>{item.id}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <AntDesign name='right' size={24} style={styles.chevron} />
    </View>
  );

  return (
    <FlatList
      data={localPlaceholderData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    maxWidth: '50%',
  },
  id: {
    fontWeight: 'bold',
  },
  title: {
    color: 'gray',
  },
  chevron: {
    marginLeft: 'auto',
  },
});

export default PartOne;
