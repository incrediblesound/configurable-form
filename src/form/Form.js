import React, { Component } from 'react'
import { Map } from 'immutable'
import { Container, Col, Row } from 'react-grid-system'
import * as coreComponents from '../components'
import { SET_STATE, SET_PROPERTY } from '../common/constants'
import { connect } from 'react-redux'

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
      {
        config.map(section => {
          return (
            <Row>
              {section.map(inputConfig => {
                const Component = components[inputConfig.type]
                return (
                  <Col md={Math.floor(12/section.length)}>
                    <Component  config={inputConfig} state={state} update={updateValue}/>
                  </Col>
                )
              })}
            </Row>
          )
        })
      }
    </Container>
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
