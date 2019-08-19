FROM node:8 as builder

COPY . /usr/src/app
WORKDIR /usr/src/app/frontend
RUN npm install
RUN npm run-script build

FROM nginx:1.15.5
COPY --from=builder /usr/src/app/frontend/build /usr/share/nginx/html
EXPOSE 80