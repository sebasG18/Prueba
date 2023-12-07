import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, set } from 'firebase/database';
import { db } from '../firebaseConfig'; 


const Registrar = () => {
  const [id, setId] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');


  const handleRegistrarGasto = async () => {
    try {
      await set(ref(db, 'pagos/' + id), {
        monto: monto,
        categoria: categoria,
        descripcion: descripcion,
      });
  
      Alert.alert(
        'Registro Exitoso',
        'El gasto se ha registrado correctamente',
        [
          {
            text: 'OK',
            onPress: () => {
              setId('');
              setMonto('');
              setCategoria('');
              setDescripcion('');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error al registrar el gasto:', error);
      Alert.alert(
        'Error',
        'Hubo un error al registrar el gasto. Por favor, inténtalo de nuevo.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registrar Gasto</Text>
      <TextInput
        style={styles.input}
        placeholder="Id"
        value={id}
        onChangeText={(text) => setId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={monto}
        onChangeText={(text) => setMonto(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={(text) => setCategoria(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripcion"
        value={descripcion}
        onChangeText={(text) => setDescripcion(text)}
      />
      <Button title="Registrar Gasto" onPress={handleRegistrarGasto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: 200,
    padding: 10,
  },
  mensaje: {
    marginTop: 10,
    color: 'green',
  },
});

export default Registrar;
