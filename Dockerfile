FROM node:latest as base-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ARG CLIENT_ID
ARG REDIRECT

RUN REACT_APP_CLIENT_ID=${CLIENT_ID} \
    REACT_APP_REDIRECT=${REDIRECT} \
    npm run build

FROM nginx:latest as prod_stage
RUN sed -i 's,location / {,location / {try_files $uri $uri/ /index.html?/$request_uri;,g' /etc/nginx/conf.d/default.conf
COPY --from=base-stage /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;" ]

