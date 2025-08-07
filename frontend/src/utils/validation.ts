export const USERNAME_REGEX = /^\S{3,24}$/
export const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/
export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/
export const specialChars = '!?+-_,.=@#$%^&*|<>'
