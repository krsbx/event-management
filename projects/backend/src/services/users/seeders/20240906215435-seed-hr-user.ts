import { User } from '../models/user.users';
import { IUser } from '../interfaces/user.users';
import { UserRoles } from '../utils/constants.users';
import { hashText } from '../../core/utils/$hash.core';

export async function up() {
  const date = new Date();

  const users: IUser[] = await Promise.all(
    Array(5)
      .fill(null)
      .map(async (_, index) => ({
        username: `hr-${index + 1}`,
        password: await hashText(`hr-${index + 1}`),
        companyName: `company-${index + 1}`,
        role: UserRoles.HUMAN_RESOURCE,
        createdAt: date,
        updatedAt: date,
      }))
  );

  await User.create(users);
}

export async function down() {
  await User.deleteMany().where({
    username: {
      $in: Array(5)
        .fill(null)
        .map((_, index) => `hr-${index + 1}`),
    },
    role: UserRoles.HUMAN_RESOURCE,
  });
}
