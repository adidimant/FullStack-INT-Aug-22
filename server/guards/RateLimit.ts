
const rateLimit = require('express-rate-limit');
const secondInMs = 1000;

export const rate5Limiter = rateLimit({
    windowMs: 5 * secondInMs,
    max:5
})
export const rate10Limiter = rateLimit({
    windowMs: 10 * secondInMs,
    max:8
})
export const rate20Limiter = rateLimit({
    windowMs: 20 * secondInMs,
    max:12
})
export const rate30Limiter = rateLimit({
    windowMs: 30 * secondInMs,
    max:15
})
export const rate60Limiter = rateLimit({
    windowMs: 60* secondInMs,
    max:20
})
export const rate1800Limiter = rateLimit({
    windowMs: 1800 * secondInMs,
    max:150
})
export const rate3600Limiter = rateLimit({
    windowMs: 3600 * secondInMs,
    max:300
})
