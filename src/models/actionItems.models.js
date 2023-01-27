/** 
 * CRUD operations with generated Prisma API
 * https://www.prisma.io/docs/concepts/components/prisma-client/crud
*/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createActionItem(data) {
  const actionItem = await prisma.action_items.create({
    data: {
      ...data
    }
  });
  return actionItem;
}

async function listActionItems() {
  const actionItems = await prisma.action_items.findMany();
  return actionItems;
}

async function detailActionItem(id) {
  const actionItem = await prisma.action_items.findUnique({
    where: { 
      action_item_id: id
    }
  });
  return actionItem;
}

async function editActionItem(data) {
  const actionItem = await prisma.action_items.update({
    where: { 
      action_item_id: data.action_item_id 
    },
    data: { 
      ...data 
    },
  });
  return actionItem;
}

async function deleteActionItem(id) {
  const actionItem = await prisma.action_items.delete({
    where: { 
      action_item_id: id 
    },
  });
  return actionItem;
}

module.exports = {
  createActionItem,
  listActionItems,
  detailActionItem,
  editActionItem,
  deleteActionItem
};
