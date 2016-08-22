FROM node:6.4.0

MAINTAINER Quintype Developers <dev-core@quintype.com>

ENV NODE_ENV production

EXPOSE 3000

RUN apt-get update \
	&& apt-get install -y wget htop git \
	&& useradd -ms /bin/bash app

ADD . /app
RUN chown -R app:app /app

USER app
WORKDIR /app

RUN git log -n1 --pretty="Commit Date: %aD%nBuild Date: `date --rfc-2822`%n%h %an%n%s%n" > public/round-table.txt && \
    npm install && \
    ./node_modules/.bin/gulp --production

ENTRYPOINT ["npm"]
CMD ["start"]