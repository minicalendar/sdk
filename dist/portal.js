import axios from "axios";
const BASE_URL = "https://api.minicalendar.com/v1";
/**
 * Returns a short-lived portal URL for a user to set up scheduling.
 *
 * Example:
 * ```ts
 * const { url } = await getPortalUrl({
 *   apiKey: "apiKey",
 *   workspaceId: "workspaceId",
 *   memberId: "memberId",
 *   memberName: "memberName",
 *   eventTypeTemplateIds: ["eventTypeTemplateId"]
 * });
 * ```
 */
export async function getPortalUrl({ apiKey, workspaceId, memberId, memberName, eventTypeTemplateIds }) {
    try {
        const result = await axios.post(`${BASE_URL}/portal`, {
            workspaceId,
            memberId,
            memberName,
            eventTypeTemplateIds,
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
