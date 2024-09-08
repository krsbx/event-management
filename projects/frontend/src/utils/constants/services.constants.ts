export enum UserRoles {
  VENDOR = "vendor",
  HUMAN_RESOURCE = "human-resource",
}

export const UserRoleMap = {
  [UserRoles.VENDOR]: "Vendor",
  [UserRoles.HUMAN_RESOURCE]: "Human Resource",
} as const;

export const userRoleOptions = [
  {
    label: UserRoleMap[UserRoles.VENDOR],
    value: UserRoles.VENDOR,
  },
  {
    label: UserRoleMap[UserRoles.HUMAN_RESOURCE],
    value: UserRoles.HUMAN_RESOURCE,
  },
];

export enum EventStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELED = "canceled",
}

export const EventStatusMap = {
  [EventStatus.PENDING]: "Pending",
  [EventStatus.APPROVED]: "Approved",
  [EventStatus.REJECTED]: "Rejected",
  [EventStatus.CANCELED]: "Canceled",
} as const;

export const eventStatusOptions = [
  {
    label: EventStatusMap[EventStatus.PENDING],
    value: EventStatus.PENDING,
  },
  {
    label: EventStatusMap[EventStatus.APPROVED],
    value: EventStatus.APPROVED,
  },
  {
    label: EventStatusMap[EventStatus.REJECTED],
    value: EventStatus.REJECTED,
  },
  {
    label: EventStatusMap[EventStatus.CANCELED],
    value: EventStatus.CANCELED,
  },
];
