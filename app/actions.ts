'use server'

import { NEXT_PUBLIC_GOOGLE_FORM_ID } from "@/lib/config"

export async function joinWaitlist(prevState: any, formData: FormData) {
  const email = formData.get('email')
  const data = new URLSearchParams()
  
  if(email) {
    data.append('entry.797678204', email.toString())
  }

  try {
    await fetch(`https://docs.google.com/forms/d/e/${NEXT_PUBLIC_GOOGLE_FORM_ID}/formResponse`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    prevState.type = 'success';
  } catch (error) {
    prevState.type = 'error';
  }

  return prevState;
}
