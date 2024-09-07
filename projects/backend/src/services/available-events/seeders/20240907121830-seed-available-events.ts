import { AvailableEvent } from '../models/available.events';

// All the available events for welness events
const eventNames = [
  'Health Talks',
  'Onsite Screenings',
  'Virtual Workshops',
  'Others',
];

export async function up() {
  const date = new Date();

  await AvailableEvent.create(
    eventNames.map((eventName) => ({
      eventName,
      createdAt: date,
      updatedAt: date,
    }))
  );
}

export async function down() {
  await AvailableEvent.deleteMany({
    eventName: {
      $in: eventNames,
    },
  });
}
