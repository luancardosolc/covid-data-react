FROM node:lts

WORKDIR /app

COPY . .

EXPOSE 3000

# Bellow you can chose install the packages and run or just run the app
# CMD ["yarn", "dev"]
CMD ["sh", "-c", "yarn install && yarn dev"]
