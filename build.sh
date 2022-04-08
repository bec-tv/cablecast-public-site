#!/bin/bash  

echo Removing existing build artifacts...
rm -rf dist/
rm dist.zip

echo Building Ember app for Production
ember build --environment=production

echo Installing Fastboot NPM packages...
cd dist/
npm install express && npm install fastboot-express-middleware@2.0.0
cd ..

echo Creating dist.zip archive...
ditto -c -k --sequesterRsrc --keepParent dist/ dist.zip

echo Finished.