import axios, { AxiosError } from "axios"

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

export interface TimeslotsParams {
    apiKey: string
    workspaceId: string
    eventTypeId: string
    rangeStart: string
    rangeEnd: string
}

export interface TimeslotsResponse {
    eventType: EventType
    timeslots: { start: string; end: string }[]
}

const BASE_URL = "https://api.minicalendar.com/v1"

/**
 * Returns a list of available timeslots for an event type within a given range.
 *
 * Example:
 * ```ts
 * const { timeslots, eventType } = await getTimeslots({
 *   apiKey: "apiKey",
 *   workspaceId: "workspaceId",
 *   eventTypeId: "eventTypeId",
 *   rangeStart: "1970-01-01T00:00:00.000Z",
 *   rangeEnd: "1970-02-01T00:00:00.000Z",
 * });
 * ```
 */
export async function getTimeslots({ apiKey, workspaceId, eventTypeId, rangeStart, rangeEnd }: TimeslotsParams): Promise<TimeslotsResponse> {
    try {
        const result = await axios.post(
            `${BASE_URL}/timeslots`,
            {
                workspaceId,
                eventTypeId,
                rangeStart,
                rangeEnd,
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
            throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
