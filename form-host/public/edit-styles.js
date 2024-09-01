document.addEventListener('DOMContentLoaded', () => {
    let stylesData;

    // Fetch styles.json and populate the dropdown with customer names
    fetch('/styles')
        .then(response => response.json())
        .then(styles => {
            stylesData = styles;

            const customerSelect = document.getElementById('customer-select');
            for (const customer in stylesData) {
                const option = document.createElement('option');
                option.value = customer;
                option.text = customer.charAt(0).toUpperCase() + customer.slice(1);
                customerSelect.appendChild(option);
            }

            // Load the styles for the first customer by default
            loadCustomerStyles(customerSelect.value);
            applyStylesPreview(customerSelect.value);
        })
        .catch(error => {
            console.error('Failed to load styles:', error);
            alert('Failed to load styles.');
        });

    // Handle customer selection from the dropdown
    document.getElementById('customer-select').addEventListener('change', function() {
        loadCustomerStyles(this.value);
        applyStylesPreview(this.value);
    });

    // Function to load the selected customer's styles into the textarea
    function loadCustomerStyles(customer) {
        if (stylesData[customer]) {
            document.getElementById('style-editor').value = JSON.stringify(stylesData[customer], null, 2);
        }
    }

    // Function to apply styles to the live preview
    function applyStylesPreview(customer) {
        const previewContainer = document.getElementById('preview-container');
        const styles = stylesData[customer];

        // Reset the preview container's styles
        previewContainer.innerHTML = '';

        // Apply styles dynamically
        const style = document.createElement('style');
        const containerStyles = Object.entries(styles.container).map(([key, value]) => `${key}: ${value};`).join(' ');
        const formStyles = Object.entries(styles.form).map(([key, value]) => `${key}: ${value};`).join(' ');
        const buttonStyles = Object.entries(styles.button).map(([key, value]) => `${key}: ${value};`).join(' ');
        const buttonHoverStyles = Object.entries(styles["button-hover"]).map(([key, value]) => `${key}: ${value};`).join(' ');

        style.innerHTML = `
            #preview-container { ${containerStyles} }
            #preview-form { ${formStyles} }
            #preview-form input[type="button"],
            #preview-form input[type="submit"] { ${buttonStyles} }
            #preview-form input[type="button"]:hover,
            #preview-form input[type="submit"]:hover { ${buttonHoverStyles} }
        `;
        document.head.appendChild(style);

        // Create the preview form dynamically
        const formContainer = document.createElement('div');
        formContainer.setAttribute('id', 'form-container');
        formContainer.innerHTML = `
            <form id="preview-form">
                <div>
                    <h1>Preview Form</h1>
                    <label for="name-preview">Name:</label>
                    <input type="text" id="name-preview" name="name-preview"><br><br>
                    
                    <label for="email-preview">Email:</label>
                    <input type="email" id="email-preview" name="email-preview"><br><br>
                    
                    <label for="phone-preview">Phone:</label>
                    <input type="tel" id="phone-preview" name="phone-preview"><br><br>
                    
                    <input type="submit" value="Submit">
                </div>
            </form>
        `;

        previewContainer.appendChild(formContainer);
    }

    // Update the preview when the user changes the styles in the textarea
    document.getElementById('style-editor').addEventListener('input', function() {
        const selectedCustomer = document.getElementById('customer-select').value;
        let updatedStyles;

        try {
            updatedStyles = JSON.parse(this.value);
            stylesData[selectedCustomer] = updatedStyles;
            applyStylesPreview(selectedCustomer);
        } catch (error) {
            console.error('Invalid JSON format:', error);
        }
    });

    // Handle form submission to update the selected customer's styles
    document.getElementById('edit-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedCustomer = document.getElementById('customer-select').value;
        let updatedStyles;

        try {
            updatedStyles = JSON.parse(document.getElementById('style-editor').value);
        } catch (error) {
            alert('Invalid JSON format. Please correct it.');
            return;
        }

        // Update the stylesData with the new styles for the selected customer
        stylesData[selectedCustomer] = updatedStyles;

        // Save the updated styles to the server
        fetch('/update-styles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stylesData)
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
        })
        .catch(error => {
            console.error('Failed to update styles:', error);
            alert('Failed to update styles.');
        });
    });
});
