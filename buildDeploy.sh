#!/bin/bash

image=gcr.io/parkplanr-dev/inbound-email
region=europe-north1

function deployService {
	service=inbound-email
	echo "Deploying inbound email hoom image: $image to service: $service"
	gcloud run deploy $service --image $image --platform managed --region $region
}

echo "Prettifying index.js"
prettier -w index.js

echo "Lint checks"
standard --fix index.js

if [ $? != 0 ];then
	exit $?
fi

echo "Building container image: $image"
gcloud builds submit --tag $image

deployService
