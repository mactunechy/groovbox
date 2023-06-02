import { prisma } from '@utils/db';
import { ROLES } from '@utils/enums';

export const GET = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: ROLES.DJ,
    },
    select: {
      id: true,
      name: true,
    },
  });
  return new Response(JSON.stringify(users), { status: 200 });
};
