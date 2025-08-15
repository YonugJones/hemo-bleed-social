import { useState, useEffect } from 'react'
import type { BleedDetails } from '../../types/eventType'

interface BleedFormProps {
  onChange: (data: BleedDetails) => void
}

const BleedForm = ({ onChange }: BleedFormProps) => {
  const [location, setLocation] = useState<string>('')
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>(
    'mild'
  )
  const [isTargetJoint, setIsTargetJoint] = useState(false)
  const [notes, setNotes] = useState('')

  // whenever any field changes, tell the parent EventForm
  useEffect(() => {
    onChange({ location, severity, isTargetJoint, notes })
  }, [location, severity, isTargetJoint, notes, onChange])

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
        onChange={(e) =>
          setSeverity(e.target.value as 'mild' | 'moderate' | 'severe')
        }
        className='border rounded px-3 py-1'
      >
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
