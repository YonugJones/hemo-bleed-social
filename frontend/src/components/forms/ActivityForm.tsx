import { useState } from 'react'

const ActivityForm = () => {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState<number | ''>('')
  const [isPhysicalTherapy, setIsPhysicalTherapy] = useState(false)

  return (
    // <>
    //   <input type='text' placeholder='Activity name' />
    //   <input type='number' placeholder='Duration (in minutes)' />
    //   <label>
    //     <input type='checkbox' name='physicalTherapy' />
    //     Physical Therapy
    //   </label>
    // </>
    <fieldset className='flex flex-col gap-y-2 border p-4 rounded'>
      <legend className='font-semibold'>Activity Details</legend>

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
    </fieldset>
  )
}

export default ActivityForm
