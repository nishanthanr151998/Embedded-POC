(function() {
    // Inject the CSS
    const style = document.createElement('style');
    style.innerHTML = `
        #form-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100vh;
        }

        #form-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: bold;
        }

        #embedded-form {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 400px;
            padding: 20px;
        }

        #embedded-form label,
        #embedded-form input,
        #embedded-form textarea {
            width: 100%;
            margin-bottom: 15px;
            text-align: left;
        }

        #embedded-form input[type="submit"] {
            width: auto;
            align-self: center;
            padding: 10px 20px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Create the form dynamically
    const formContainer = document.createElement('div');
    formContainer.setAttribute('id', 'form-container');
    formContainer.innerHTML = `
        <h1 id="form-title">Contact Us</h1>
        <form id="embedded-form">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required><br><br>
          
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required><br><br>
          
          <label for="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required><br><br>
          
          <label for="message">Message:</label>
          <textarea id="message" name="message" required></textarea><br><br>
          
          <input type="submit" value="Submit">
        </form>
    `;
    document.body.appendChild(formContainer);

    // Handle form submission
    document.getElementById('embedded-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Form submitted!');
    });
})();
