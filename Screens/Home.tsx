import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type HomeScreenProps = {
  navigation: any;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Contenido de la pantalla Home</Text>
      <Button
        onPress={() => navigation.navigate('Registro')}
        title="Ir a Registrar"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
