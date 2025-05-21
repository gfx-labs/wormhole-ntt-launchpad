import type { z } from 'zod'

const getZodFieldError = (
  validationResult: z.SafeParseReturnType<any, any>,
  fieldName: string,
  isEmpty?: boolean,
): string | undefined => {
  if (validationResult.success || isEmpty) return undefined
  return validationResult.error.errors.find((err) => err.path[0] === fieldName)?.message
}

export default getZodFieldError
