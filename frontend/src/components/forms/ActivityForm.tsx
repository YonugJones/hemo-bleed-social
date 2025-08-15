import { useState, useEffect } from 'react'
import type { ActivityDetails } from '../../types/eventType'

interface ActivityFormProps {
  onChange: (data: ActivityDetails) => void
}

const ActivityForm = ({ onChange }: ActivityFormProps) => {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState<number | ''>('')
  const [isPhysicalTherapy, setIsPhysicalTherapy] = useState(false)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    onChange({ name, duration, isPhysicalTherapy, notes })
  }, [name, duration, isPhysicalTherapy, notes, onChange])

  return (
    <fieldset className='flex flex-col gap-y-2 border p-4 rounded shadow'>
      <legend className='font-semibold text-[var(--green)]'>
        Activity Details
      </legend>

      <input
        type='text'
        placeholder='Activity name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='border rounded px-3 py-1'
      />

      <input
        type='number'
        placeholder='Duration (minutes)'
        value={duration}
        onChange={(e) =>
          setDuration(e.target.value ? Number(e.target.value) : '')
        }
        className='border rounded px-3 py-1'
      />

      <label>
        <input
          type='checkbox'
          checked={isPhysicalTherapy}
          onChange={(e) => setIsPhysicalTherapy(e.target.checked)}
        />{' '}
        Physical therapy
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

export default ActivityForm
