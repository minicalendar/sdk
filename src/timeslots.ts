import axios, { AxiosError } from "axios"
import { AvailabilitySchedule, EventType } from "./types/index.js"

interface GetTimeslotsBaseParams {
    apiKey: string
    workspaceId: string
    start: string
    end: string
}

interface GetTimeslotsParamsEventType {
    eventTypeId: string
}

interface GetTimeslotsParamsTemplateMember {
    templateId: string
    memberId: string
}

export type GetTimeslotsParams = GetTimeslotsBaseParams & (GetTimeslotsParamsEventType | GetTimeslotsParamsTemplateMember)

export interface GetTimeslotsResponse {
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
 * const { timeslots, eventType, availabilitySchedule } = await getTimeslots({
 *   apiKey: "apiKey",
 *   workspaceId: "workspaceId",
 *   eventTypeId: "eventTypeId",
 *   start: "1970-01-01T00:00:00.000Z",
 *   end: "1970-02-01T00:00:00.000Z",
 * });
 * ```
 */
export async function getTimeslots({ apiKey, workspaceId, start, end, ...params }: GetTimeslotsParams): Promise<GetTimeslotsResponse> {
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

        return result.data as GetTimeslotsResponse
    } catch (err) {
        const axiosErr = err as AxiosError

        if (axiosErr.response) {
            if ((axiosErr.response.data as any)?.c == "no-event-type") return { eventType: null, availabilitySchedule: null, timeslots: [] }
            else throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
