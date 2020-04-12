export NODE_ENV=production

project_dir=$(pwd)
rm -rf build

# transpile typescript
node ./node_modules/typescript/lib/tsc

# prepare fresh folder for client code
mkdir -p build/client/

# copy all files from src/client to build/client
cp -r src/client/* build/client/
cp src/client/.* build/client/ 2>/dev/null

# build next js project
cd "${project_dir}/build/client"
next build

# Remove everything except .next build folder
find . -depth 1 -type d ! -name '.next' ! -name 'public' -exec rm -rf "{}" +
find . -depth 1 -type f -exec rm "{}" +

# copy .env file
cp "${project_dir}/.env" "${project_dir}/build/"