rm -rf build
mkdir -p build/app/client/public
cp .env build/.env
cp src/app/client/public/* build/app/client/public/

export NODE_ENV=production

npm run tsc

rootDir=$(pwd)

cd build/app/client
rm -rf .next
next build

cd $rootDir
cd build

node index.js