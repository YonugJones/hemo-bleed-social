import { useState } from 'react'

const InfusionForm = () => {
  const [location, setLocation] = useState('')
  const [isProphylaxis, setIsProphylaxis] = useState(false)

  return (
    <fieldset className='flex flex-col gap-y-2 border p-4 rounded'>
      <legend className='font-semibold'>Infusion details</legend>

      <input
        type='text'
        placeholder='Location'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className='border rounded px-3 py-1'
      />

      <label>
        <input
          type='checkbox'
          checked={isProphylaxis}
          onChange={(e) => setIsProphylaxis(e.target.checked)}
        />{' '}
        Prophylaxis
      </label>
    </fieldset>
  )
}

export default InfusionForm
