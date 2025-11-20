import { z } from "zod";

export const GetCurrencyConvertDto = z.object({
  amount: z.string().transform((val, ctx) => {
    const num = Number(val);
    if (isNaN(num)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount must be a valid number",
      });
      return z.NEVER;
    }
    return num;
  }),
  from: z.string().length(3).regex(/^[A-Z]{3}$/, "Invalid currency code"),
  to: z.string().length(3).regex(/^[A-Z]{3}$/, "Invalid currency code"),
});
