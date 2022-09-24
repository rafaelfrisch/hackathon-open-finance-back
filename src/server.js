const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const teste = await prisma.post.findMany();
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