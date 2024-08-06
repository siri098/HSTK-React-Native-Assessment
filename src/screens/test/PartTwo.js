import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import hstkFetch from '../../hstkFetch';

const PartTwo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await hstkFetch('https://jsonplaceholder.typicode.com/posts');
      const json = await response.json();
      setData(json);
      setFilteredData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => 
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchText, data]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <AntDesign name="filetext1" size={24} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.id}>{item.id}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <AntDesign name="right" size={24} style={styles.chevron} />
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchInput}
        placeholder="Search by title..."
        value={searchText}
        onChangeText={setSearchText}
      />
      {filteredData.length === 0 ? (
        <Text>No Results</Text>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    margin: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  icon: {
    marginRight: 10,
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

export default PartTwo;
