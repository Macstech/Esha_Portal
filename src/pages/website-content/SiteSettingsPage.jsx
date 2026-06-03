import { SectionEditorPage } from "./SectionEditorPage";
import { SITE_SECTIONS, SITE_FORM_MAP } from "./SiteForms";

export const SiteSettingsPage = () => (
  <SectionEditorPage
    page="site"
    pageLabel="Site Settings"
    sections={SITE_SECTIONS}
    formMap={SITE_FORM_MAP}
  />
);
