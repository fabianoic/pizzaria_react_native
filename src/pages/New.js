import React, {Component} from 'react';

import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput, Checkbox} from 'react-native-paper';

// import { Container } from './styles';

export default class New extends Component {
  static navigationOptions = {
    headerTitle: 'Novo Pedido',
  };

  state = {
    mesa: '',
    itemPedido: [],
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Mesa"
          placeholderTextColor="#999"
          value={this.state.mesa}
          onChangeText={mesa => this.setState({mesa})}
        />
        <Checkbox status={false} onPress={() => {}} value="Test" />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="itens do pedido"
          placeholderTextColor="#999"
          value={this.state.itemPedido}
          onChangeText={itens => this.setState({itens})}
        />

        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addButton}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
