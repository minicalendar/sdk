import axios, { AxiosError } from "axios"

export interface PauseParams {
    apiKey: string
    workspaceId: string
    memberId: string
    paused: boolean
}

export interface PauseResponse {
    isPaused: boolean
}

const BASE_URL = "https://api.minicalendar.com/v1"

/**
 * Pauses or unpauses bookings for a member.
 *
 * Example:
 * ```ts
 * await pause({
 *   apiKey: "apiKey",
 *   workspaceId: "workspaceId",
 *   memberId: "memberId",
 *   paused: true
 * });
 * ```
 */
export async function pause({ apiKey, workspaceId, memberId, paused }: PauseParams): Promise<PauseResponse> {
    try {
        const result = await axios.post(
            `${BASE_URL}/pause`,
            {
                workspaceId,
                memberId,
                paused,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            },
        )

        return result.data as PauseResponse
    } catch (err) {
        const axiosErr = err as AxiosError

        if (axiosErr.response) {
            throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
