import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import hstkFetch from '../../hstkFetch';

const PartThreeDetail = ({ route }) => {
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [hiddenComments, setHiddenComments] = useState(new Set());

  useEffect(() => {
    const fetchPost = async () => {
      const response = await hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const json = await response.json();
      setPost(json);
    };
    const fetchComments = async () => {
      const response = await hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      const json = await response.json();
      setComments(json);
    };
    fetchPost();
    fetchComments();

    loadHiddenComments();
  }, [id]);

  const loadHiddenComments = async () => {
    try {
      const hiddenCommentsJSON = await AsyncStorage.getItem(`hiddenComments-${id}`);
      if (hiddenCommentsJSON) {
        setHiddenComments(new Set(JSON.parse(hiddenCommentsJSON)));
      }
    } catch (error) {
      console.error('Failed to load hidden comments:', error);
    }
  };

  const saveHiddenComments = async (updatedHiddenComments) => {
    try {
      await AsyncStorage.setItem(`hiddenComments-${id}`, JSON.stringify([...updatedHiddenComments]));
    } catch (error) {
      console.error('Failed to save hidden comments:', error);
    }
  };

  const hideComment = (commentId) => {
    const updatedHiddenComments = new Set(hiddenComments);
    updatedHiddenComments.add(commentId);
    setHiddenComments(updatedHiddenComments);
    saveHiddenComments(updatedHiddenComments);
  };

  if (!post) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <FlatList
        data={comments.filter(comment => !hiddenComments.has(comment.id))}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Button title="Hide" onPress={() => hideComment(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    marginVertical: 10,
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  email: {
    fontWeight: 'bold',
  },
  body: {
    marginVertical: 5,
  },
});

export default PartThreeDetail;
