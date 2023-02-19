const joi = require('joi');
/*
model Request {
  id Int @id @unique @default(autoincrement())
  author Int // userID
  content String @db.VarChar(255)
  status RequestStatus @default(PENDING) // Enum - Status
  type RequestType // Enum - Type
  createdAt DateTime @default(now())
  taggedIndividuals RequestTaggedUser[]
} */
const createValidTeamRequest= joi.object({
    author:joi
    .number()
    .integer()
    .min(1)
    .required(),
    content:joi
    .string()
    .min(1)
    .max(1500)
    .required(),
    type:joi
    .string()
    .valid('MEETING', 'RESOURCE'),
    taggedIndividuals:joi
    .array().items(joi.number().integer())
});
const editTeamRequest= joi.object(
    {
      author:joi
      .number()
      .integer()
      .min(1)
      .required(),
      content:joi
      .string()
      .min(1)
      .max(1500)
      .required(),
      taggedIndividuals:joi
      .array().items(joi.number().integer()),
      type:joi
      .string()
      .valid('MEETING', 'RESOURCE'),
      status:joi
      .string()
    }
)
const deleteTeamRequest = joi.object({
  id:joi
  .number()
  .integer()
  .min(1)
})
module.exports={createValidTeamRequest, editTeamRequest, deleteTeamRequest};