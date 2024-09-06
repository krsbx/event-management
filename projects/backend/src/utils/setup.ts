import { Blaze } from '@busy-hour/blaze';
import { swaggerUI } from '@hono/swagger-ui';
import { env } from './env';

export function setupDoc(app: Blaze) {
  const security: Record<string, string[]>[] = [];
  const registry = app.router.openAPIRegistry;

  if (registry) {
    const jwtAuth = registry.registerComponent(
      'securitySchemes',
      'Authorization',
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Please provide a valid JWT token without the Bearer prefix',
      }
    );

    security.push({ [jwtAuth.name]: [] });
  }

  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Event Management',
    },
    security,
  });

  app.router.get('/doc/ui', swaggerUI({ url: '/doc' }));

  const serve = app.serve(env.PORT, (info) => {
    console.log(`🔥 Listening request on port ${info.port}`);
  });

  return serve;
}
