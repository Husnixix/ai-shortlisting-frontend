import { SignUp } from "@clerk/clerk-react"
function SignUpPage () {
    return (
        <div className="flex min-h-svh justify-center items-center">
            <SignUp
                signInUrl="/sign-in"
            />
        </div>
    )
}

export default SignUpPage