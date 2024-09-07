import { Blaze } from '@busy-hour/blaze';
import { User } from '../models/user.users';
import { IUser } from '../interfaces/user.users';
import { UserRoles } from '../utils/constants.users';
import { APP_SERVICE_PATH, context } from '../../../utils/constants';

export async function up() {
  const app = new Blaze();

  await app.load({
    path: APP_SERVICE_PATH,
  });

  const date = new Date();

  const users: IUser[] = await Promise.all(
    Array(5)
      .fill(null)
      .map(async (_, index) => {
        const username = `vendor-${index + 1}`;
        const passwordRes = await context.call('core.$hashText', {
          text: username,
        });

        if (!passwordRes.ok) {
          throw passwordRes.error;
        }

        return {
          username,
          password: passwordRes.result,
          companyName: `company-${index + 1}`,
          role: UserRoles.VENDOR,
          createdAt: date,
          updatedAt: date,
        };
      })
  );

  await User.create(users);
}

export async function down() {
  await User.deleteMany().where({
    username: {
      $in: Array(5)
        .fill(null)
        .map((_, index) => `vendor-${index + 1}`),
    },
    role: UserRoles.VENDOR,
  });
}
