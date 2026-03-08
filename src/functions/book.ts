import axios, { AxiosError } from "axios"
import { Event } from "../types/types.js"

interface BookEventBaseParams {
    apiKey: string
    workspaceId: string
    start: string
    timezone: string
    guestDetails: {
        memberId: string
        name: string
        email: string
        phone?: string
        address?: string
        notes?: string
    }
}

interface BookEventParamsEventType {
    eventTypeId: string
}

interface BookEventParamsTemplateMember {
    templateId: string
    memberId: string
}

export type BookEventParams = BookEventBaseParams & (BookEventParamsEventType | BookEventParamsTemplateMember)

export interface BookEventResponse {
    event: Event
}

const BASE_URL = "https://api.minicalendar.com/v1"

/**
 * Books an event type and returns the event details.
 * Will accept eventTypeId or templateId & memberId.
 *
 * Example with eventTypeId:
 * ```ts
 * const { event } = await book({
 *   apiKey: process.env.MINICALENDAR_API_KEY!,
 *   workspaceId: "workspaceId",
 *   eventTypeId: "eventTypeId",
 *   start: "1970-01-01T00:00:00.000Z",
 *   timezone: "Europe/London",
 *   guestDetails: {
 *     memberId: "guestMemberId",
 *     name: "",
 *     email: "",
 *     phone: "", // if the host calls the guest
 *     address: "", // if it's the event location
 *     notes: "", // optional
 *   },
 * })
 * ```
 */
export async function bookEvent({ apiKey, ...params }: BookEventParams): Promise<BookEventResponse> {
    try {
        const result = await axios.post(
            `${BASE_URL}/book`,
            {
                ...params,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            },
        )

        return result.data as BookEventResponse
    } catch (err) {
        const axiosErr = err as AxiosError

        if (axiosErr.response) {
            throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
