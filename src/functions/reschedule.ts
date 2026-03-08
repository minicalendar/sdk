import axios, { AxiosError } from "axios"
import { Event } from "../types/types.js"

export interface RescheduleEventParams {
    apiKey: string
    workspaceId: string
    eventId: string
    start: string
}

export interface RescheduleEventResponse {
    event: Event
}

const BASE_URL = "https://api.minicalendar.com/v1"

/**
 * Reschedules an event.
 *
 * Example:
 * ```ts
 * const { event } = await rescheduleEvent({
 *   apiKey: process.env.MINICALENDAR_API_KEY!,
 *   workspaceId: "workspaceId",
 *   eventId: "eventId",
 *   start: "1970-01-01T00:00:00.000Z"
 * })
 * ```
 */
export async function rescheduleEvent({ apiKey, ...params }: RescheduleEventParams): Promise<RescheduleEventResponse> {
    try {
        const result = await axios.post(
            `${BASE_URL}/event`,
            {
                ...params,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            },
        )

        return result.data as RescheduleEventResponse
    } catch (err) {
        const axiosErr = err as AxiosError

        if (axiosErr.response) {
            throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
