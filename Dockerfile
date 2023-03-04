FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

RUN npm i
# If you are building your code for production
# RUN npm ci --only=production

RUN npx prisma generate

# Bundle app source
COPY . .

EXPOSE 3001
CMD ["npm", "start"]