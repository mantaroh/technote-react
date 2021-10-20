import SpearlyCache from './SpearlyCache';
import invariant from 'invariant';
import { SpearlyApiClient } from '@spearly/sdk-js'

export default (clientOptions) => {
  invariant(
    clientOptions.domain,
    'SpearlyClient need the `domain`.'
  );

  invariant(
    clientOptions.apikey,
    'SpearlyClient need the `apikey`.'
  );

  invariant(
    clientOptions.apiVersion,
    'SpearlyClient need the `apiVersion`.'
  );

  const client = new SpearlyApiClient(
    clientOptions.domain,
    clientOptions.apiVersion,
    clientOptions.apikey
  );

  const cache = clientOptions.cache || new SpearlyCache();

  return {
    cache,
    ssrMode: clientOptions.ssrMode || false,
    ...client,
    checkCache: (requestKey) => {
      return cache.has(requestKey) && cache.read(requestKey);
    },
    getContent: async (id) => {
      try {
        const requestKey = JSON.stringify({id});
        const cacheEntry = cache.has(requestKey) && cache.read(requestKey);

        if (cacheEntry) {
          return Promise.resolve(cacheEntry);
        }

        const request = client.getContent(id);

        if (!clientOptions.ssrMode) {
          cache.write(requestKey, request);
        }

        const response = await request;
        cache.write(requestKey, response);

        return Promise.resolve(response);
      }
      catch (error) {
        return Promise.reject(error);
      }
    },
    getContentList: async (contentTypeId, options) => {
      try {
        const requestKey = JSON.stringify({ contentTypeId, options });
        const cacheEntry = cache.has(requestKey) && cache.read(requestKey);

        if (cacheEntry) {
          return Promise.resolve(cacheEntry);
        }

        const request = client.getList(contentTypeId, options);

        if (!clientOptions.ssrMode) {
          cache.write(requestKey, request);
        }

        const response = await request;
        cache.write(requestKey, response);

        return Promise.resolve(response);
      }
      catch (error) {
        return Promise.reject(error);
      }
    },
  };
};