import { type User } from './types'
import { mockInfusions } from './infusions'
import { mockBleeds } from './bleeds'

export const mockUsers: User[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    username: 'alicej',
    email: 'alice@example.com',
    phoneNumber: '555-1234',
    createdAt: new Date('2025-01-10'),
    bleeds: [mockBleeds[0]],
    infusions: [mockInfusions[0], mockInfusions[2]],
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Smith',
    username: 'bobsmith',
    email: 'bob@example.com',
    createdAt: new Date('2025-02-05'),
    bleeds: [mockBleeds[1]],
    infusions: [mockInfusions[1]],
  },
  {
    id: 3,
    firstName: 'Carol',
    lastName: 'Taylor',
    username: 'carolt',
    email: 'carol@example.com',
    phoneNumber: '555-5678',
    createdAt: new Date('2025-03-12'),
    bleeds: [mockBleeds[2]],
    infusions: [mockInfusions[3], mockInfusions[5]],
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Miller',
    username: 'davidm',
    email: 'david@example.com',
    createdAt: new Date('2025-04-18'),
    bleeds: [mockBleeds[3]],
    infusions: [mockInfusions[4]],
  },
  {
    id: 5,
    firstName: 'Eve',
    lastName: 'Williams',
    username: 'evew',
    email: 'eve@example.com',
    createdAt: new Date('2025-05-20'),
    bleeds: [mockBleeds[4]],
    infusions: [mockInfusions[6], mockInfusions[7]],
  },
]
