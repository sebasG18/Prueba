import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import firebaseConfig from '../firebaseConfig';

type Gasto = {
  key: string;
  monto: number;
  categoria: string;
  descripcion: string;
};

const Datos = () => {
  const [lista, setLista] = useState<Gasto[]>([]);

  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getDatabase(firebaseApp);

    const unsubscribe = onValue(ref(db, 'pagos'), (snapshot) => {
      const datos = snapshot.val();

      if (datos) {
        const listaArray: Gasto[] = Object.keys(datos).map((key) => ({
          key,
          ...datos[key],
        }));

        setLista(listaArray);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleItemPress = (categoria: string, descripcion: string) => {
    Alert.alert(
      'Detalles del Registro',
      `Categoría: ${categoria}\nDescripción: ${descripcion}`,
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ]
    );
  };


  const handleDeleteItem = (key: string) => {
    Alert.alert(
      'Eliminar Registro',
      '¿Estás seguro de que quieres eliminar este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            remove(ref(getDatabase(), `pagos/${key}`));
            Alert.alert('Registro Eliminado', 'El registro ha sido eliminado correctamente');
          },
        },
      ]
    );
  };

  return (
    <View>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item.categoria, item.descripcion)}>
            <View>
              <Text>{item.key} | {item.descripcion}</Text>
              <TouchableOpacity onPress={() => handleDeleteItem(item.key)}>
                <Text>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Datos;
