module.exports =(username) =>
`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Code Feast</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
      }

      .container {
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
      }

      .header {
        background: linear-gradient(90deg, #8613D6, #9A3FBA, #BA5795, #D16076, #FD6908);
        color: white;
        padding: 30px 20px;
        text-align: center;
      }

      .header h1 {
        margin: 0;
        font-size: 26px;
      }

      .content {
        padding: 30px 20px;
        color: #333;
      }

      .content h2 {
        color: #8613D6;
        margin-top: 0;
      }

      .content ul {
        padding-left: 20px;
      }

      .footer {
        background-color: #f4f4f4;
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #888;
      }

      .footer a {
        color: #8613D6;
        text-decoration: none;
      }

      @media (max-width: 600px) {
        .header h1 {
          font-size: 22px;
        }

        .content {
          padding: 20px 15px;
        }

        .content h2 {
          font-size: 18px;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Code Feast</h1>
      </div>

      <div class="content">
        <h2>Hello ${username},</h2>
        <p>We're thrilled to welcome you to <strong>Code Feast</strong> — your new home for culinary creativity and food inspiration</p>

        <p>As a member, you can:</p>
        <ul>
          <li>📷 Share your favorite recipes and food stories</li>
          <li>🍽️ Connect with chefs and food lovers around the world</li>
        </ul>

        <p style="margin-top: 25px;">Need help? Just reply to this email or contact us at
          <a href="mailto:josephrice1377@gmail.com">support@codefeast.com</a>.
        </p>

        <p style="margin-top: 35px;">Happy posting and bon appétit!</p>
        <p style="font-style: italic;">– The Code Feast Team</p>
      </div>

      <div class="footer">
        &copy; 2025 Code Feast<br />
        <a href="https://code-feast.netlify.app/">Visit our website</a>
      </div>
    </div>
  </body>
</html>
`