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

## Functions

### Portal

Returns a short-lived portal URL where a user can set up scheduling.

`https://api.minicalendar.com/v1/portal`

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

`https://api.minicalendar.com/v1/config`

```ts
import { getConfig } from "@minicalendar/sdk"

const { eventTypes, availabilitySchedules, isPaused } = await getConfig({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    memberId: "memberId",
})
```

### Pause scheduling

Pauses or unpauses scheduling for a user.

`https://api.minicalendar.com/v1/pause`

```ts
import { pauseScheduling } from "@minicalendar/sdk"

const { isPaused } = await pauseScheduling({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    memberId: "memberId",
    paused: true,
})
```

### Get timeslots

Returns a list of available timeslots for an event type within a given range.

`https://api.minicalendar.com/v1/timeslots`

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

### Book event

Books an event.

`https://api.minicalendar.com/v1/book`

```ts
import { bookEvent } from "@minicalendar/sdk"

const { event } = await bookEvent({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    eventTypeId: "eventTypeId",
    start: "1970-01-01T00:00:00.000Z",
    timezone: "Europe/London",
    guestDetails: {
        memberId: "guestMemberId",
        name: "",
        email: "",
        phone: "", // if the host calls the guest
        address: "", // if it's the event location
        notes: "", // optional
    },
})
```

### List events

Lists events for everyone, for a member, or for a list of members.

`https://api.minicalendar.com/v1/events`

```ts
import { listEvents } from "@minicalendar/sdk"

const { events } = await listEvents({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    forEveryone: true,
    limit: 50,
    cursor: {
        id: "previousEventId",
        startsAt: 123456789,
    },
    getPastEvents: false,
})
```

### Get event

Returns an event.

`https://api.minicalendar.com/v1/event`

```ts
import { getEvent } from "@minicalendar/sdk"

const { event } = await getEvent({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    eventId: "eventId",
})
```

### Cancel event

Cancels an event.

`https://api.minicalendar.com/v1/cancel`

```ts
import { cancelEvent } from "@minicalendar/sdk"

const { event } = await cancelEvent({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    eventId: "eventId",
    reason: "reason",
    memberId: "memberId",
})
```

### Reschedule event

Reschedules an event.

`https://api.minicalendar.com/v1/reschedule`

```ts
import { rescheduleEvent } from "@minicalendar/sdk"

const { event } = await rescheduleEvent({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    eventId: "eventId",
    start: "1970-01-01T00:00:00.000Z",
})
```

### Add event

Adds an event.

`https://api.minicalendar.com/v1/add-event`

```ts
import { addEvent } from "@minicalendar/sdk"

const { event } = await addEvent({
    apiKey: process.env.MINICALENDAR_API_KEY!,
    workspaceId: "workspaceId",
    eventData: {
        title: "title",
        description: "description",
        start: "1970-01-01T00:00:00.000",
        end: "1970-01-01T01:00:00.000",
        timezone: "Europe/London",
        memberIds: ["memberId1", "memberId2"],
    },
})
```
