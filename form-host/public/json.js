/*-- Form Json --*/
const surveyJson = {
	title: "Application for Project Funding",
	logo: "https://s3.eu-west-1.amazonaws.com/static.zeigo.com/assets/brand/favicon.png",
	logoWidth: "32",
	logoHeight: "32",
	logoPosition: "left",	
	//firstPageIsStarted: true,
	widthMode: "responsive",	// static, auto and responsive
	showProgressBar: "top",
	progressBarShowPageNumbers: true,
	progressBarShowPageTitles: true,
	showQuestionNumbers: false,
	showPreviewBeforeComplete: "showAnsweredQuestions",
	previewText: "Form Summary",
	completedHtml: "Thank you for providing the form",
	pages: [
		// Page 0 - Start Page
		/*
		{
			name: "Start"
		},
		*/				
		// Page 1 - Personal Information
		{
			name: "PersonalInformation",
			navigationTitle: "Personal Information",
			elements: [
				{
					name: "FirstName",
					title: "First Name:",
					type: "text"					
				}, 
				{
					name: "LastName",
					title: "Last Name:",
					type: "text",
					startWithNewLine: false
				},
				{
					name: "Title",
					title: "Title:",
					type: "text"
				},
				{
					name: "CompanyName",
					title: "Company Name:",
					type: "text",
					startWithNewLine: false
				},
				{
					name: "Email",
					title: "Email:",
					type: "text"
				},
				{
					name: "Phone",
					title: "Phone:",
					type: "text",
					startWithNewLine: false
				},
				{
					name: "LinkedIn",
					title: "LinkedIn:",
					type: "text"
				}
			]
		},
		// Page 2 - Project Information
		{
			name: "ProjectInformation",
			navigationTitle: "Project Information",
			elements: [
				{
					name: "ProjectNature",
					title: "What is the nature of your project?",
					type: "dropdown",
					choices: project_types
				}, 
				{
					name: "ProjectBudget",
					title: "What is the Estimated Budget For Your Project?",
					type: "dropdown",
					choices: budjet_ranges,
					startWithNewLine: false
				},
				{
					name: "ProjectTimeline",
					title: "What is the Estimated Timeline For Your Project?",
					//type: "text"
					type: "timeline",
					titleLocation: "top"
				},
				{
					name: "KeyMilestones",
					title: "What are the Key Milestones of your Project?",
					type: "comment",
					maxLength: 500,
					allowResize: false
				},
				{
					name: "EnvironmentImpact",
					title: "How will your project positively impact the environment and/or community?",
					//type: "text"
					type: "environmentalAndCommunityImpact"
				}
			]
		},
		// Page 3 - Experience And Compliance
		{
			name: "ExperienceAndCompliance",
			navigationTitle: "Experience And Compliance",
			elements: [
				{
					name: "PreviousExperience",
					title: "Do you have previous experience in executing similar projects?",
					type: "dropdown",
					choices: project_experience_options
				}, 
				{
					name: "CertificationsOrLicenses",
					title: "Do you have any certifications or licenses realted to sustainability?",
					type: "dropdown",
					choices: sustainability_certifications_options_experience_and_compliance
				}
			]
		},
		// Page 4 - Funding Needs
		{
			name: "FundingNeeds",
			navigationTitle: "Funding Needs",
			elements: [
				{
					name: "FundingSources",
					title: "What are the primary sources of funding you have explored so far?",
					type: "dropdown",
					choices: primary_funding_sources_options
				}, 
				{
					name: "FundingDepth",
					title: "Are you seeking full funding from us, or do you have other sources secured?",
					type: "dropdown",
					choices: funding_depth_options,
					startWithNewLine: false
				},
				{
					name: "FundUtilization",
					title: "How will the funds be utilized for your project?",
					type: "dropdown",
					choices: fund_utilization_options
				},
				{
					name: "GovtGrantsOrIncentives",
					title: "Are you aware of any government grants or incentives for the project?",
					type: "dropdown",
					choices: govt_grants_options,
					startWithNewLine: false
				},
				{
					name: "PublicPrivatePartnerships",
					title: "Are you interested in exploring public-private partnerships for sustainability projects?",
					type: "dropdown",
					choices: public_private_partnerships_options
				},
				{
					name: "FundChallenges",
					title: "What challenges are you facing in securing funding for green projects?",
					type: "dropdown",
					choices: funding_challenges_options,
					startWithNewLine: false
				}
			]
		},
		// Page 5 - Metrics And Risks
		{
			name: "MetricsAndRisks",
			navigationTitle: "Metrics And Risks",
			elements: [
				{
					name: "MetricsOrKPIs",
					title: "What key metrics or KPIs will you track for project success?",
					type: "dropdown",
					choices: metrics_or_KPIs_options
				}, 
				{
					name: "ClimateRelatedFinancialProducts",
					title: "Are you interested in financial products to help manage climate-related risks?",
					type: "dropdown",
					choices: interest_in_financial_products_for_climate_risks_options,
					startWithNewLine: false
				},
				{
					name: "EnvironmentalRegulations",
					title: "Are you required to meet any specific environmental regulations or sustainability standards?",
					type: "dropdown",
					choices: need_for_environmental_grants_options					
				},
				
				{
					name: "SustainabilityCertifications",
					title: "Do you have any certifications, licenses, patents or other credentials related to sustainability or enviromental impact that you can provide?",
					type: "dropdown",
					choices: sustainability_certifications_options_metrics_and_risks,
					startWithNewLine: false
				},
				{
					name: "CarbonCreditsElgible",
					title: "Is your Project eligible for Carbon Credits?",
					type: "dropdown",
					choices: project_eligible_for_carbon_credits_options
				}
			]
		}
	]
    
};