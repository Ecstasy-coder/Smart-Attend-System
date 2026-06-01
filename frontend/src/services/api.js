const API_BASE = 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const token = localStorage.getItem('smartattend_token');
  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

export const loginUser = async (payload) => {
  return request('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const registerUser = async (formData) => {
  return fetch(`${API_BASE}/register`, {
    method: 'POST',
    body: formData,
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  });
};

export const fetchProfile = async () => {
  return request('/profile');
};

export const fetchUsers = async () => {
  return request('/admin/users');
};
