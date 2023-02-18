const teamRequestsServices = require('../../services/dsm/teamRequests.services');

/*  Request Model
model Request {
  id Int @id @unique @default(autoincrement())
  author Int // userID
  content String @db.VarChar(255)
  status RequestStatus @default(PENDING) // Enum - Status
  type RequestType // Enum - Type
  createdAt DateTime @default(now())
  taggedIndividuals RequestTaggedUser[]
}
*/ 
const createTeamRequest = async (req, res, next) => {
    try{
        const { author, content, status, type, createdAt, taggedIndividuals } = req.body;
        const createdRequest = await teamRequestsServices.createValidTeamRequest(author, content, status, type, createdAt, taggedIndividuals);
        res.status(201).json(createdRequest);
    }
    catch(error)
    {
        res.status(400).json({error: error.message});
    }
}
const listTeamRequests = async (req, res, next) => {
    const {
        type,
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
}
const editTeamRequest = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { author, content, status, type, createdAt, taggedIndividuals } = req.body;
        const updatedRequest = await teamRequestsServices.editTeamRequest(id, author, content, status, type, createdAt, taggedIndividuals);
        res.status(200).json(updatedRequest);

    }
    catch(error)
    {
        next(error);
    }
}
const deleteTeamRequest = async (req, res, next) => {
    try{
        const { id } = req.params;
        const deletedRequest = await teamRequestsServices.deleteTeamRequest(id);
        res.status(204).json(deletedRequest);
    }
    catch(error)
    { console.log(error);
        next(error);
    }
}
const getTeamRequestById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const teamRequest = await teamRequestsServices.getTeamRequestById(id);
        res.status(200).json(teamRequest);
    }
    catch(error)
    {
        next(error);
    
    }
}
module.exports={createTeamRequest, listTeamRequests , editTeamRequest,deleteTeamRequest,getTeamRequestById};