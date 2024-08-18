(function() {
    // Function to get the style query parameter from the script URL
    function getStyleFromScript() {
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes('form.js')) {
                const url = new URL(scripts[i].src);
                return url.searchParams.get('style');
            }
        }
        return null;
    }

    // Define styles for Apple and Microsoft
    const styles = {
        apple: `
            #form-container {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                height: 100vh;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                background-color: #fff; /* Purple background for Apple */
                color: #6a0dad;
            }

            #embedded-form {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                max-width: 400px;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                background-color: white;
            }
                

            #embedded-form input[type="submit"] {
                background-color: #007aff; /* Apple blue */
                color: white;
                border: none;
                border-radius: 5px;
                padding: 10px 20px;
                cursor: pointer;
                text-align: center;
            }

            #embedded-form input[type="submit"]:hover {
                background-color: #005bbb;
            }
        `,
        microsoft: `
            #form-container {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                height: 100vh;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                background-color: #fff; /* Azure blue background for Microsoft */
                color: #0078d4;
            }

            #embedded-form {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                max-width: 400px;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                background-color: white;
            }

            #embedded-form input[type="submit"] {
                background-color: #0078d4; /* Microsoft Azure blue */
                color: black;
                border: none;
                border-radius: 5px;
                padding: 10px 20px;
                cursor: pointer;
                text-align: center;
            }

            #embedded-form input[type="submit"]:hover {
                background-color: #005a9e;
            }
        `
    };

    // Get the style from the script tag
    const selectedStyle = getStyleFromScript();

    // Inject the corresponding CSS
    if (selectedStyle && styles[selectedStyle]) {
        const style = document.createElement('style');
        style.innerHTML = styles[selectedStyle];
        document.head.appendChild(style);
    }

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
