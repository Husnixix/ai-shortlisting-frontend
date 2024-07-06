import { SignIn } from "@clerk/clerk-react"

function SignInPage () {
    return (
        <div className="flex min-h-svh justify-center items-center">
            <SignIn
                signUpUrl="/sign-up"
            />
        </div>
    )
}

export default SignInPage