import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const API_URL = 'http://localhost:3000/';

export default function App() {
  const [sentences, setSentences] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fetch sentences once on mount
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setSentences(data.sentences || []))
      .catch((err) => console.error("Fetch error:", err));

    // Simple key listener
    const handleKeyDown = () => setCount((c) => c + 1);
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentSentence = sentences[count] || "";
  const letters = currentSentence.split('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sentence Index: {count}</Text>
      <View style={styles.sentenceContainer}>
        {letters.length > 0 ? (
          letters.map((char, index) => (
            <Text key={index} style={styles.letter}>
              {char}
            </Text>
          ))
        ) : (
          <Text>Loading sentences...</Text>
        )}
      </View>
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 24,
    fontFamily: 'monospace',
  },
});
