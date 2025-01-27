import authOptions from '@/app/api/auth/[...nextauth]/auth-options'
import SignupForm from '@/components/forms/signup-form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
console.log(process.env.GOOGLE_MAPS_API_KEY)
const SignUpPage = async () => {
    const session = await getServerSession(authOptions);
    if (session) return redirect(session.user.role.toLowerCase())
    return (
        <SignupForm googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY!} />
    )
}

export default SignUpPage