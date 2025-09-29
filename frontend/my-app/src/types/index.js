// Type definitions for the application
export const EventTypes = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  RSVP_ONLY: 'rsvp-only'
};

export const EventStatus = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const AttendeeStatus = {
  ATTENDING: 'attending',
  MAYBE: 'maybe',
  NOT_ATTENDING: 'not-attending',
  PENDING: 'pending'
};