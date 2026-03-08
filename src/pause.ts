import axios, { AxiosError } from "axios"

export interface PauseSchedulingParams {
    apiKey: string
    workspaceId: string
    memberId: string
    paused: boolean
}

export interface PauseSchedulingResponse {
    isPaused: boolean
}

const BASE_URL = "https://api.minicalendar.com/v1"

/**
 * Pauses or unpauses scheduling for a member.
 *
 * Example:
 * ```ts
 * await pauseScheduling({
 *   apiKey: "apiKey",
 *   workspaceId: "workspaceId",
 *   memberId: "memberId",
 *   paused: true
 * });
 * ```
 */
export async function pauseScheduling({ apiKey, workspaceId, memberId, paused }: PauseSchedulingParams): Promise<PauseSchedulingResponse> {
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

        return result.data as PauseSchedulingResponse
    } catch (err) {
        const axiosErr = err as AxiosError

        if (axiosErr.response) {
            throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`)
        }

        throw err
    }
}
