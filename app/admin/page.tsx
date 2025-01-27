import { Dashboard } from "@/components/pages/dashboard";
import { getDashboardData } from "@/lib/data";
import { generateMetadata } from "@/lib/meta-data";
import { DashboardData } from "@/types/dashboard";

export default async function DashboardPage() {
  let data: DashboardData | null = null;
  let error: string | null = null;

  try {
    data = await getDashboardData();
  } catch (e) {
    console.error("Error fetching dashboard data:", e);
    error = "Failed to load dashboard data. Please try again later.";
  }

  return (
    <main className=" mx-auto px-4 py-8">
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : data ? (
        <Dashboard data={data} />
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </main>
  );
}



export const metadata = generateMetadata({
  title: "Eat5Foods | Admin Dashboard"
})