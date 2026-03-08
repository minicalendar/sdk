import axios, { AxiosError } from "axios"
import { Event } from "./types/index.js"

interface ListEventsBaseParams {
    apiKey: string
    workspaceId: string
    cursor?: { startsAt: number; id: string }
    limit?: number
    getPastEvents?: boolean
}

interface ListEventsParamsForEveryone {
    forEveryone: true
}

interface ListEventsParamsMemberId {
    memberId: string
}

interface ListEventsParamsMemberIds {
    memberIds: string[]
}

export type ListEventsParams = ListEventsBaseParams & (ListEventsParamsForEveryone | ListEventsParamsMemberId | ListEventsParamsMemberIds)

export interface ListEventsResponse {
    events: Event[]
}

const BASE_URL = "https://api.minicalendar.com/v1"

/**
 * Returns a list of events.
 *
 * Example:
 * ```ts
 * const { events } = await listEvents({
 *     apiKey: process.env.MINICALENDAR_API_KEY!,
 *     workspaceId: "workspaceId",
 *     forEveryone: true,
 *     limit: 50,
 *     cursor: {
 *         id: "previousEventId",
 *         startsAt: 123456789,
 *     },
 *     getPastEvents: false,
 * })
 * ```
 */
export async function listEvents({ apiKey, ...params }: ListEventsParams): Promise<ListEventsResponse> {
    try {
        const result = await axios.post(
            `${BASE_URL}/events`,
            {
                ...params,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            },
        )

        return result.data as ListEventsResponse
    } catch (err) {
        const axiosErr = err as AxiosError

        if (axiosErr.response) {
            throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
