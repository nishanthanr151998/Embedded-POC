// surveyConfig.js
const surveyJSON = {
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

module.exports = surveyJSON;
