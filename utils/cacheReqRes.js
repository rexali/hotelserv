var Cache = require("cache");


const cache = new Cache(10 * 1000); // expire in 10 second

export function cacheReqRes(req, resVal) {
    try {
        cache.put(req.originalUrl, resVal);
    } catch (error) {
        console.error(error)
    }
}

export function getCachedReqRes(req) {
    return cache.get(req.originalUrl);
}