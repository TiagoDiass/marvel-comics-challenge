type GenerateEmailToLinkParams = {
  to: string;
  subject: string;
  body: string;
};

export default function generateEmailToLink({ to, subject, body }: GenerateEmailToLinkParams) {
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
