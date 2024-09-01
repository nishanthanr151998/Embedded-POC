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
                
                <input type="submit" value="Submit">
            </div>
        </form>
    `;
    document.body.appendChild(formContainer);

    // Handle "Next" button click
    document.getElementById('next').addEventListener('click', function() {
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'block';
    });

    // Handle form submission
    document.getElementById('embedded-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Form submitted!');
    });
})();
