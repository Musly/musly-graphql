#!make

wipe:
		find . -name "*error.log" -type f -delete
		find . -name "*debug.log" -type f -delete
		find . -name ".eslintcache" -type f -delete
		find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
		find . -name "build" -type d -prune -exec rm -rf '{}' +
		find . -name ".cache-loader" -type d -prune -exec rm -rf '{}' +
		find . -name "coverage" -type d -prune -exec rm -rf '{}' +
		find . -name ".changelog" -type d -prune -exec rm -rf '{}' +

clean:
		make wipe
		yarn install --frozen-lockfile

refresh:
		make wipe
		yarn install
