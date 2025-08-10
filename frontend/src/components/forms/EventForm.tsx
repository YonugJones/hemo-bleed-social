import { useState, type FormEvent } from 'react'
import BleedForm from './BleedForm'
import InfusionForm from './InfusionForm'
import ActivityForm from './ActivityForm'

const EventForm = () => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])

  const toggleEventType = (type: string) => {
    setSelectedEvents((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Submitting event with:', selectedEvents)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-y-4 w-full max-w-lg mx-auto'
    >
      <fieldset className='flex gap-x-4'>
        <label>
          <input
            type='checkbox'
            checked={selectedEvents.includes('bleed')}
            onChange={() => toggleEventType('bleed')}
          />{' '}
          Bleed
          <input
            type='checkbox'
            checked={selectedEvents.includes('infusion')}
            onChange={() => toggleEventType('infusion')}
          />{' '}
          Infusion
          <input
            type='checkbox'
            checked={selectedEvents.includes('activity')}
            onChange={() => toggleEventType('activity')}
          />{' '}
          Activity
        </label>
      </fieldset>

      {selectedEvents.includes('bleed') && <BleedForm />}
      {selectedEvents.includes('infusion') && <InfusionForm />}
      {selectedEvents.includes('activity') && <ActivityForm />}

      {selectedEvents.length > 0 && (
        <button
          type='submit'
          className='w-[150px] sm:w-[175px] m:w-[200px] px-4 py-1 rounded-full text-center bg-[var(--green)] hover:bg-[var(--light-green)] text-white text-xs font-semibold shadow cursor-pointer'
        >
          Log Event
        </button>
      )}
    </form>
  )
}

export default EventForm
