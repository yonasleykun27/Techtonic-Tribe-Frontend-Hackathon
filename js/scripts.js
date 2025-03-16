document.addEventListener('DOMContentLoaded', function() {
    // Login form functionality
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', loginUser);
    }
  
    // Registration form functionality
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', registerUser);
    }
  
    // Start session timer on dashboard page
    if (document.getElementById('timer')) {
      startTimer();
    }
  });
  
  // Hard-coded sample admin credentials
  const adminCredentials = {
    phone: 'admin',
    password: 'admin123'
  };
  
  // Registration function for parents
  function registerUser(event) {
    event.preventDefault();
    
    const parentName = document.getElementById('parentName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const childName = document.getElementById('childName').value.trim();
    const childAge = document.getElementById('childAge').value;
    
    // Save registration data (in a real app, use a backend)
    const userData = { parentName, phone, password, childName, childAge };
    localStorage.setItem('user_' + phone, JSON.stringify(userData));
    
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
  }
  
  // Login function for both admin and parent users
  function loginUser(event) {
    event.preventDefault();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    
    // Check admin credentials first
    if (phone === adminCredentials.phone && password === adminCredentials.password) {
      window.location.href = 'admin.html';
      return;
    }
    
    // Check parent registration data
    const storedData = localStorage.getItem('user_' + phone);
    if (storedData) {
      const userData = JSON.parse(storedData);
      if (userData.password === password) {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
        window.location.href = 'dashboard.html';
      } else {
        alert('Incorrect password.');
      }
    } else {
      alert('User not found. Please register first.');
      window.location.href = 'register.html';
    }
  }
  
  // Session timer based on child's age group in seconds
  function startTimer() {
    const userData = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!userData) return;
    
    let timeLimit;
    const childAge = userData.childAge;
    
    // Convert minutes to seconds:
    // 2-4: 30 minutes, 4-7: 90 minutes, 8-10: 150 minutes
    if (childAge === '2-4') {
      timeLimit = 30 * 60;      // 1800 seconds
    } else if (childAge === '4-7') {
      timeLimit = 90 * 60;      // 5400 seconds
    } else if (childAge === '8-10') {
      timeLimit = 150 * 60;     // 9000 seconds
    } else {
      timeLimit = 30 * 60;      // default to 30 minutes if not set
    }
    
    let timeRemaining = timeLimit;
    const timeDisplay = document.getElementById('time');
    
    const timerInterval = setInterval(() => {
      let hours = Math.floor(timeRemaining / 3600);
      let minutes = Math.floor((timeRemaining % 3600) / 60);
      let seconds = timeRemaining % 60;
      timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        alert('Session time is over. Logging out.');
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
      }
      timeRemaining--;
    }, 1000);
  }
  
  // Utility to pad numbers with leading zero
  function pad(num) {
    return num < 10 ? '0' + num : num;
  }
  