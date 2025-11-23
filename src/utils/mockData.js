export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@student.edu',
    password: 'student123',
    role: 'student',
    studentId: 'STU001',
    program: 'Science',
    year: 'SS2 Science'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@student.edu',
    password: 'student123',
    role: 'student',
    studentId: 'STU002',
    program: 'Arts',
    year: 'JSS3A'
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@kowahs.edu.ng',
    password: 'KowaHS@2024!Admin',
    role: 'admin'
  }
];

export const feeSchedule = [
  {
    id: 1,
    name: 'Tuition Fee',
    amount: 250000,
    dueDate: '2024-01-15',
    description: 'Semester tuition payment'
  },
  {
    id: 2,
    name: 'Library Fee',
    amount: 15000,
    dueDate: '2024-01-15',
    description: 'Library access and resources'
  },
  {
    id: 3,
    name: 'Lab Fee',
    amount: 25000,
    dueDate: '2024-01-20',
    description: 'Laboratory equipment and materials'
  },
  {
    id: 4,
    name: 'Activity Fee',
    amount: 10000,
    dueDate: '2024-01-25',
    description: 'Student activities and events'
  }
];

export const mockPayments = [
  {
    id: 1,
    studentId: 1,
    studentName: 'John Doe',
    feeType: 'Tuition Fee',
    amount: 250000,
    status: 'confirmed',
    date: '2024-01-10T10:30:00Z',
    receiptNumber: 'RCP-1704876600000',
    confirmedDate: '2024-01-10T14:30:00Z'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Jane Smith',
    feeType: 'Library Fee',
    amount: 15000,
    status: 'pending',
    date: '2024-01-12T09:15:00Z',
    receiptNumber: 'RCP-1704963300000'
  }
];