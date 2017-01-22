#!/bin/sh
sbt test docker:publishLocal

docker stop $(docker ps --filter "id=${HOSTNAME}" --format "{{.Names}}" | sed 's/_todo/_database/')
