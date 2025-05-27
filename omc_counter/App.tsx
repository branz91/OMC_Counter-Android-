import React, { useEffect, useState } from 'react';
import { Platform, Text, View, StyleSheet, TextInput, Keyboard, Image, ScrollView, KeyboardAvoidingView } from 'react-native';


import KeyEvent from 'react-native-keyevent';
import OmImage from './assets/om_chanting_transparent.png';

type KeyEventPayload = {
  keyCode: number;
  action: string;
};

export default function App() {
  const [counter, setCounter] = useState(0);
  const [initialValue, setInitialValue] = useState('0');

  useEffect(() => {
    if (Platform.OS === 'android') {
      KeyEvent.onKeyDownListener((keyEvent: KeyEventPayload) => {
        if (keyEvent.keyCode === 24) {
          setCounter((prev) => prev + 1);
        } else if (keyEvent.keyCode === 25) {
          setCounter((prev) => Math.max(prev - 1, 0));
        }
      });

      return () => {
        KeyEvent.removeKeyDownListener();
      };
    }
  }, []);

  const handleSetInitialValue = () => {
    const parsed = parseInt(initialValue);
    if (!isNaN(parsed) && parsed >= 0) {
      setCounter(parsed);
      Keyboard.dismiss();
    }
  };

  const quotient = Math.floor(counter / 3);
  const remainder = counter % 3;

  let extraText = '';
  if (remainder === 1) {
    extraText = 'The Organizer will remain in the External Circle for all the practice.';
  } else if (remainder === 2) {
    extraText = 'The Organizer will ask a participant with the "Number One" to stay in the Internal Circle for two rounds (Rounds 2 and 3)';
  }

  const internalCircle = quotient + Math.floor(remainder / 2);
  const externalCircle = quotient * 2 + Math.ceil(remainder / 2);

  return (
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
>
  <ScrollView
    contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled"
  >
    {/* 🔼 BLOCCO SUPERIORE */}
   <View style={{ alignItems: 'center' }}>
  <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.titlePrimary}>Om Chanting</Text>
          <Image source={OmImage} style={styles.titleImage} resizeMode="contain" />
        </View>
        <Text style={styles.titleSecondary}>Counter</Text>
      </View>

      <View style={styles.circleContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle} />
        </View>
        <Text style={styles.externalText}>{externalCircle}</Text>
        <Text style={styles.internalText}>{internalCircle}</Text>
      </View>

      <Text style={styles.counter}>{counter}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInitialValue}
        keyboardType="numeric"
        placeholder="Enter starting value"
        placeholderTextColor="#888"
        onSubmitEditing={handleSetInitialValue}
        returnKeyType="done"
      />

      <Text style={styles.instructions}>
        Use volume buttons to change the number of participants, or type the number above.
      </Text>

    </View>

    {/* 🔽 BLOCCO INFERIORE */}
    <View>
      
      <View style={styles.card}>
        <Text style={styles.resultTitle}>Calculation Result</Text>
        <Text style={styles.resultText}>Internal Circle: {internalCircle}</Text>
        <Text style={styles.resultText}>External Circle: {externalCircle}</Text>
        {extraText !== '' && <Text style={styles.extraText}>{extraText}</Text>}
      </View>
    </View>
  </ScrollView>
</KeyboardAvoidingView>

);




}

const styles = StyleSheet.create({
container: {
  flexGrow: 1, // consente lo scrolling completo
  padding: 24,
  paddingTop: 60,
  paddingBottom: 100, // spazio sufficiente per vedere la card
  backgroundColor: '#0d0d0d',
},

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00ffcc',
    marginBottom: 10,
  },
  counter: {
    marginTop: 20,
    fontSize: 50,
    color: '#ffffff',
        textAlign: 'center',

    marginVertical: 20,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
    width: '80%',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:100,
  },
  instructions: {
    fontSize: 16,
    color: '#bbbbbb',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00ffcc',
    marginBottom: 12,
  },
  resultText: {
    fontSize: 18,
    color: '#ffffff',
    marginVertical: 4,
    textAlign: 'center',
  },
  extraText: {
    fontSize: 16,
    color: '#ffa500',
    marginTop: 12,
    textAlign: 'center',
  },
  externalText: {
  color: '#00ccff',
  fontSize: 18,
  fontWeight: '600',
  marginTop: -245, // Posizionato sopra il cerchio grande
  marginBottom: 200,
},
internalText: {
  color: '#00ffcc',
  fontSize: 18,
  fontWeight: '600',
  marginTop: -175,
},
circleContainer: {
  marginTop: 30,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
},

outerCircle: {
  width: 220,
  height: 220,
  borderRadius: 110,
  backgroundColor: '#222',
  borderColor: '#00ccff',
  borderWidth: 4,
  alignItems: 'center',
  justifyContent: 'center',
},

innerCircle: {
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: '#333',
  borderColor: '#00ffcc',
  borderWidth: 4,
},

circleOverlay: {
  position: 'absolute',
  top: 110 - 50, // half of outerCircle height - half of image
  left: 110 - 50, // same logic (center alignment)
  width: 100,
  height: 100,
  zIndex: 2,
},

omImage: {
  width: '100%',
  height: '100%',
},
titleContainer: {
  alignItems: 'center',
  marginBottom: 10,
},
titlePrimary: {
  fontSize: 36,
  fontWeight: 'bold',
  color: '#00ffcc',
  alignSelf: 'flex-start',
  marginTop: 0,
},

titleSecondary: {
  marginTop: -50,
  alignSelf: 'flex-start',
  fontSize: 32,
  color: '#00ccff', // Colore secondario
},
titleRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10, // se supportato, altrimenti usa margin
},

titleImage: {
  width: 100,
  height: 100,
  marginLeft: 8,
  marginTop:0,
},

});
