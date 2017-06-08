import React, { Component } from 'react';
import Style from './Style';
import InputButton from './InputButton';
import {
    Text,
    View,
    AppRegistry
} from 'react-native';


const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, 'CLR','=', '+']
];


class ReactCalculator extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      previousInputValue:0,
      inputValue:0,
      selectedSymbol:null
    };
  }
  _renderInputButtons() {
      let views=[];
      for (var i = 0; i < inputButtons.length; i++) {
          let row = inputButtons[i];
          let inputRow=[];
          for (var j = 0; j < row.length; j++) {
              let input = row[j];

              inputRow.push(
                <InputButton
                value={input}
                key={i+'-'+j}
                onPress={this._onInputButtonPressed.bind(this,input)}
                highlight={this.state.selectedSymbol === input}
                />
              );
            }
          views.push(
            <View style={Style.inputRow} key={"row-"+i}>
              {inputRow}
            </View>
          );
      }
      return views;
  }

  _onInputButtonPressed(input){
    switch (typeof input) {
      case 'number':
          return this._handleNumberInput(input);
      case 'string':
          return this._handleStringInput(input);
    }
  }

  _handleNumberInput(num){
    let inputValue = (this.state.inputValue * 10) +num;
    this.setState({inputValue,inputValue})
  }

  _handleStringInput(str){
    switch (str) {
      case '/':
      this.setState({
        selectedSymbol:str,
        previousInputValue:this.state.inputValue,
        inputValue:0
      });
      break;
      case '*':
      this.setState({
        selectedSymbol:str,
        previousInputValue:this.state.inputValue,
        inputValue:0
      });
      break;
      case '+':
      this.setState({
        selectedSymbol:str,
        previousInputValue:this.state.inputValue,
        inputValue:0
      });
      break;
      case '-':
          this.setState({
            selectedSymbol:str,
            previousInputValue:this.state.inputValue,
            inputValue:0
          });
          break;
      case '=':
        let symbol = this.state.selectedSymbol,
            inputValue = this.state.inputValue,
            previousInputValue = this.state.previousInputValue;

        if (!symbol) {
            return;
        }

        this.setState({
          previousInputValue:0,
          inputValue:eval(previousInputValue + symbol + inputValue),
          selectedSymbol:null
        });
        break;

    case 'CLR':
    this.setState({
      previousInputValue:0,
      inputValue:0,
      selectedSymbol:null
    });
    break;

    }
  }







    render() {
        return (
            <View style={Style.rootContainer}>
              <View style={Style.displayContainer}>
                <Text style={Style.displayText}>{this.state.inputValue}</Text>
              </View>
              <View style={Style.inputContainer}>
                {this._renderInputButtons()}
              </View>
            </View>
        )
    }






}









AppRegistry.registerComponent('Calulator', () => ReactCalculator);
