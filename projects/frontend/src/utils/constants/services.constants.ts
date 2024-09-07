export enum UserRoles {
  VENDOR = "vendor",
  HUMAN_RESOURCE = "human-resource",
}

export const userRoleOptions = [
  {
    label: "Vendor",
    value: UserRoles.VENDOR,
  },
  {
    label: "Human Resource",
    value: UserRoles.HUMAN_RESOURCE,
  },
];

export enum EventStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELED = "canceled",
}
