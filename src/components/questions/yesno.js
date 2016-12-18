import React from 'react'

export const YesNo = ({config, state, update}) => {
  const isYes = state.getIn(config.path) === 'Yes'
  const onChange = (e) => {
    update(config.path, e.target.value)
  }
  return (
    <div>
      <p><strong>{config.label}</strong></p>
      <p>{config.question}</p>
      <input type="radio" value="Yes" checked={isYes} onChange={onChange}/><span>Yes</span><br/>
      <input type="radio" value="No" checked={!isYes}  onChange={onChange}/><span>No</span>
    </div>
  )
}
