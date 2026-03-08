import axios, { AxiosError } from "axios"
import { Event } from "./types/index.js"

export interface GetEventParams {
    apiKey: string
    workspaceId: string
    eventId: string
}

export interface GetEventResponse {
    event: Event
}

const BASE_URL = "https://api.minicalendar.com/v1"

/**
 * Returns an event.
 *
 * Example:
 * ```ts
 * const { event } = await getEvent({
 *   apiKey: process.env.MINICALENDAR_API_KEY!,
 *   workspaceId: "workspaceId",
 *   eventId: "eventId",
 * })
 * ```
 */
export async function getEvent({ apiKey, ...params }: GetEventParams): Promise<GetEventResponse> {
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

        return result.data as GetEventResponse
    } catch (err) {
        const axiosErr = err as AxiosError

        if (axiosErr.response) {
            throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
