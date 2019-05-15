import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  ScrollView, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  ImageBackground,
} from 'react-native';
import style from './src/style';
//import console = require('console');

export default class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      todos: [], 
      newTodoText: '',
      compltedTodo: false,
      id: 8, 
    };
  }

  componentDidMount() {
    let dummyTodos = [
      {id: 1 , title: 'Wake up from be', done: false}, 
      {id: 2 , title: 'Pray', done: false}, 
      {id: 3 , title: 'Brush your teeth', done: false}, 
      {id: 4 , title: 'Greet bae', done: false}, 
      {id: 5 , title: 'Break fast', done: false}, 
      {id: 6 , title: 'Morning work out', done: false}, 
      {id: 7 , title: 'Momo deposite', done: false}, 
      {id: 8 , title: 'Drop a payload', done: false}, 
      /*
      */
    ];

    this.setState({todos: dummyTodos});
    
    // this.state.todos = dummyTodos // a sin
  }

  addNewTodo() {

    let newTodo = {id: this.state.id, title: this.state.newTodoText, done: false};
    // 1. USING ES6 DESTRUCTURING
    let newId 
    let newTodoList = [...this.state.todos, newTodo];
    this.setState({todos: newTodoList});
    
    // 2. VERY LONG, NOT EFFECIENT AND BORING
    // var newTodoList = []; 
    // let existingTodos = this.state.todos; 
    // for (var i = 0; i < existingTodos.length; i++) {
    //   newTodoList.push(existingTodos[i]);
    // }
    // newTodoList.push(newTodo);
    // this.setState({todos: newTodoList});


    

    /*
    // 3. PUSHING TO THE EXISTING ARRAY AND UPDATING STATE
    let existingTodos = this.state.todos; 
    existingTodos.push(newTodo);
    this.setState({todos: existingTodos, newTodoText: ''});
    */
  }
  deleteTodo(todo) {
    // We assume that each todo has a unique name
    let existingTodos = this.state.todos; 
    let newTodoList = existingTodos.filter((existingTodoItem, key) => {
      if (existingTodoItem.id == todo.id) {

        return false;
      }
      return true; 
    })
    this.setState({todos: newTodoList});
  }

  checkCompletion(todo){
      let existingTodos = this.state.todos;
      let newTodos = existingTodos.map( (activeTodo , key) => {
        if(todo.id == activeTodo.id){
            activeTodo.done = !activeTodo.done;
          }
        return activeTodo;
      })  
    this.setState({ todos : newTodos});

    return {
      
    }
  }

  render() {
    if (this.state.todos.length == 0) {
      return (
        <View style={style.rootRoot}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          style={style.rootContainer}>
          <ImageBackground source={require('./res/lily.jpg')} style={{width: '100%', height: '100%'}}>
          <View style={style.imageWatermark}>
          {/*<Text>Header component</Text>*/}
          {/*<Header />*/}
          <View style={style.headerContainer}>
            <Text style={style.headerText}>My Todo List</Text>
          </View>

          </View>
          </ImageBackground>
        </ScrollView>
        
        <View>
          {/*<Text>New Todo component</Text>*/}
          {/*<NewTodo />*/}
          <View style={style.newTodoContainer}>
            <View style={style.newTodoContainerInputContainer}>
              <TextInput 
                value={this.state.newTodoText}
                onChangeText={(text) => this.setState({newTodoText: text})}
                placeholder="Type a new todo item"
                style={style.newTodoInput} />
            </View>
            <View style={style.newTodoButtonContainer}>
              <TouchableOpacity 
                onPress={ () => this.addNewTodo() }
                onPressIn={ () => this.setState({ id: this.state.id + 1 })}
                style={style.newTodoButtonContainerButton}>
                <Text style={style.newTodoButtonContainerButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
      ); 
    }

    return (
      <View style={style.rootRoot}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          style={style.rootContainer}>
          <ImageBackground source={require('./res/lily.jpg')} style={{width: '100%', height: '100%'}}>
          <View style={style.imageWatermark}>
          {/*<Text>Header component</Text>*/}
          {/*<Header />*/}
          <View style={style.headerContainer}>
            <Text style={style.headerText}>My Todo List</Text>
          </View>

          {/*<Text>Todo list component</Text>*/}
          {/*<TodoList />*/}
            {/*<Text>Todo component</Text>*/}
          <View style={style.todoListContainer}>
            {this.state.todos.map((todo, key) => {
              return (
                <View key={key} style={style.todoItemContainer}>
                  <View style={style.todoItemContentContainer}>
                    <Text style={[ todo.done ? {textDecorationLine: 'line-through'} : {textDecorationLine: 'none'} ]} >{todo.title}</Text>
                      <View> 
                        {/* <Text>{todo.done ? 'Done' : 'Pending'}</Text> */}
                          <TouchableOpacity 
                          onPress={() => this.checkCompletion(todo)}>
                          <Text style={[ todo.done ? { color: 'blue'} : { color: 'red'} ]}>
                             { todo.done ? 'Done' : 'Pending'}          
                         </Text>                      
                          </TouchableOpacity>
                      </View>
                    
                  </View>
                  
                  <View style={style.todoItemButtonContainer}>
                    <TouchableOpacity 
                      onPress={() => this.deleteTodo(todo)}
                      style={style.todoItemDeleteButton}>
                      <Text style={style.todoItemDeleteButtonText} >X</Text>
                    </TouchableOpacity>
                  </View>
              </View>
              )
            })}            
          </View>
          </View>
          </ImageBackground>
        </ScrollView>
        
        <View>
          {/*<Text>New Todo component</Text>*/}
          {/*<NewTodo />*/}
          <View style={style.newTodoContainer}>
            <View style={style.newTodoContainerInputContainer}>
              <TextInput 
                value={this.state.newTodoText}
                onChangeText={(text) => this.setState({newTodoText: text})}
                placeholder="Type a new todo item"
                style={style.newTodoInput} />
            </View>
            <View style={style.newTodoButtonContainer}>
              <TouchableOpacity 
                onPress={ () => this.addNewTodo() }
                onPressIn={ () => this.setState({ id: this.state.id + 1 })}
                style={style.newTodoButtonContainerButton}>
                <Text style={style.newTodoButtonContainerButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
