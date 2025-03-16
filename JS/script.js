document.addEventListener("DOMContentLoaded", function() {
    // Elements for registration, login, and progress
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const progressDisplay = document.getElementById("progressDisplay");
    const childProgressDiv = document.getElementById("childProgress");
  
    let currentUser = null;
  
    // Default progress structure for a new user
    const defaultProgress = {
      lessonsCompleted: 0,
      badges: 0
    };
  
    // Registration form handler
    registerForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("regName").value;
      const age = document.getElementById("regAge").value;
      const avatar = document.getElementById("regAvatar").value || "placeholder.jpg";
      // Create user object with progress tracking
      const user = { name, age, avatar, progress: { ...defaultProgress } };
      localStorage.setItem("ethiopisUser", JSON.stringify(user));
      alert("Registration successful! Please login.");
      registerForm.reset();
    });
  
    // Login form handler
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("loginName").value;
      const storedUser = JSON.parse(localStorage.getItem("ethiopisUser"));
      if (storedUser && storedUser.name === name) {
        currentUser = storedUser;
        alert("Login successful! Welcome, " + currentUser.name);
        updateProgress();
      } else {
        alert("User not found. Please register.");
      }
      loginForm.reset();
    });
  
    // Play audio button handler for lessons
    document.querySelectorAll(".play-audio").forEach(function(button) {
      button.addEventListener("click", function() {
        const audioFile = button.getAttribute("data-audio");
        // Simulate playing audio (replace with actual audio functionality if needed)
        alert("Playing audio: " + audioFile);
        
        // Update progress for lesson completion
        if (currentUser) {
          currentUser.progress.lessonsCompleted += 1;
          // Award a badge for every 3 lessons completed
          currentUser.progress.badges = Math.floor(currentUser.progress.lessonsCompleted / 3);
          localStorage.setItem("ethiopisUser", JSON.stringify(currentUser));
          updateProgress();
        }
      });
    });
  
    // Start game button handler (simulated)
    document.querySelectorAll(".start-game").forEach(function(button) {
      button.addEventListener("click", function() {
        const gameName = button.getAttribute("data-game");
        alert("Starting game: " + gameName);
        // Simulate progress gain from game play
        if (currentUser) {
          currentUser.progress.lessonsCompleted += 1;
          currentUser.progress.badges = Math.floor(currentUser.progress.lessonsCompleted / 3);
          localStorage.setItem("ethiopisUser", JSON.stringify(currentUser));
          updateProgress();
        }
      });
    });
  
    // Function to update the progress displays on the page
    function updateProgress() {
      if (currentUser) {
        progressDisplay.innerHTML = `
          <p>Lessons Completed: ${currentUser.progress.lessonsCompleted}</p>
          <p>Badges Earned: ${currentUser.progress.badges}</p>
        `;
        childProgressDiv.innerHTML = `
          <p>Child: ${currentUser.name}</p>
          <p>Age: ${currentUser.age}</p>
          <p>Lessons Completed: ${currentUser.progress.lessonsCompleted}</p>
          <p>Badges Earned: ${currentUser.progress.badges}</p>
        `;
      }
    }
  });
  