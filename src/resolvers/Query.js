async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};
  const links = await context.prisma.link.findMany({ where });
  return links;
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
