import axios, { AxiosError } from "axios"
import { Event } from "../types/types.js"

export interface AddEventParams {
    apiKey: string
    workspaceId: string
    eventData: {
        title: string
        description: string
        start: string
        end: string
        timezone: string
        memberIds: string[]
    }
}

export interface AddEventResponse {
    event: Event
}

const BASE_URL = "https://api.minicalendar.com/v1"

/**
 * Adds an event and returns the details.
 *
 * Example:
 * ```ts
 * const { event } = await addEvent({
 *   apiKey: process.env.MINICALENDAR_API_KEY!,
 *   workspaceId: "workspaceId",
 *     eventData: {
 *       title: "title"
 *       description: "description"
 *       start: "1970-01-01T00:00:00.000"
 *       end: "1970-01-01T01:00:00.000"
 *       timezone: "Europe/London"
 *       memberIds: ["memberId1", "memberId2"]
 *     }
 * })
 * ```
 */
export async function addEvent({ apiKey, ...params }: AddEventParams): Promise<AddEventResponse> {
    try {
        const result = await axios.post(
            `${BASE_URL}/add-event`,
            {
                ...params,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            },
        )

        return result.data as AddEventResponse
    } catch (err) {
        const axiosErr = err as AxiosError

        if (axiosErr.response) {
            throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
