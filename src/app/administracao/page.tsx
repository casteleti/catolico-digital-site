import { AreaPage, areaMetadata } from "@/components/site/area-page";

export const metadata = areaMetadata("administracao");

export default function Page() {
  return <AreaPage areaKey="administracao" />;
}
