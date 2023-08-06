const rateLimit = require('express-rate-limit');

export const limiter1= rateLimit({
	windowMs: 5*1000, // 5 sec
	max: 5, 
    message:"Too many requests",
	standardHeaders: true, 
	legacyHeaders: false, 
});
export const limiter2 = rateLimit({
	windowMs: 10*1000, // 10 sec
	max: 8, //
    message:"Too many requests",
	standardHeaders: true, 
	legacyHeaders: false, 
});
export const limiter3 = rateLimit({
	windowMs: 20*1000, // 20 sec
	max: 12, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message:"Too many requests",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
export const limiter4 = rateLimit({
	windowMs: 30*1000, // 30 sec
	max: 15,
    message:"Too many requests",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
export const limiter5 = rateLimit({
	windowMs: 60*1000, //60 sec
	max: 20, 
    message:"Too many requests",
	standardHeaders: true, 
	legacyHeaders: false, 
    
});
export const limiter6 = rateLimit({
	windowMs: 30*60*1000, // 30 sec
	max: 150, 
    message:"Too many requests",
	standardHeaders: true, 
	legacyHeaders: false, 
});
export const limiter7 = rateLimit({
	windowMs: 60*60*1000, // 60h
	max: 300, 
    message:"Too many requests",
	standardHeaders: true, 
	legacyHeaders: false, 
});

