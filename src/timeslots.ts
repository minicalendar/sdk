import axios, { AxiosError } from "axios"

interface AvailabilitySchedule {
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

interface EventType {
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

interface TimeslotsBaseParams {
    apiKey: string
    workspaceId: string
    start: string
    end: string
}

interface TimeslotsParamsEventType {
    eventTypeId: string
}

interface TimeslotsParamsTemplateMember {
    templateId: string
    memberId: string
}

export type TimeslotsParams = TimeslotsBaseParams & (TimeslotsParamsEventType | TimeslotsParamsTemplateMember)

export interface TimeslotsResponse {
    eventType: EventType | null
    availabilitySchedule: AvailabilitySchedule | null
    timeslots: string[]
}

const BASE_URL = "https://api.minicalendar.com/v1"

/**
 * Returns a list of available timeslots for an event type within a given range.
 * Will accept eventTypeId or templateId & memberId.
 * Will return { eventType: null } if it doesn't exist.
 *
 * Example with eventTypeId:
 * ```ts
 * const { timeslots, eventType } = await getTimeslots({
 *   apiKey: "apiKey",
 *   workspaceId: "workspaceId",
 *   eventTypeId: "eventTypeId",
 *   start: "1970-01-01T00:00:00.000Z",
 *   end: "1970-02-01T00:00:00.000Z",
 * });
 * ```
 */
export async function getTimeslots({ apiKey, workspaceId, start, end, ...params }: TimeslotsParams): Promise<TimeslotsResponse> {
    try {
        const result = await axios.post(
            `${BASE_URL}/timeslots`,
            {
                workspaceId,
                start,
                end,
                ...params,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            },
        )

        return result.data as TimeslotsResponse
    } catch (err) {
        const axiosErr = err as AxiosError

        if (axiosErr.response) {
            if ((axiosErr.response.data as any)?.c == "no-event-type") return { eventType: null, availabilitySchedule: null, timeslots: [] }
            else throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
