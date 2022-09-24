import prisma from './helpers/prismaClient';

async function main() {
  const teste = await prisma.post.findMany();
  console.log(teste);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })