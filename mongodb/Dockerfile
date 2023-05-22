FROM mongo:4.2.24-bionic

ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD 1234
ENV MONGO_INITDB_DATABASE IoTPlatform

# Add file
ADD ./data/IoTPlatform.js /docker-entrypoint-initdb.d

EXPOSE 27017