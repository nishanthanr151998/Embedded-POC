(function() {
    // Load external scripts and styles
    function loadScript(src, callback) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function loadStylesheet(href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    // List of scripts to load
    const scripts = [
        "https://unpkg.com/jquery/dist/jquery.min.js",
        "https://unpkg.com/survey-core/survey.core.min.js",
        "https://unpkg.com/survey-core/survey.i18n.min.js",
        "https://unpkg.com/survey-core/themes/index.min.js",
        "https://unpkg.com/survey-js-ui/survey-js-ui.js"
    ];

    // Load stylesheets
    loadStylesheet("https://unpkg.com/survey-core/defaultV2.min.css");

    // Load scripts sequentially
    let loadScriptPromises = scripts.map((src) => {
        return new Promise((resolve) => {
            loadScript(src, resolve);
        });
    });

    Promise.all(loadScriptPromises).then(() => {
        // Initialize the survey after all scripts are loaded
        var surveyJSON = {
            title: "Contact Us",
            pages: [
                {
                    questions: [
                        {
                            type: "multipletext",
                            name: "name",
                            title: "Name",
                            colCount: 2,
                            isRequired: true,
                            items: [
                                { type: "text", name: "firstName", title: "First Name", isRequired: true },
                                { type: "text", name: "lastName", title: "Last Name", isRequired: true }
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

        document.addEventListener('DOMContentLoaded', function() {
            // Create a new div element for the survey
            var surveyElement = document.createElement('div');
            surveyElement.id = 'surveyElement';
            document.body.appendChild(surveyElement); // Append to body or a specific container

            var survey = new Survey.Model(surveyJSON);

            survey.onComplete.add(function(result) {
                console.log("Form submitted: ", JSON.stringify(result.data));
                alert("Thank you for your message!");
            });

            // Render the SurveyJS form directly in the newly created element
            // survey.render(surveyElement);
            surveyElement.Survey({ model: survey });
        });
    });
})();
