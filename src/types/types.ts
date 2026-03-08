export interface Event {
    id: string

    status: "booked" | "cancelled" | "rescheduled"

    title: string
    description?: string

    start: string // ISO
    end: string // ISO
    timezone: string

    memberIds: string[]

    location?: {
        type: "virtual" | "phone_call" | "in_person"
        platform?: "google_meet" | "microsoft_teams" | "zoom"
        label?: string
        joinUrl?: string
        phone?: string
        address?: string
        meetingId?: string
        password?: string
    }
    source?: {
        eventTypeId?: string
        eventTypeTemplateId?: string
    }
    scheduling?: {
        bookedBy?: {
            name?: string
            email?: string
            phone?: string
            memberId?: string
        }
        answers?: Record<string, string>
        notes?: string
    }
    attendees?: Array<{
        name?: string
        email?: string
        memberId?: string
    }>
    reschedule?: {
        newEventId: string
    }
    cancelled?: {
        at?: number
        by?: {
            memberId?: string
            email?: string
            name?: string
        }
        reason?: string
    }

    createdAt: number
    updatedAt: number
}

export interface AvailabilitySchedule {
    name: string
    week: {
        monday: { start: string; end: string }[]
        tuesday: { start: string; end: string }[]
        wednesday: { start: string; end: string }[]
        thursday: { start: string; end: string }[]
        friday: { start: string; end: string }[]
        saturday: { start: string; end: string }[]
        sunday: { start: string; end: string }[]
        // ISO times
    }
    holidays: {
        name: string
        start: string // ISO datetime
        end: string // ISO datetime
    }[]
    notice: {
        min: string // ISO duration
        max: string // ISO duration
    }
}

export interface EventType {
    memberId: string
    templateId: string
    type: "one-to-one"
    title: string
    description: string
    duration: string
    availabilityScheduleId: string
    calendar: {
        platform: "google_calendar" | "outlook"
        connectionId: string
        addEventsTo: string
        checkForConflicts: string[]
    }
    location:
        | {
              type: "virtual"
              platform: "google_meet" | "microsoft_teams" | "zoom"
              connectionId: string
          }
        | {
              type: "phone_call"
              contact: { party: "host" | "dev"; number: string } | { party: "guest" }
          }
        | {
              type: "in_person"
              address: { party: "host" | "dev"; address: string } | { party: "guest" }
          }
}
