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

    // Function to apply styles from JSON
    function applyStyles(styles) {
        const style = document.createElement('style');

        const containerStyles = Object.entries(styles.container).map(([key, value]) => `${key}: ${value};`).join(' ');
        const formStyles = Object.entries(styles.form).map(([key, value]) => `${key}: ${value};`).join(' ');
        const buttonStyles = Object.entries(styles.button).map(([key, value]) => `${key}: ${value};`).join(' ');
        const buttonHoverStyles = Object.entries(styles["button-hover"]).map(([key, value]) => `${key}: ${value};`).join(' ');

        style.innerHTML = `
            #form-container { ${containerStyles} }
            #embedded-form { ${formStyles} }
            #embedded-form input[type="button"],
            #embedded-form input[type="submit"] { ${buttonStyles} }
            #embedded-form input[type="button"]:hover,
            #embedded-form input[type="submit"]:hover { ${buttonHoverStyles} }
        `;

        document.head.appendChild(style);
    }

    // Fetch and apply the selected styles
    const selectedStyle = getStyleFromScript();
    fetch('/styles')
        .then(response => response.json())
        .then(styles => {
            if (selectedStyle && styles[selectedStyle]) {
                applyStyles(styles[selectedStyle]);
            }
        });

    // Create the form dynamically
    const formContainer = document.createElement('div');
    formContainer.setAttribute('id', 'form-container');
    formContainer.innerHTML = `
        <form id="embedded-form">
            <div id="page1">
                <h1>Contact Us - Step 1</h1>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br><br>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br><br>
                
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" required><br><br>
                
                <input type="button" id="next" value="Next">
            </div>

            <div id="page2" style="display:none;">
                <h1>Contact Us - Step 2</h1>
                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea><br><br>
                
                <input type="button" id="back" value="Back">
                <input type="button" id="submit" value="Submit">
            </div>
        </form>
    `;
    document.body.appendChild(formContainer);

    // Retrieve and populate form data from sessionStorage
    function loadFormData() {
        const name = sessionStorage.getItem('name');
        const email = sessionStorage.getItem('email');
        const phone = sessionStorage.getItem('phone');
        const message = sessionStorage.getItem('message');
        
        if (name) document.getElementById('name').value = name;
        if (email) document.getElementById('email').value = email;
        if (phone) document.getElementById('phone').value = phone;
        if (message) document.getElementById('message').value = message;
    }

    loadFormData();

    // Handle "Next" button click and save data to sessionStorage
    document.getElementById('next').addEventListener('click', function() {
        // Store form data
        sessionStorage.setItem('name', document.getElementById('name').value);
        sessionStorage.setItem('email', document.getElementById('email').value);
        sessionStorage.setItem('phone', document.getElementById('phone').value);

        // Navigate to the next page
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'block';
    });

    // Handle "Back" button click to go back to page 1
    document.getElementById('back').addEventListener('click', function() {
        // Navigate back to the previous page
        document.getElementById('page2').style.display = 'none';
        document.getElementById('page1').style.display = 'block';

        // Load form data back into page 1 fields
        loadFormData();
    });

  // Handle form submission and store the message
  document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();

    // Store the message in sessionStorage
    sessionStorage.setItem('message', document.getElementById('message').value);
    alert('Form submitted!');

    // Clear sessionStorage and reset the form
    sessionStorage.clear();
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page1').style.display = 'block';

    // // Clear form fields
    document.getElementById('embedded-form').reset();
});
})();
