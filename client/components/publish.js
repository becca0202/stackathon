import React from 'react'

export const Publish = props => {
  const poem = JSON.parse(localStorage.getItem('poem'))

  return (
    <div>
      <h3>{poem.lines[0]}</h3>
      {poem.lines.map((line, index) => {
        return <p key={index}>{line}</p>
      })}

      <button
        type="button"
        onClick={() => {
          localStorage.clear()
          props.history.push('/')
        }}
      >
        Start A New Poem
      </button>
    </div>
  )
}
