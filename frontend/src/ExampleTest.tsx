import { useState } from 'react'

const ExampleTest = () => {
  const [heading, setHeading] = useState<string>('Magnificent Monkeys')

  const clickHandler = () => {
    setHeading('Radical Rhinos')
  }

  return (
    <>
      <button type='button' onClick={clickHandler}>
        Click Me
      </button>
      <h1>{heading}</h1>
    </>
  )
}

export default ExampleTest
