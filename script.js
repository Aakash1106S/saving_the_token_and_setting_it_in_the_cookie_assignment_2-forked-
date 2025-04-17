// Login function to fetch the token from the server
async function loginUser() {
  const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'testUser' }), // Replace 'testUser' with a real username
  });

  const data = await response.json();
  console.log('Token received:', data.token);

  // Save token in localStorage
  if (data.token) {
      localStorage.setItem('authToken', data.token);
      alert('Token saved successfully!');
  } else {
      alert('Failed to log in.');
  }
}

// Access protected route using the token
async function accessProtectedRoute() {
  const token = localStorage.getItem('authToken');
  if (!token) {
      alert('No token found. Please log in first!');
      return;
  }

  const response = await fetch('http://localhost:3000/protected', {
      method: 'GET',
      headers: {
          'Authorization': token,
      },
  });

  const data = await response.json();
  console.log('Protected route response:', data);

  if (response.status === 401 || response.status === 403) {
      alert('Access denied. Please check your token.');
  } else {
      alert('Access granted!');
  }
}

// Attach event listeners to buttons
document.getElementById('loginBtn').addEventListener('click', loginUser);
document.getElementById('protectedBtn').addEventListener('click', accessProtectedRoute);
