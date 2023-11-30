#!/bin/bash
set -eo pipefail

#################################################
# Build layers, steps:
#       . copy default.js properties file to each 
#           brand's root directory.
#       . zip content
#           zip will be used by publish-delta.sh
#       . clean up
#################################################

# Copy default properties file to every brand.
cd ../../nodejs
find . -maxdepth 1 -mindepth 1 -type d | while IFS= read -r line; do echo `cp default.js ${line}`; done

# Prepare package.
cd ../
zip -vr layer_delta.zip nodejs/ -x "*.DS_Store"

# Clean up - This is done so local environment is kept clean.
cd nodejs
find . -maxdepth 1 -mindepth 1 -type d | while IFS= read -r line; do echo `rm -f ${line}/default.js`; done
