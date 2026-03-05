# MiniCalendar SDK

SDK for interacting with the MiniCalendar scheduling API.

## Installation

```
npm install @minicalendar/sdk
```

## Getting Started

Before using the SDK:

1. **Create an account** - https://auth.minicalendar.com/create-an-account
2. **Create a workspace** - https://console.minicalendar.com/add-workspace
3. **Create an event type template**
4. **Generate an API key**

## API

### Portal

Returns a short-lived portal URL where a user can set up scheduling.

```ts
import { getPortalUrl } from "@minicalendar/sdk"

const { url } = await getPortalUrl({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    memberId: "memberId",
    memberName: "Member Name",
    eventTypeTemplateIds: ["eventTypeTemplateIds"],
})
```

### Config

Returns the config a user has set up.

```ts
import { getConfig } from "@minicalendar/sdk"

const { eventTypes, availabilitySchedules, isPaused } = await getConfig({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    memberId: "memberId",
})
```

### Pause

Pauses or unpauses bookings for a user.

```ts
import { pause } from "@minicalendar/sdk"

const { isPaused } = await pause({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    memberId: "memberId",
    paused: true,
})
```

### Timeslots

Returns a list of available timeslots for an event type within a given range.

```ts
import { getTimeslots } from "@minicalendar/sdk"

// With eventTypeId
const { timeslots, eventType, availabilitySchedule } = await getTimeslots({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    eventTypeId: "eventTypeId",
    start: "1970-01-01T00:00:00.000Z",
    end: "1970-02-01T00:00:00.000Z",
})

// With templateId & memberId
const { timeslots, eventType, availabilitySchedule } = await getTimeslots({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    templateId: "templateId",
    memberId: "memberId",
    start: "1970-01-01T00:00:00.000Z",
    end: "1970-02-01T00:00:00.000Z",
})
```
