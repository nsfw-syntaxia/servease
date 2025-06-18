// Location: src/app/register/page.tsx
// --- CORRECTED ---

// Import ClientSignup1 as the default export (no curly braces)
import ClientSignup1 from './register'; 

export default function RegisterRoute() {
  // Now, ClientSignup1 is a valid component and this will work
  return <ClientSignup1 />;
}