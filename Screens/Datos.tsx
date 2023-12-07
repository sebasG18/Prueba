import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
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
              <Text>${item.monto}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Datos;
