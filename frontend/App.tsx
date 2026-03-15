import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const API_URL = 'http://localhost:3000/';

export default function App() {
  const [sentences, setSentences] = useState<string[]>([]);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [count, setCount] = useState(0);

  const currentSentence = sentences[sentenceIndex] || "";
  const sentenceLength = currentSentence.length;

  useEffect(() => {
    // Fetch sentences once on mount
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setSentences(data.sentences || []))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    const handleKeyDown = () => {
      setCount((prevCount) => {
        const nextCount = prevCount + 1;
        if (nextCount >= sentenceLength && sentenceLength > 0) {
          setSentenceIndex((prevIdx) => prevIdx + 1);
          return 0;
        }
        return nextCount;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sentenceLength]);

  const letters = currentSentence.split('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sentence: {sentenceIndex + 1} | Letter: {count}/{sentenceLength}</Text>
      <View style={styles.sentenceContainer}>
        {letters.length > 0 ? (
          letters.map((char, index) => (
            <Text 
              key={index} 
              style={[
                styles.letter,
                index < count && styles.typedLetter,
                index === count && styles.activeLetter
              ]}
            >
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
    color: '#ccc',
  },
  typedLetter: {
    color: '#000',
  },
  activeLetter: {
    textDecorationLine: 'underline',
    color: '#007AFF',
  },
});
