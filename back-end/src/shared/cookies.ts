export const jwtCookieExp = process.env.COOKIE_JWT_EXP_DAYS || 3;

export const jwtCookieProps = Object.freeze({
  key: process.env.JWT_COOKIE_KEY!,
  options: {
    domain: process.env.COOKIE_DOMAIN,
    httpOnly: process.env.HTTP_ONLY_COOKIE === "true",
    maxAge: 1000 * 60 * 60 * 24 * Number(jwtCookieExp),
    path: process.env.JWT_COOKIE_PATH,
    secure: process.env.SECURE_COOKIE === "true",
    signed: process.env.SIGNED_COOKIE === "true",
  },
});
