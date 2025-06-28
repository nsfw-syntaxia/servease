// in: src/app/actions.ts
'use server';

import { createClient } from '../lib/supabase/server';

export interface LoginResult {
  success: boolean;
  error?: string;
}

export async function login(formData: FormData): Promise<LoginResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login Error:', error.message);
    return { success: false, error: 'Invalid credentials. Please try again.' };
  }

  return { success: true };
}