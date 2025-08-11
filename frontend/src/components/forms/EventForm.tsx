import { useState, type FormEvent } from 'react'
import BleedForm from './BleedForm'
import InfusionForm from './InfusionForm'
import ActivityForm from './ActivityForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDroplet,
  faSyringe,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons'

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
      className='flex flex-col justify-center gap-y-4 w-full max-w-lg min-w-[150px] mx-auto pt-4 px-3'
    >
      <fieldset className='flex items-center sm:items-stretch gap-y-4 gap-x-3 sm:w-full mx-auto'>
        <label className='flex justify-center items-center gap-2 w-12 h-12 sm:w-full sm:h-auto rounded-full sm:rounded-full py-1 sm:py-1 px-0 sm:px-10 cursor-pointer select-none text-[var(--red)] border border-[var(--red)] hover:bg-[var(--light-red)]'>
          <input
            type='checkbox'
            className='sr-only'
            checked={selectedEvents.includes('bleed')}
            onChange={() => toggleEventType('bleed')}
          />
          <span className='hidden sm:inline'>Bleed</span>{' '}
          <FontAwesomeIcon icon={faDroplet} />
        </label>

        <label className='flex justify-center items-center gap-2 w-12 h-12 sm:w-full sm:h-auto rounded-full sm:rounded-full py-1 sm:py-1 cursor-pointer select-none text-[var(--blue)] border border-[var(--blue)] hover:bg-[var(--light-blue)]'>
          <input
            type='checkbox'
            className='sr-only'
            checked={selectedEvents.includes('infusion')}
            onChange={() => toggleEventType('infusion')}
          />
          <span className='hidden sm:inline'>Infusion</span>{' '}
          <FontAwesomeIcon icon={faSyringe} />
        </label>

        <label className='flex justify-center items-center gap-2 w-12 h-12 sm:w-full sm:h-auto rounded-full sm:rounded-full py-1 sm:py-1 cursor-pointer select-none text-[var(--green)] border border-[var(--green)] hover:bg-[var(--light-green)]'>
          <input
            type='checkbox'
            className='sr-only'
            checked={selectedEvents.includes('activity')}
            onChange={() => toggleEventType('activity')}
          />
          <span className='hidden sm:inline'>Activity</span>{' '}
          <FontAwesomeIcon icon={faDumbbell} />
        </label>
      </fieldset>

      {selectedEvents.includes('bleed') && <BleedForm />}
      {selectedEvents.includes('infusion') && <InfusionForm />}
      {selectedEvents.includes('activity') && <ActivityForm />}

      {selectedEvents.length > 0 && (
        <button
          type='submit'
          className='mx-auto w-[150px] sm:w-[175px] m:w-[200px] px-4 py-1 rounded-full text-center bg-[var(--green)] hover:bg-[var(--light-green)] text-white font-semibold shadow cursor-pointer'
        >
          Log Event
        </button>
      )}
    </form>
  )
}

export default EventForm
