FROM node
EXPOSE 80
EXPOSE 3000
EXPOSE 3005
RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN apt update
RUN apt install -y vim nano

RUN yarn install
RUN yarn run build

ENV HOST 0.0.0.0
ENV PORT 3000

CMD [ "yarn", "start" ]
