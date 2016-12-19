import React, { Component } from 'react'
import { Map } from 'immutable'
import { Container, Col, Row } from 'react-grid-system'
import * as coreComponents from '../components'
import { SET_STATE, SET_PROPERTY } from '../common/constants'
import { connect } from 'react-redux'

/*
rootstate: the configurable-form reducer
state: the initial state for this form
config: the config for this form
dispatch: redux dispatch function
name: the name of this form
lib: optional map of user defined components
*/

const Form = ({ rootState, state, config, dispatch, name, lib={} }) => {
  if(!rootState || !rootState.get(name)) {
    dispatch({ type: SET_STATE, payload: { name, state }})
    return <nosript />
  }
  const savedState = rootState.get(name)
  const components = Object.assign({}, coreComponents, lib)
  return (
    <div>
      {renderComponents(savedState, config, components, updateValue(name, dispatch))}
    </div>
  )
}

const renderComponents = (state, config, components, updateValue) => {
  return (
    <Container>
      {renderRows(state, config, components, updateValue)}
    </Container>
  )
}

const renderRows = (state, config, components, updateValue) => {
  return (
    config.map(section => {
      return (
        <Row>
          {section.map(renderCols(state, components, updateValue, section.length))}
        </Row>
      )
    })
  )
}

const renderCols = (state, components, updateValue, sectionSize) => (inputConfig) => {
  const Component = components[inputConfig.type]
  return (
    <Col md={Math.floor(12/sectionSize)}>
      <Component  config={inputConfig} state={state} update={updateValue}/>
    </Col>
  )
}

const updateValue = (name, dispatch) => (path, value) => {
  const updatePath = path.slice()
  updatePath.unshift(name)
  dispatch({
    type: SET_PROPERTY,
    payload: {
      path: updatePath,
      value
    }
  })
}


export default Form
