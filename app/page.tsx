
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return redirect("/shop");
  return redirect('/admin');
};

export default page;
