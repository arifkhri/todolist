FROM node:16.16-alpine as todolist

WORKDIR /usr/src/app
COPY ./package.json ./package.json
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=todolist /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]