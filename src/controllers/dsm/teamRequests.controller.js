const teamRequestsServices = require('../../services/dsm/teamRequests.services');
// controller for creating team request
const createTeamRequest = async (req, res, next) => {
  try{
    const { author, content, status, type, createdAt, taggedIndividuals } = req.body;
    const createdRequest = await teamRequestsServices.createValidTeamRequest(author, content, status, type, createdAt, taggedIndividuals);
    res.status(201).json(createdRequest);
  }
  catch(error)
  {
    next(error);
  }
};
// controller for listing all team requests
const listTeamRequests = async (req, res, next) => {
  // query params for filetring on startDate, endDate, search keyword, status, page , limit and author
  const {
    type,
    author,
    startDate,
    endDate,
    search,
    status,
    page,
    limit
  } = req.query;
  try{
    const teamRequests = await teamRequestsServices.getAllTeamRequests(
      type,
      author,
      startDate,
      endDate,
      search,
      status,
      page,
      limit
    );
    res.status(200).json(teamRequests);
  }
  catch(error)
  {  
    next(error);
  }
};
// controller for editing team request
const editTeamRequest = async (req, res, next) => {
  try{
    const { requestId } = req.params;
    const { author, content, status, type, createdAt, taggedIndividuals } = req.body;
    const updatedRequest = await teamRequestsServices.editTeamRequest(requestId, author, content, status, type, createdAt, taggedIndividuals);
    res.status(200).json(updatedRequest);
  }
  catch(error)
  {
    next(error);
  }
};
// controller for deleting team request
const deleteTeamRequest = async (req, res, next) => {
  try{
    const { requestId } = req.params;
    const deletedRequest = await teamRequestsServices.deleteTeamRequest(requestId);
    res.status(204).json(deletedRequest);
  }
  catch(error)
  { 
    next(error);
  }
};
module.exports={createTeamRequest, listTeamRequests , editTeamRequest,deleteTeamRequest};