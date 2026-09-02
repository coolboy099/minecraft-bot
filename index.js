<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Instagram</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    body {
      background-color: #0b141b;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      width: 100%;
      max-width: 400px;
      padding: 20px;
      text-align: center;
    }

    /* Page 1 Styles */
    .hero-title {
      font-size: 2.2rem;
      font-weight: bold;
      margin-bottom: 25px;
    }

    .tagline {
      font-size: 1.8rem;
      font-weight: 600;
      line-height: 1.3;
      margin-bottom: 40px;
      color: #ffffff;
    }

    .highlight {
      background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .btn-primary {
      width: 100%;
      background-color: #0064e0;
      color: white;
      border: none;
      padding: 14px;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 20px;
    }

    .link-text {
      color: #0095f6;
      text-decoration: none;
      font-size: 0.95rem;
      cursor: pointer;
    }

    /* Page 2 Styles */
    .logo-img {
      width: 60px;
      height: 60px;
      margin-bottom: 40px;
    }

    .input-group {
      margin-bottom: 12px;
    }

    .input-field {
      width: 100%;
      padding: 16px;
      background-color: #121f29;
      border: 1px solid #263847;
      border-radius: 12px;
      color: white;
      font-size: 0.95rem;
      outline: none;
    }

    .input-field::placeholder {
      color: #8e8e8e;
    }

    .btn-secondary-outline {
      width: 100%;
      background: transparent;
      border: 1px solid #0064e0;
      color: #0064e0;
      padding: 12px;
      border-radius: 25px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 40px;
    }

    /* Page 3 Styles (Error Screen) */
    .error-card {
      background-color: #121f29;
      border: 1px solid #263847;
      padding: 30px 20px;
      border-radius: 16px;
    }

    .error-icon {
      font-size: 3rem;
      margin-bottom: 15px;
    }

    .error-title {
      font-size: 1.2rem;
      font-weight: bold;
      color: #ff4d4d;
      margin-bottom: 10px;
    }

    .error-msg {
      color: #a8b3cf;
      font-size: 0.95rem;
      line-height: 1.4;
    }

    .meta-footer {
      margin-top: 40px;
      color: #8e8e8e;
      font-size: 0.8rem;
    }
  </style>
</head>
<body>

  <div id="page1" class="container">
    <h1 class="hero-title">Instagram</h1>
    <h2 class="tagline">Share <span class="highlight">everyday moments</span> with your close friends.</h2>
    <button class="btn-primary" onclick="goToPage(2)">Open Instagram</button>
    <p><a class="link-text" onclick="goToPage(2)">Log in</a> or <a class="link-text" onclick="goToPage(2)">sign up</a></p>
    <div class="meta-footer">from Meta</div>
  </div>

  <div id="page2" class="container" style="display: none;">
    <svg class="logo-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad)"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#ig-grad)"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#ig-grad)"></line>
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f09433"/>
          <stop offset="25%" stop-color="#e6683c"/>
          <stop offset="50%" stop-color="#dc2743"/>
          <stop offset="75%" stop-color="#cc2366"/>
          <stop offset="100%" stop-color="#bc1888"/>
        </linearGradient>
      </defs>
    </svg>

    <form id="loginForm" onsubmit="handleLogin(event)">
      <div class="input-group">
        <input type="text" class="input-field" placeholder="Username, email or mobile number" required>
      </div>
      <div class="input-group">
        <input type="password" class="input-field" placeholder="Password" required>
      </div>
      <button type="submit" class="btn-primary" style="margin-top: 15px;">Log in</button>
    </form>

    <p style="margin-top: 15px;"><a class="link-text" style="color: #a8b3cf;">Forgot password?</a></p>
    <button class="btn-secondary-outline">Create new account</button>
    <div class="meta-footer">from Meta</div>
  </div>

  <div id="page3" class="container" style="display: none;">
    <div class="error-card">
      <div class="error-icon">⚠️</div>
      <div class="error-title">Access Restricted</div>
      <div class="error-msg">Your server is not available in your region.</div>
    </div>
  </div>

  <script>
    function goToPage(pageNum) {
      document.getElementById('page1').style.display = 'none';
      document.getElementById('page2').style.display = 'none';
      document.getElementById('page3').style.display = 'none';

      document.getElementById('page' + pageNum).style.display = 'block';
    }

    function handleLogin(event) {
      event.preventDefault(); // Page refresh hone se rokta hai
      goToPage(3); // Direct Error Screen pe bhejega
    }
  </script>
</body>
</html>
