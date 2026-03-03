import axios from "axios";
const BASE_URL = "https://api.minicalendar.com/v1";
/**
 * Returns the event types and availability schedules a user has setup.
 *
 * Example:
 * ```ts
 * const { eventTypes, availabilitySchedules } = await getPortalUrl({
 *   apiKey: "apiKey",
 *   workspaceId: "workspaceId",
 *   memberId: "memberId"
 * });
 * ```
 */
export async function getConfig({ apiKey, workspaceId, memberId }) {
    try {
        const result = await axios.post(`${BASE_URL}/config`, {
            workspaceId,
            memberId,
        }, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        return result.data;
    }
    catch (err) {
        const axiosErr = err;
        if (axiosErr.response) {
            throw new Error(`MiniCalendar API error: ${axiosErr.response.status} - ${JSON.stringify(axiosErr.response.data)}`);
        }
        throw err;
    }
}
