FROM node:12.21-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
# RUN set HTTP_PROXY=http://10.60.133.139:3128 && set HTTPS_PROXY=http://10.60.133.139:3128 && npm install
RUN npm install
COPY . ./
RUN npm run-script build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
