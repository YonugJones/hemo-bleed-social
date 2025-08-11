import { useState } from 'react'

const BleedForm = () => {
  const [location, setLocation] = useState<string>('')
  const [severity, setSeverity] = useState('')
  const [isTargetJoint, setIsTargetJoint] = useState(false)
  const [notes, setNotes] = useState('')

  return (
    <fieldset className='flex flex-col gap-y-2 border p-4 rounded shadow'>
      <legend className='font-semibold text-[var(--red)]'>Bleed Details</legend>

      <input
        type='text'
        placeholder='Location'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className='border rounded px-3 py-1'
      />

      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        className='border rounded px-3 py-1'
      >
        <option value=''>-- Severity --</option>
        <option value='mild'>Mild</option>
        <option value='moderate'>Moderate</option>
        <option value='severe'>Severe</option>
      </select>

      <label>
        <input
          type='checkbox'
          checked={isTargetJoint}
          onChange={(e) => setIsTargetJoint(e.target.checked)}
        />{' '}
        Target joint
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

export default BleedForm
