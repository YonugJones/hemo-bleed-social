import { useState, type FormEvent } from 'react'
import type {
  EventType,
  BleedDetails,
  InfusionDetails,
  ActivityDetails,
  MultiEvent,
} from '../../types/eventType'
import BleedForm from './BleedForm'
import InfusionForm from './InfusionForm'
import ActivityForm from './ActivityForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDroplet,
  faSyringe,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons'

interface EventFormProps {
  onSubmit: (event: MultiEvent) => void
  defaultDate?: Date
  onCancel?: () => void
}

const EventForm = ({ onSubmit, defaultDate, onCancel }: EventFormProps) => {
  const [selectedEventTypes, setSelectedEventTypes] = useState<EventType[]>([])
  const [date, setDate] = useState(
    defaultDate ? defaultDate.toISOString().split('T')[0] : ''
  )

  const toggleEventType = (type: EventType) => {
    setSelectedEventTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const [bleedDetails, setBleedDetails] = useState<BleedDetails>({
    location: '',
    severity: 'mild',
    isTargetJoint: false,
    notes: '',
  })

  const [infusionDetails, setInfusionDetails] = useState<InfusionDetails>({
    location: '',
    dosage: '',
    isProphylaxis: true,
    notes: '',
  })

  const [activityDetails, setActivityDetails] = useState<ActivityDetails>({
    name: '',
    duration: '',
    isPhysicalTherapy: false,
    notes: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!date || selectedEventTypes.length === 0) return

    const start = new Date(date)
    const end = new Date(date)

    const newEvent: MultiEvent = {
      title: 'Combined event',
      start,
      end,
      types: selectedEventTypes,
      bleedDetails: selectedEventTypes.includes('bleed')
        ? bleedDetails
        : undefined,
      infusionDetails: selectedEventTypes.includes('infusion')
        ? infusionDetails
        : undefined,
      activityDetails: selectedEventTypes.includes('activity')
        ? activityDetails
        : undefined,
    }

    onSubmit(newEvent)
    setBleedDetails({
      location: '',
      severity: 'mild',
      isTargetJoint: false,
      notes: '',
    })
    setInfusionDetails({
      location: '',
      dosage: '',
      isProphylaxis: false,
      notes: '',
    })
    setActivityDetails({
      name: '',
      duration: 0,
      isPhysicalTherapy: false,
      notes: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col justify-center gap-y-4 w-full max-w-lg mx-auto pt-4 px-3 bg-white p-4 rounded shadow'
    >
      <h1 className='text-center'>Log an event</h1>
      {/* Event type selector */}
      <fieldset className='flex justify-center gap-x-3'>
        <label
          className={`flex justify-center items-center gap-2 w-12 h-12 sm:w-32 rounded-full cursor-pointer text-[var(--red)] border border-[var(--red)] ${
            selectedEventTypes?.includes('bleed') ? 'bg-[var(--light-red)]' : ''
          }`}
        >
          <input
            type='checkbox'
            className='sr-only'
            checked={selectedEventTypes?.includes('bleed')}
            onChange={() => toggleEventType('bleed')}
          />
          <span className='hidden sm:inline'>Bleed</span>
          <FontAwesomeIcon icon={faDroplet} />
        </label>

        <label
          className={`flex justify-center items-center gap-2 w-12 h-12 sm:w-32 rounded-full cursor-pointer text-[var(--blue)] border border-[var(--blue)] ${
            selectedEventTypes.includes('infusion')
              ? 'bg-[var(--light-blue)]'
              : ''
          }`}
        >
          <input
            type='checkbox'
            className='sr-only'
            checked={selectedEventTypes?.includes('infusion')}
            onChange={() => toggleEventType('infusion')}
          />
          <span className='hidden sm:inline'>Infusion</span>
          <FontAwesomeIcon icon={faSyringe} />
        </label>

        <label
          className={`flex justify-center items-center gap-2 w-12 h-12 sm:w-32 rounded-full cursor-pointer text-[var(--green)] border border-[var(--green)] ${
            selectedEventTypes.includes('activity')
              ? 'bg-[var(--light-green)]'
              : ''
          }`}
        >
          <input
            type='checkbox'
            className='sr-only'
            checked={selectedEventTypes?.includes('activity')}
            onChange={() => toggleEventType('activity')}
          />
          <span className='hidden sm:inline'>Activity</span>
          <FontAwesomeIcon icon={faDumbbell} />
        </label>
      </fieldset>

      {/* Date input */}
      <input
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className='border p-2 rounded'
      />

      {/* Sub-forms */}
      {selectedEventTypes?.includes('bleed') && (
        <BleedForm onChange={setBleedDetails} />
      )}
      {selectedEventTypes?.includes('infusion') && (
        <InfusionForm onChange={setInfusionDetails} />
      )}
      {selectedEventTypes?.includes('activity') && (
        <ActivityForm onChange={setActivityDetails} />
      )}

      {/* Buttons */}
      <div className='flex justify-center gap-4'>
        {selectedEventTypes?.length > 0 && (
          <button
            type='submit'
            className='w-[150px] px-4 py-1 rounded-full bg-[var(--green)] hover:bg-[var(--light-green)] text-white font-semibold shadow'
          >
            Log Event
          </button>
        )}
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='w-[150px] px-4 py-1 rounded-full bg-gray-400 hover:bg-gray-500 text-white font-semibold shadow'
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default EventForm
