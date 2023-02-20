const prisma = require('../../prismaClient');
const prismaUtils = require('../../utils/prismaUtils');
const selectOnlyValidTeamrequestsFields = {
    select: {
        requestId: true,
        author: true,
        content: true,
        status: true,
        type: true,
        createdAt: true,
        taggedIndividuals: true,
    }
};
// service to create a valid team request
const createValidTeamRequest = async (author, content, status, type, createdAt, taggedIndividuals) => {
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
    return createdRequest;
}
// service to get all team requests
const getAllTeamRequests = async (type,
    author,
    startDate,
    endDate,
    searchKeyword,
    status,
    page,
    limit) => {
    let filterObj = {};
    // using query params for filter requests with startDate, endDate, search keyword, status, page , limit and author) 
    const paginationObj = prismaUtils.getPaginationObject(page, limit);
    filterObj = startDate ? {
        ...filterObj, ...prismaUtils.getDateRangeObject(startDate, endDate)
    } : filterObj;
    filterObj = searchKeyword ? {
        ...filterObj, content: {
            contains: searchKeyword,
            mode: 'insensitive',
          }
    } : filterObj;
    filterObj = status ? {
        ...filterObj, ...prismaUtils.getStatusQueryObject(status)
    } : filterObj;
    filterObj = type ? {
        ...filterObj, type
    } : filterObj;
    filterObj = author ? {
        ...filterObj,author:author
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
// service to edit team requests
const editTeamRequest = async (requestId, author, content, status, type, createdAt, taggedIndividuals) => {
    const updatedRequest = await prisma.Request.update({
        where: {
            requestId: parseInt(requestId),
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
// service to delete team request by team request id
const deleteTeamRequest = async (requestId) => {
    const deleteRequest = await prisma.Request.delete(
        {
            where: {
                requestId: parseInt(requestId)
            }
        }
    )
    return deleteRequest;
}
module.exports = { createValidTeamRequest, getAllTeamRequests, editTeamRequest, deleteTeamRequest };