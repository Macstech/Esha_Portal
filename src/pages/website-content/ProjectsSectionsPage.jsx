import { SectionEditorPage } from "./SectionEditorPage";
import { PROJECTS_SECTIONS, PROJECTS_FORM_MAP } from "./ProjectsForms";

export const ProjectsSectionsPage = () => (
  <SectionEditorPage
    page="projects"
    pageLabel="Projects Page"
    sections={PROJECTS_SECTIONS}
    formMap={PROJECTS_FORM_MAP}
  />
);
