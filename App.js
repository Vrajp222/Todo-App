import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For delete icon

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  // Function to add a new task to the list
  const addTask = () => {
    if (taskTitle) {
      setTasks([...tasks, { title: taskTitle, status: 'due' }]);
      setTaskTitle('');
    }
  };

  // Function to toggle task status between 'due' and 'done' 
  const toggleStatus = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, status: task.status === 'due' ? 'done' : 'due' } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task in the list
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>ToDo</Text>

      {/* Input field for task title */}
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />

      {/* Button to add task, disabled if the title is empty */}
      <Button title="Add Task" onPress={addTask} disabled={!taskTitle} />

      {/* List of tasks */}
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <View style={styles.taskActions}>
              <Switch
                value={item.status === 'done'}
                onValueChange={() => toggleStatus(index)}
              />
            <TouchableOpacity onPress={() => deleteTask(index)}>
                <FontAwesome name="trash" size={24} color="red" style={styles.deleteIcon} />
              </TouchableOpacity>
          </View>
          </View>
        )}
      />
    </View>
  );
};


//Styling for the App

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 40,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop:10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    marginLeft:20,
  },
});

export default ToDoApp;
