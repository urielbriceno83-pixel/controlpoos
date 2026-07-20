import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

export default function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // IMPORTANTE: Cambia "192.168.X.X" por la IP local de tu computadora (IPv4)
    // Localhost no funciona en el celular porque busca el servidor dentro del propio teléfono.
    fetch('http://192.168.1.100:3000/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error("Error conectando a la API:", error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🛒 Abarrotes Plus</Text>
      </View>
      
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>${item.precio.toFixed(2)} MXN</Text>
            <Text style={styles.stock}>Stock: {item.stock}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f9' },
  header: { backgroundColor: '#2c3e50', padding: 20, paddingTop: 50, alignItems: 'center' },
  headerText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  card: { backgroundColor: 'white', padding: 20, margin: 15, borderRadius: 10, elevation: 3, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1 },
  nombre: { fontSize: 18, fontWeight: 'bold' },
  precio: { color: '#27ae60', fontSize: 18, marginVertical: 5, fontWeight: 'bold' },
  stock: { color: '#7f8c8d' }
});