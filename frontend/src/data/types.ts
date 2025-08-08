export interface User {
  id: number
  firstName?: string
  lastName?: string
  username: string
  email: string
  profilePic?: string
  infusions?: Infusion[]
  bleeds?: Bleed[]
}

export interface Infusion {
  id: number
  userId: number
  location: string
  dosage: number
  medication: string
  date: Date
  notes?: string
  bleedId?: number
}

export interface Bleed {
  id: number
  userId: number
  location: string
  severity: 'mild' | 'moderate' | 'severe'
  notes?: string
  isActive: boolean
  infusionId?: number
  didPhysicalTherapy?: boolean
  physicalTherapy?: string
}
