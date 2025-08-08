export interface User {
  id: number
  firstName?: string
  lastName?: string
  username: string
  email: string
  phoneNumber?: string
  createdAt?: Date
  updatedAt?: Date
  location?: string
  role?: string
  profilePic?: string
  birthday?: Date
  bleeds?: Bleed[]
  infusions?: Infusion[]
}

export interface Bleed {
  id: number
  bodyPart: string
  severity: 'mild' | 'moderate' | 'severe'
  status?: 'active' | 'resolved' | 'ongoing'
  dosage: string
  date: Date
  durationInDays: number
  reportedBy: string
  photos?: string[]
  notes?: string
  treatmentGiven?: string
  infusion?: Infusion
}

export interface Infusion {
  id: number
  date: Date
  bleedTreatment: boolean
  medication: string
  dosageAmount?: number
  administrationMethod?: string
  location?: string
  sideEffects?: string
  notes?: string
}
