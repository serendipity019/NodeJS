# version of node to use
FROM node:22 
# Directory to save image
WORKDIR /app 
# Install all dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"] 

# When will we have end with the orders then run in the terminal: docker build . -t ppapapanagiotou/node-products-app
# I used my name to know someone who create this image and after (/) is the name of our project where we want to give.  