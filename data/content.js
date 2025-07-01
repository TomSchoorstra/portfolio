// Content validation function
function validateContent(content) {
    const requiredFields = {
        personalInfo: ['name', 'location', 'title', 'skills'],
        sections: {
            about: ['title', 'content']
        },
        portfolio: {
            projects: ['id', 'date', 'title', 'company', 'description', 'achievements']
        }
    };

    try {
        // Validate personal info
        for (const field of requiredFields.personalInfo) {
            if (!content.personalInfo[field]) {
                console.error(`Missing required field: personalInfo.${field}`);
            }
        }

        // Validate sections
        if (!content.sections.about) {
            console.error('Missing about section');
        } else {
            for (const field of requiredFields.sections.about) {
                if (!content.sections.about[field]) {
                    console.error(`Missing required field: sections.about.${field}`);
                }
            }
        }

        // Validate portfolio projects
        if (!content.portfolio.projects || !Array.isArray(content.portfolio.projects)) {
            console.error('Portfolio projects must be an array');
        } else {
            content.portfolio.projects.forEach((project, index) => {
                for (const field of requiredFields.portfolio.projects) {
                    if (!project[field]) {
                        console.error(`Missing required field in project ${index}: ${field}`);
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error validating content:', error);
    }
}

const websiteContent = {
    personalInfo: {
        name: "Tom Schoorstra",
        location: "Amsterdam, The Netherlands",
        title: "Automation Specialist",
        email: "tomschoorstrar@gmail.com",
        skills: [
            "Hubspot Automation Expert",
            "AI Integration Specialist",
            "Zapier Workflow Designer",
            "n8n Solution Architect",
            "Process Automation Consultant"
        ],
        socialLinks: {
            linkedin: "https://linkedin.com/in/tomschoorstra",
            github: "https://github.com/tomschoorstra"
        }
    },
    sections: {
        about: {
            title: "About Me",
            content: "As an Automation Specialist with extensive experience in business process optimization, I specialize in creating seamless integrations between different platforms and systems. My expertise lies in developing efficient workflows that save time, reduce errors, and improve operational effectiveness. I combine technical knowledge with business acumen to deliver solutions that drive real value.",
            expertise: [
                "Business Process Automation",
                "System Integration",
                "Workflow Optimization",
                "API Development",
                "Custom Automation Solutions"
            ]
        }
    },
    portfolio: {
        title: "Portfolio Timeline",
        projects: [
            {
                id: "hubspot-integration",
                date: "2023 - Present",
                title: "HubSpot Integration Project",
                company: "Tech Solutions Inc.",
                description: "Led the implementation of complex automation workflows using HubSpot's API, resulting in a 40% increase in lead conversion efficiency and significant improvement in customer engagement metrics.",
                image: "",
                technologies: ["HubSpot", "REST API", "Node.js", "Custom Integrations"],
                achievements: [
                    "Automated customer onboarding process reducing setup time by 75%",
                    "Integrated CRM with existing systems improving data accuracy by 95%",
                    "Reduced manual data entry time from 4 hours to 1 hour per day"
                ],
                impact: "Saved the company over 100 hours per month in manual tasks and improved customer satisfaction scores by 35%"
            },
            {
                id: "zapier-workflow",
                date: "2022 - 2023",
                title: "Zapier Workflow Optimization",
                company: "Digital Innovations Lab",
                description: "Designed and implemented comprehensive cross-platform automation solutions connecting multiple SaaS applications, streamlining business operations and enhancing team productivity.",
                image: "",
                technologies: ["Zapier", "Slack", "Google Workspace", "Trello", "Asana"],
                achievements: [
                    "Created 20+ automated workflows handling 50,000+ tasks monthly",
                    "Integrated 8 different platforms into a cohesive ecosystem",
                    "Automated report generation saving 100+ hours per month"
                ],
                impact: "Reduced operational costs by 30% and improved team efficiency by 45%"
            },
            {
                id: "n8n-integration",
                date: "2021 - 2022",
                title: "n8n Custom Integration",
                company: "AutoFlow Systems",
                description: "Developed custom n8n nodes for specialized business processes and internal tools integration, enabling advanced automation capabilities and improved workflow management.",
                image: "",
                technologies: ["n8n", "TypeScript", "Docker", "PostgreSQL"],
                achievements: [
                    "Built 5 custom n8n nodes now used by 1000+ users",
                    "Automated data synchronization across 3 departments",
                    "Improved workflow efficiency by 60% through custom triggers"
                ],
                impact: "Enabled the company to scale operations by 200% without increasing headcount"
            }
        ]
    }
};

// Validate content on load
validateContent(websiteContent); 