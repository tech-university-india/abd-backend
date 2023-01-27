/** 
 * CRUD operations with generated Prisma API
 * https://www.prisma.io/docs/concepts/components/prisma-client/crud
*/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createKeyDecision(data) {
  const keyDecision = await prisma.key_decisions.create({
    data: {
      ...data
    }
  });
  return keyDecision;
}

async function listKeyDecisions() {
  const keyDecisions = await prisma.key_decisions.findMany();
  return keyDecisions;
}

async function detailKeyDecision(id) {
  const keyDecision = await prisma.key_decisions.findUnique({
    where: {
      key_decision_id: id
    }
  });
  return keyDecision;
}

async function editKeyDecision(data) {
  const keyDecision = await prisma.key_decisions.update({
    where: { 
      key_decision_id: data.id 
    },
    data: { 
      ...data 
    },
  });
  return keyDecision;
}

async function deleteKeyDecision(id) {
  const keyDecision = await prisma.key_decisions.delete({
    where: { 
      key_decision_id: id 
    },
  });
  return keyDecision;
}

module.exports = {
  createKeyDecision,
  listKeyDecisions,
  detailKeyDecision,
  editKeyDecision,
  deleteKeyDecision
};