export interface PortalParams {
    apiKey: string;
    workspaceId: string;
    memberId: string;
    memberName?: string;
    eventTypeTemplateIds?: string[];
}
export interface PortalResponse {
    /** Short-lived URL for the portal */
    url: string;
}
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
export declare function getPortalUrl({ apiKey, workspaceId, memberId, memberName, eventTypeTemplateIds }: PortalParams): Promise<PortalResponse>;
