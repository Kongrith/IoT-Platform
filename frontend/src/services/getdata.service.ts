export const getData = async <T>(url: string, username: string, password: string): Promise<T> => {
  const res = await fetch(url, {
    method: 'Post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  });

  return await res.json();
}

export const getRegister = async <T>(url: string, username: string, email: string, password: string): Promise<T> => {
  const res = await fetch(url, {
    method: 'Post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ username, email, password })
  });

  return await res.json();
}

// กรณี Login สำเร็จ
export interface LoginResponse {
  access_token: string;
  token_type:   string;
  expires_in:   number;
}

export const getProfile = async (url: string) => {
  try {
    const haveSession = sessionStorage.getItem("token") || null
    
    if (haveSession !== null) {
      const token = JSON.parse(sessionStorage.getItem("token") || "") 
      const res = await fetch(url, {
        method: 'Get',
        headers:  {
          'Authorization': "Bearer " +  token
        },
      });
      return await res.json()
    }
    return await false

  } catch (error) {
    console.error(error);
    throw error;
  }
}