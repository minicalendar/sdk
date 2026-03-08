import axios, { AxiosError } from "axios"

interface Event {
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

interface BookBaseParams {
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

interface BookParamsEventType {
    eventTypeId: string
}

interface BookParamsTemplateMember {
    templateId: string
    memberId: string
}

export type BookParams = BookBaseParams & (BookParamsEventType | BookParamsTemplateMember)

export interface BookResponse {
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
 *   zone: "Europe/London",
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
export async function book({ apiKey, ...params }: BookParams): Promise<BookResponse> {
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

        return result.data as BookResponse
    } catch (err) {
        const axiosErr = err as AxiosError

        if (axiosErr.response) {
            throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
