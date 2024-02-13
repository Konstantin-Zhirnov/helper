export const categories: string[] = [
  'House Services',
  'Health & Wellness',
  'Gardening',
  'Event Services',
  'Technical Services',
  'Beauty & Style',
  'Pet Care',
  'Personal Assistance',
  'Educational Services',
]

export const profileMenu = ['Profile', 'Password', 'Posts', 'Reviews'] as const

export const titles = [
  { title: 'Registration', widget: 'Registration' },
  { title: 'Adding and editing information about yourself', widget: 'UserInfo' },
  { title: 'Changing the password. If you forgot your password', widget: 'ForgotPassword' },
  { title: 'Changing the password. If you remember the password', widget: 'RememberPassword' },
  { title: 'Adding a post', widget: 'AddPost' },
  { title: 'Editing and deleting a post', widget: 'EditPost' },
  { title: 'Viewing and adding a user review', widget: 'AddReview' },
  { title: 'Deleting a user review', widget: 'DeleteReview' },
  { title: 'View the user`s available contacts', widget: 'Contacts' },
  { title: 'Filter by category', widget: 'FilterByCategory' },
  { title: 'Filter by search', widget: 'FilterBySearch' },
  { title: 'Choosing locations', widget: 'Locations' },
]
