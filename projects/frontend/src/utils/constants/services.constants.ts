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
