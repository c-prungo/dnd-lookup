# Fetch the latest version of MeiliSearch image from DockerHub
docker pull getmeili/meilisearch:latest

# Launch MeiliSearch
docker run -it --rm \
    -p 7700:7700 \
    -v $(pwd)/data.ms:/data.ms \
    getmeili/meilisearch:latest