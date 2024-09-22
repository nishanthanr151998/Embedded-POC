// const surveyJSON = require('./surveyConfig.js');

(function() {

    var surveyJSON = {
        title: "Contact Us",
        pages: [
            {
                questions: [
                    {
                        type: "multipletext",
                        name: "name",
                        title: "Name",
                        colCount: 2, // This ensures two input fields are placed in the same row
                        isRequired: true,
                        items: [
                            {
                                type: "text",
                                name: "firstName",
                                title: "First Name",
                                isRequired: true
                            },
                            {
                                type: "text",
                                name: "lastName",
                                title: "Last Name",
                                isRequired: true
                            }
                        ]
                    },
                    {
                        type: "text",
                        name: "email",
                        title: "Email",
                        inputType: "email",
                        isRequired: true
                    },
                    {
                        type: "text",
                        name: "phone",
                        title: "Phone",
                        inputType: "tel",
                        isRequired: true
                    },
                    {
                        type: "text",
                        name: "businessLegalName",
                        title: "Business Legal Name",
                        isRequired: true
                    },
                    {
                        type: "text",
                        name: "dbaName",
                        title: "DBA or Trade Name",
                        isRequired: true
                    }
                ]
            },
        ],
        showProgressBar: "top",
        goNextPageAutomatic: false
    };

    // Ensure the DOM is fully loaded before rendering
    document.addEventListener('DOMContentLoaded', function() {
        // Render the SurveyJS form in the #surveyElement container
        var survey = new Survey.Model(surveyJSON);

        survey.onComplete.add(function(result) {
            console.log("Form submitted: ", JSON.stringify(result.data));
            alert("Thank you for your message!");
        });

        // Use document.getElementById to pass the actual element
        var surveyElement = document.getElementById('surveyElement');
        if (surveyElement) {
            survey.render(surveyElement);  // Passing the element, not the string
        } else {
            console.error('Survey element not found');
        }
    });
})();
