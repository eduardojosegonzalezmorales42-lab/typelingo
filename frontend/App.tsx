import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const API_URL = 'http://localhost:3000/';

export default function App() {
  const [sentences, setSentences] = useState<string[]>([]);
  const [germanSentences, setGermanSentences] = useState<string[]>([]);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [count, setCount] = useState(0);

  const currentSentence = germanSentences[sentenceIndex] || "";
  const currentEnglishSentence = sentences[sentenceIndex] || "";
  const sentenceLength = currentSentence.length;

  useEffect(() => {
    // Fetch both and then filter/sync
    Promise.all([
      fetch(API_URL).then(res => res.json()),
      fetch(API_URL + 'german').then(res => res.json())
    ]).then(([enData, deData]) => {
      const enSentences = enData.sentences || [];
      const deSentences = deData.deSentences || deData.sentences || [];

      // Filter based on English sentence length (threshold: 40 characters)
      const filteredEn: string[] = [];
      const filteredDe: string[] = [];

      enSentences.forEach((s: string, i: number) => {
        if (s.length >= 40) {
          filteredEn.push(s);
          if (deSentences[i]) {
            filteredDe.push(deSentences[i]);
          }
        }
      });

      setSentences(filteredEn);
      setGermanSentences(filteredDe);
    }).catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default actions for keys that disrupt the typing experience
      if (event.key === ' ' || event.key === 'Tab') {
        event.preventDefault();
      }

      // Ignore modifier keys and other special keys that don't produce a character
      if (
        event.key.length !== 1 || 
        event.ctrlKey || 
        event.altKey || 
        event.metaKey
      ) {
        return;
      }

      setCount((prevCount) => {
        const expectedChar = currentSentence[prevCount];
        
        // Check if the pressed key matches the expected character
        if (event.key === expectedChar) {
          const nextCount = prevCount + 1;
          if (nextCount >= sentenceLength && sentenceLength > 0) {
            setSentenceIndex((prevIdx) => prevIdx + 1);
            return 0;
          }
          return nextCount;
        }
        
        return prevCount; // No progress if key doesn't match
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sentenceLength, currentSentence]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sentence: {sentenceIndex + 1}</Text>
      <View style={styles.sentenceContainer}>
        {currentSentence ? (
          <Text style={styles.letter}>
            <Text style={styles.typedLetter}>
              {currentSentence.slice(0, count)}
            </Text>
            <Text style={styles.activeLetter}>
              {currentSentence[count]}
            </Text>
            {currentSentence.slice(count + 1)}
          </Text>
        ) : (
          <Text>Loading sentences...</Text>
        )}
      </View>
      {currentEnglishSentence ? (
        <Text style={styles.germanSentence}>{currentEnglishSentence}</Text>
      ) : null}
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
    justifyContent: 'center',
    marginBottom: 20,
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
  germanSentence: {
    fontSize: 20,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});
