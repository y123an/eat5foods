
import UpdateAccountForm from "@/components/forms/update-account-form";
import { prisma } from "@/lib/prisma-client";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  if (!id) return notFound();
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  if (!user) notFound();
  return (
    <main className="p-5">
      <UpdateAccountForm
        phone={user.phone || ""}
        email={user.email}
        name={user.name}
        role={user.role}
        id={user.id}
      />
    </main>
  );
}
