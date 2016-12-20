##Configurable Form
A configurable form for React Redux applications.

WIP


###How To
First you need to import the configurable form reducer into your app. You must have an immutable store and put the configurable form reducer into the store at the root level under the key configurableForm. Here is a simple example:

*reducer.js*
```javascript
import { combineReducers } from 'redux-immutable'
import { Map } from 'immutable'
import { configurableFormReducer } from 'configurable-form'

const myReducer = (state = new Map(), action) => state

export default combineReducers({
  configurableForm: configurableFormReducer,
  myReducer
})

Nothing is special to use this store with redux and connect it to our application:
*App.js*
```javascript
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import React from 'react'
import reducer from './reducer'
import MyForm from './MyForm'

const store = createStore(reducer)

const App = (props) => {
  return (
    <Provider store={store}>
      <MyForm />
    </Provider>
  )
}

export default App
```

Next you create a view using the Form component and a configuration. This code renders a simple for with a text input, a number input, a text area, and a Yes/No radio button input.

*MyForm.js*
```javascript
import React from 'react'
import { Map } from 'immutable'
import { Form } from 'configurable-form'
import { connect } from 'react-redux'

/* This JSON configuration can be fetched from the server.
   The form creates a grid where the inner arrays are rows and each object represents a column and a component.
*/
const config = [
  [
    { type: 'String', path: ['name'], label: 'Name'},
    { type: 'Number', path: ['age'], label: 'Age'},
  ],
  [
    { type: 'TextArea', path: ['bio'], label: 'Short Bio'},
    { type: 'YesNo', path: ['isMember'], label: 'Membership', question: 'Is this user a member?'}
  ]
]

/* 
This data model will be injected into the store in the configurableForm reducer at the key determined by the form name 
*/
const person = new Map({
  name: '',
  age: null,
  bio: '',
  isMember: null
})

const MyForm = (props) => {
  return (
    <div>
      <h1>Form</h1>
      <Form
        config={config}
        name={'userForm'}
        state={person}
      />
    </div>
  )
}

export default MyForm

```

Here is the API for Form:

config: the form configuration   
name: the namespace for the form data in the store   
state: the initial state for the data in the store at the key defined by "name"
