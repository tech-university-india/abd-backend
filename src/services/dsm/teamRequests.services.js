const prisma = require('../../prismaClient');
const prismaUtils = require('../../utils/prismaUtils');
/* Request Model
model Request {
  id Int @id @unique @default(autoincrement())
  author Int // userID
  content String @db.VarChar(255)
  status RequestStatus @default(PENDING) // Enum - Status
  type RequestType // Enum - Type
  createdAt DateTime @default(now())
  taggedIndividuals RequestTaggedUser[]
}*/
const selectOnlyValidTeamrequestsFields = {
    select: {
        id: true,
        author: true,
        content: true,
        status: true,
        type: true,
        createdAt: true,
        taggedIndividuals: true,
    }
};
const createValidTeamRequest = async (author, content, status, type, createdAt, taggedIndividuals) => {
    console.log("createValidTeamRequest");
    const createdRequest = await prisma.Request.create({
        data: {
            author,
            content,
            status,
            type,
            createdAt,
            ...(taggedIndividuals && { taggedIndividuals }),
        },
        ...selectOnlyValidTeamrequestsFields
    });
    console.log("createdRequest: " + createdRequest)
    return createdRequest;
}
const getAllTeamRequests = async (type,
    startDate,
    endDate,
    searchKeyword,
    status,
    page,
    limit) => {
    let filterObj = {};
    // using query params for filter requests with startDate, endDate, search keyword, status, page and limit) 
    const paginationObj = prismaUtils.getPaginationObject(page, limit);
    filterObj = startDate ? {
        ...filterObj, ...prismaUtils.getDateRangeObject(startDate, endDate)
    } : filterObj;
    filterObj = searchKeyword ? {
        ...filterObj, ...prismaUtils.getSearchKeywordObject(searchKeyword)
    } : filterObj;
    filterObj = status ? {
        ...filterObj, ...prismaUtils.getStatusQueryObject(status)
    } : filterObj;
    filterObj = type ? {
        ...filterObj, type
    } : filterObj;
    const teamRequests = await prisma.Request.findMany({
        where: {
            ...filterObj,
        },
        orderBy: {
            createdAt: 'desc',
        },
        ...(paginationObj && paginationObj),
        ...selectOnlyValidTeamrequestsFields
    }
    );
    return teamRequests;
}
const editTeamRequest = async (id, author, content, status, type, createdAt, taggedIndividuals) => {
    const updatedRequest = await prisma.Request.update({
        where: {
            id: parseInt(id),
        },
        data: {
            author,
            content,
            status,
            type,
            createdAt,
            ...(taggedIndividuals && { taggedIndividuals }),
        },
        ...selectOnlyValidTeamrequestsFields
    });
    return updatedRequest;
}
const deleteTeamRequest = async (id) => {
    const deleteRequest = await prisma.Request.delete(
        {
            where: {
                id: parseInt(id)
            }
        }
    )
    return deleteRequest;
}
const getTeamRequestById = async (id) => {
    const getRequestById = await prisma.Request.findMany(
        {
            where:
            {
                id: parseInt(id)
            }
        }
    )
    return getRequestById;
}
module.exports = { createValidTeamRequest, getAllTeamRequests, editTeamRequest, deleteTeamRequest, getTeamRequestById };