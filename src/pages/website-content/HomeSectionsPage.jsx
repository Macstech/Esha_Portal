import { SectionEditorPage } from "./SectionEditorPage";
import { HOME_SECTIONS } from "./homeDefaults";
import { SECTION_FORM_MAP } from "./SectionForms";

export const HomeSectionsPage = () => (
  <SectionEditorPage
    page="home"
    pageLabel="Home Page"
    sections={HOME_SECTIONS}
    formMap={SECTION_FORM_MAP}
  />
);
