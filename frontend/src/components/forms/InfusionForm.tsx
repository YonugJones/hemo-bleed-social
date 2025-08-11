import { useState } from 'react'

const InfusionForm = () => {
  const [location, setLocation] = useState('')
  const [dosage, setDosage] = useState<number | ''>('')
  const [isProphylaxis, setIsProphylaxis] = useState(false)
  const [notes, setNotes] = useState('')

  return (
    <fieldset className='flex flex-col gap-y-2 border p-4 rounded shadow'>
      <legend className='font-semibold text-[var(--blue)]'>
        Infusion details
      </legend>

      <input
        type='text'
        placeholder='Location'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className='border rounded px-3 py-1'
      />

      <input
        type='number'
        placeholder='Dosage (IU)'
        value={dosage}
        onChange={(e) =>
          setDosage(e.target.value ? Number(e.target.value) : '')
        }
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

      <input
        type='text'
        placeholder='Notes'
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </fieldset>
  )
}

export default InfusionForm
