#!/bin/bash

echo ""
echo "Starting Leave A Comment in Dev"
echo ""
npm run start --prefix leave-a-comment-front &
npm run start:dev --prefix leave-a-comment-back/ &
trap 'pkill -P $$' SIGINT SIGTERM
wait