import { getSiteSettings } from "@/lib/content/site-settings";
import { SettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

export default async function SiteSettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-foreground md:text-4xl">Site settings</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Logo, navigation, footer columns, social links, contact info and brand video. Changes apply across the whole site.
        </p>
      </header>
      <SettingsForm initial={settings} />
    </div>
  );
}
