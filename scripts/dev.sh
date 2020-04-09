export NODE_ENV=dev

ts-node-dev \
	--ignore-watch app/client \
	--respawn \
	--transpileOnly ./src/index.ts