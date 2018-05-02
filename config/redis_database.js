import redis from 'redis';
let redisClient = redis.createClient(6379);

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

redisClient.on('connect', function () {
    console.log('Redis is ready');
});

export default {
    redis,
    redisClient
}