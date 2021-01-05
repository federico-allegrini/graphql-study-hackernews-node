function feed(parent, args, context, info) {
  return context.prisma.link.findMany();
}
async function link(parent, args, context, info) {
  const link = await context.prisma.link.findUnique({
    where: {
      id: parseInt(args.id),
    },
  });
  return link;
}

module.exports = {
  feed,
  link,
};
