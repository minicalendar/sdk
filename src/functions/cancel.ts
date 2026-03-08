import axios, { AxiosError } from "axios"
import { Event } from "../types/types.js"

export interface CancelEventParams {
    apiKey: string
    workspaceId: string
    eventId: string
    reason: string
    memberId: string
}

export interface CancelEventResponse {
    event: Event
}

const BASE_URL = "https://api.minicalendar.com/v1"

/**
 * Cancels an event.
 *
 * Example:
 * ```ts
 * const { event } = await cancelEvent({
 *   apiKey: process.env.MINICALENDAR_API_KEY!,
 *   workspaceId: "workspaceId",
 *   eventId: "eventId",
 *   reason: "reason",
 *   memberId: "memberId"
 * })
 * ```
 */
export async function cancelEvent({ apiKey, ...params }: CancelEventParams): Promise<CancelEventResponse> {
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

        return result.data as CancelEventResponse
    } catch (err) {
        const axiosErr = err as AxiosError

        if (axiosErr.response) {
            throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
