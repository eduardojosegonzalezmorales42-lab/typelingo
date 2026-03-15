import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

// Use 'localhost' for web and '10.0.2.2' for Android emulators.
const API_URL = 'http://localhost:3000/';

export default function App() {
  const [firstSentence, setFirstSentence] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received:', data.title);
        if (data.sentences && data.sentences.length > 0) {
          setFirstSentence(data.sentences[0]);
        } else {
          setError('No sentences returned from API');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error details:', err);
        setError(`Failed to fetch data: ${err.message}. Check if the backend is running at ${API_URL}`);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.content}>
          <Text style={styles.label}>First Sentence:</Text>
          <Text style={styles.sentence}>{firstSentence || 'No sentence found'}</Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sentence: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
