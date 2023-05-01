import { number, object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "first name is required",
    }),
    lastName: string({
      required_error: "last name is required",
    }),
    password: string({
      required_error: "password is required",
    }).min(6, "password must be at least 6 characters long"),
    passwordConfirmation: string({
      required_error: "password confirmation is required",
    }),
    email: string({
      required_error: "email name is required",
    }).email("not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }).email("not a valid email"),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string(),
  }),
  body: object({
    password: string({
      required_error: "password is required",
    }).min(6, "password must be at least 6 characters long"),
    passwordConfirmation: string({
      required_error: "password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const updateBalanceSchma = object({
  body: object({
    coin: string({
      required_error: "coin must be explicitly named"
    }),
    action: string({
      required_error: "action must be explicitly named"
    }),
    value: number({
      required_error: 'number must be explicitly named'
    })
  })
})

export type UpdateBalanceInput = TypeOf<typeof updateBalanceSchma>["body"]
export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
