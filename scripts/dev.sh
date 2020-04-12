export NODE_ENV=dev

ts-node-dev \
	--ignore-watch src/client \
	--respawn \
	--transpileOnly ./src/index.ts