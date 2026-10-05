import { AreaPage, areaMetadata } from "@/components/site/area-page";

export const metadata = areaMetadata("celebracoes");

export default function Page() {
  return <AreaPage areaKey="celebracoes" />;
}
