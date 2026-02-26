import { getChickens } from "@/lib/actions/chicken.actions";
import ChickenDashboard from "@/components/ChickenDashboard";

export default async function HomePage() {
  const chickens = await getChickens();
  return <ChickenDashboard initialChickens={chickens} />;
}
