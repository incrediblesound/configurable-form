import React from 'react'

export const String = ({config, state, update}) => {
  return (
    <div>
      <p><strong>{config.label}</strong></p>
      <input
        value={state.getIn(config.path)}
        onChange={(e) => {
          update(config.path, e.target.value)
        }}/>
    </div>
  )
}

export const Number = ({config, state, update}) => {
  return (
    <div>
      <p><strong>{config.label}</strong></p>
      <input
        value={state.getIn(config.path)}
        type="number"
        onChange={(e) => {
          update(config.path, e.target.value)
        }}/>
    </div>
  )
}

export const TextArea = ({config, state, update}) => {
  return (
    <div>
      <p><strong>{config.label}</strong></p>
      <textarea
        rows={config.rows || 3}
        cols={config.cols || 15}
        value={state.getIn(config.path)}
        onChange={(e) => {
          update(config.path, e.target.value)
        }}>
        </textarea>
    </div>
  )
}
