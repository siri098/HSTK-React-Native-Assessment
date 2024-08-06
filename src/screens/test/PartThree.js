import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import hstkFetch from '../../hstkFetch';

const PartThree = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();

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
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('part-three-detail', { id: item.id })}
    >
      <AntDesign name="filetext1" size={24} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.id}>{item.id}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <AntDesign name="right" size={24} style={styles.chevron} />
    </TouchableOpacity>
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

export default PartThree;
