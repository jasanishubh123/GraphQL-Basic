import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
}

async function main() {
	const allUsers = await prisma.user.create({
    data:{
      email:"dsdnn@dsd.dsd",
      "name":"Dsds"
    }
  });
	console.log(allUsers);
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

export const context: Context = {
  prisma: prisma
}