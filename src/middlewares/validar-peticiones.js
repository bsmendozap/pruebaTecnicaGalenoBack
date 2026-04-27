import rateLimit from  "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    message: "Demasiadas peticiones, intenta de nuevo más tarde"
});

export default apiLimiter