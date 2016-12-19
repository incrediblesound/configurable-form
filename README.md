##Configurable Form
A configurable form for React Redux applications.

WIP


###How To
First you need to import the configurable form reducer into your app. I'll use a simple example where the configurable form reducer is the only reducer.

*reducer.js*
```javascript
import { configurableFormReducer } from 'configurable-form'

export default configurableFormReducer
```
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

/* This simple JSON configuration can be fetched from the server.
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

// This data model will be injected into the store at store.formName
const person = new Map({
  name: '',
  age: null,
  bio: '',
  isMember: null
})

const Form = (props) => {
  return (
    <div>
      <h1>Form</h1>
      <Form
        rootState={props.state}
        config={config}
        name={'userForm'}
        state={person}
        dispatch={props.dispatch}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(Home)

```

The API for the form component is not very clean, it is still a work in progress:

rootState: the configurableForm reducer   
config: the form configuration   
name: the namespace for the form data in the store   
state: the initial state for the data in the store at the key defined by "name"
dispatch: the redux dispatch function
