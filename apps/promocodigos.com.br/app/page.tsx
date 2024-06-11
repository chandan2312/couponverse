import Homepage from "@repo/ui/pages/Homepage";
import { homeMetaData } from "@repo/ui/lib/metaDataGenerator";

export async function generateMetadata() {
  const meta = homeMetaData();
  return meta;
}

export default function HomePageApp() {
  return <Homepage />;
}
