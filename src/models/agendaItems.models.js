/** 
 * CRUD operations with generated Prisma API
 * https://www.prisma.io/docs/concepts/components/prisma-client/crud
*/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createAgendaItem(data) {
  const agendaItem = await prisma.agenda_items.create({
    data: {
      ...data
    }
  });
  return agendaItem;
}

async function listAgendaItems() {
  const agendaItems = await prisma.agenda_items.findMany();
  return agendaItems;
}

async function detailAgendaItem(id) {
  const agendaItem = await prisma.agenda_items.findMany({
    where: { 
      agenda_item_id: id
    }
  });
  return agendaItem;
}

async function editAgendaItem(data) {
  const agendaItem = await prisma.agenda_items.update({
    where: { 
      agenda_item_id: data.agenda_item_id 
    },
    data: { 
      ...data 
    },
  });
  return agendaItem;
}

async function deleteAgendaItem(id) {
  const agendaItem = await prisma.agenda_items.delete({
    where: { 
      agenda_item_id: id 
    },
  });
  return agendaItem;
}

module.exports = {
  createAgendaItem,
  listAgendaItems,
  detailAgendaItem,
  editAgendaItem,
  deleteAgendaItem
};