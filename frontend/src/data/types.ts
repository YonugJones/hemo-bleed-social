export type BaseEvent = {
  eventId: string
  sessionId: string
  type: 'bleed' | 'infusion' | 'activity'
  date: string
}

export type BleedEvent = BaseEvent & {
  type: 'bleed'
  location: string
  severity: 'mild' | 'moderate' | 'severe'
  isTargetJoint: boolean
}

export type InfusionEvent = BaseEvent & {
  type: 'infusion'
  location: string
  isProphy: boolean
}

export type ActivityEvent = BaseEvent & {
  type: 'activity'
  title: string
  durationInMinutes: number
  isPhysicalTherapy: boolean
}
