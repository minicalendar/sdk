export interface ConfigParams {
    apiKey: string;
    workspaceId: string;
    memberId: string;
}
export interface ConfigResponse {
    eventTypes: {
        id: string;
        title: string;
        description: string;
    }[];
    availabilitySchedules: {
        id: string;
        name: string;
    }[];
}
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
export declare function getConfig({ apiKey, workspaceId, memberId }: ConfigParams): Promise<ConfigResponse>;
