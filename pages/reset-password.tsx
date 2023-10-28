import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { routes } from '@/utils/routes'
import { apiUrl } from '@/env'
import Layout from '@/components/ui/layout/Layout'
import PasswordComponent from '@/components/ui/form/PasswordComponent'
import * as yup from 'yup'
import { useAuth } from '@/providers/Auth'
import { yupResolver } from '@hookform/resolvers/yup'

const createAccountSchema = yup.object().shape({
	password: yup
		.string()
		.min(6)
		.required(),
  token: yup.string().required(),
});

type resetPasswordSchemaType = yup.InferType<typeof createAccountSchema>;

const classNames = {
	label: "text-xs font-medium text-neutral-600",
	input: "input input-bordered w-full",
	error: "pt-2 text-red-400",
	container: "mb-4",
};

const ResetPassword: React.FC = () => {
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useMemo(() => new URLSearchParams(router.query as any), [router.query])
  const token = searchParams.get('token')

  const methods = useForm<resetPasswordSchemaType>({
		resolver: yupResolver(createAccountSchema),
		mode: "all",
	});
	const {
		handleSubmit,
		register,
    reset,
		formState: { errors, isSubmitting, isValid },
	} = methods;


  const onSubmit = useCallback(
    async (data: resetPasswordSchemaType) => {
      const response = await fetch(`${apiUrl}/api/users/reset-password`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const json = await response.json()

        // Automatically log the user in after they successfully reset password
        await login({ email: json.user.email, password: data.password })

        // Redirect them to `/account` with success message in URL
        router.push(`/${routes.pages.dashboard.account.index}?success=Password reset successfully.`)
      } else {
        setError('There was a problem while resetting your password. Please try again later.')
      }
    },
    [router, login],
  )

  // when Next.js populates token within router,
  // reset form with new token value
  useEffect(() => {
    reset({ token: token || undefined })
  }, [reset, token])

  return (
    <Layout>
      <h1>Reset Password</h1>
      <p>Please enter a new password below.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 gap-4">
        {/* <Message error={error} className="text-red-400" /> */}
        
        <PasswordComponent
            label="Password"
            name="password"
            register={register}
            errors={errors}
            isValid={isValid}
          />
        <input type="hidden" {...register('token')} />
        <button
						type="submit"
						disabled={isSubmitting || !isValid}
						className="btn btn-primary w-full mt-4"
					>
						{isSubmitting ? "Processing" : "Login"}
					</button>

					{error && <div className="text-red-400">{error}</div>}
      </form>
    </Layout>
  )
}

export default ResetPassword
