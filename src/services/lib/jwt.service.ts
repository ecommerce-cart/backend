import jwt from 'jsonwebtoken'

export const generateToken = (data: Record<string, unknown>, secret: string, expiresIn: number) => {
  return jwt.sign(data, secret, {
    expiresIn,
  })
}

export const generateRefreshToken = (data: Record<string, unknown>) =>
  generateToken(data, process.env.JWT_GENERATE_TOKEN_SECRET, 365 * 24 * 60 * 60)

export const generateAccessToken = (data: Record<string, unknown>) =>
  generateToken(data, process.env.JWT_ACCESS_TOKEN_SECRET, 30)
