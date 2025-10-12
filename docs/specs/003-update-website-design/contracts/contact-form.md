# Contract: Contact Form (Mailto)

## Purpose
Provide a simple contact mechanism without a backend, with validation and feedback.

## Acceptance Criteria
- Required fields: name, email, message; subject optional
- Email must be valid format; show inline validation errors
- Submit action: opens default email client via `mailto:` with prefilled subject/body
- After triggering mailto, show an on-page confirmation/toast
- A direct "Email me" link is available as a fallback
- Reduced motion: no intrusive animations on validation
