import { SectionEditorPage } from "./SectionEditorPage";
import { CONTACT_SECTIONS, CONTACT_FORM_MAP } from "./ContactForms";

export const ContactSectionsPage = () => (
  <SectionEditorPage
    page="contact"
    pageLabel="Contact Page"
    sections={CONTACT_SECTIONS}
    formMap={CONTACT_FORM_MAP}
  />
);
