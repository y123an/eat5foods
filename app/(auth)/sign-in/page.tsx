import authOptions from "@/app/api/auth/[...nextauth]/auth-options";
import SignInForm from "@/components/forms/signin-form";
import BackButton from "@/components/shared/back-button";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/sign-in");
  return (
    <main className="w-screen dark:bg-slate-950 dark:text-white  py-7 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold py-5">
        Login in to your account ?{" "}
      </h2>
      <div className="w-full py-5 px-2 md:w-1/3 ">
        <div className="my-2 p-2  flex items-center space-x-2 ">
          <BackButton />
          <p>Back</p>
        </div>
        <SignInForm />
      </div>
    </main>
  );
}
