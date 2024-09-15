document.addEventListener('DOMContentLoaded', () => {
    const customerSelect = document.getElementById('customer-select');
    const styleEditor = document.getElementById('style-editor');
    const previewContainer = document.getElementById('preview-container');
    let currentStyles = {};

    // Function to update the script tag for form.js with the selected style
    function updateFormScript(customer) {
        const existingScript = document.getElementById('script');

        // If the script already exists, remove it
        if (existingScript) {
            existingScript.remove();
        }

        // Create and inject a new script tag with the updated style
        const newScriptTag = document.createElement('script');
        newScriptTag.src = `http://localhost:3000/form.js?style=${customer}`;
        newScriptTag.id = 'form-script'; // Set an id to track the script
        previewContainer.appendChild(newScriptTag);
    }

    // Function to update the preview with the selected customer style
    function updatePreview(customer) {
        previewContainer.innerHTML = '';

        // Inject the form structure into the preview container
        previewContainer.innerHTML = `
            <div id="form-container">
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
            </div>
        `;

        // Update the form script with the selected style
        updateFormScript(customer);
    }

    // Function to load styles into the text area for editing
    function loadStylesIntoEditor(customer) {
        if (currentStyles[customer]) {
            styleEditor.value = JSON.stringify(currentStyles[customer], null, 2);
        } else {
            styleEditor.value = '';
        }
    }

    // Fetch the styles.json to populate the dropdown and the editor
    fetch('/styles')
        .then(response => response.json())
        .then(styles => {
            currentStyles = styles;
            // Populate the dropdown with customer options
            for (const customer in styles) {
                const option = document.createElement('option');
                option.value = customer;
                option.textContent = customer.charAt(0).toUpperCase() + customer.slice(1);
                customerSelect.appendChild(option);
            }

            // Initial load: first customer selected by default
            if (customerSelect.value) {
                loadStylesIntoEditor(customerSelect.value);
                updatePreview(customerSelect.value);
            }
        });

    // Load the styles for the selected customer when the dropdown changes
    customerSelect.addEventListener('change', () => {
        const selectedCustomer = customerSelect.value;
        loadStylesIntoEditor(selectedCustomer);
        updatePreview(selectedCustomer);
    });

    // Update the styles object when the textarea content changes
    styleEditor.addEventListener('input', () => {
        try {
            const updatedStyles = JSON.parse(styleEditor.value);
            currentStyles[customerSelect.value] = updatedStyles;
        } catch (e) {
            // Ignore JSON parse errors
        }
    });

    // Handle form submission to update styles
    document.getElementById('edit-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Update the styles.json file with the edited styles
        fetch('/update-styles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentStyles)
        })
        .then(response => response.text())
        .then(message => {
            // alert(message);
            updatePreview(customerSelect.value);
        })
        .catch(error => {
            alert('Failed to update styles.');
        });
    });
});
