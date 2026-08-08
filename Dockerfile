FROM golang:1.25 AS go-tools

WORKDIR /app
COPY tools/go.mod tools/go.sum ./tools/
RUN cd tools && go mod download

COPY tools ./tools
RUN cd tools && go build -o specgen ./cmd/specgen \
    && go build -o speccheck ./cmd/speccheck \
    && go build -o rpctestgen ./cmd/rpctestgen

FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
COPY --from=go-tools /app/tools/specgen /app/tools/specgen
COPY --from=go-tools /app/tools/speccheck /app/tools/speccheck
COPY --from=go-tools /app/tools/rpctestgen /app/tools/rpctestgen

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
