export const colorClasses = {
    default: "bg-secondary dark:bg-secondary",
    red: "bg-red-200 dark:bg-red-800/40",
    emerald: "bg-emerald-200 dark:bg-emerald-800/40",
    sky: "bg-sky-200 dark:bg-sky-800/40",
    indigo: "bg-indigo-200 dark:bg-indigo-800/40",
};

export const sampleNote = [
    {
        id: 1,
        note_text:
            "Marketing is the process of promoting, selling, and distributing a product or service. It involves various activities and strategies aimed at identifying customer needs, creating value for customers, and building strong relationships with them.",
        color: "default",
        prompt: {
            convo: {
                id: 83,
                title: "Marketing",
            },
            response_text:
                "Marketing is the process of promoting, selling, and distributing a product or service. It involves various activities and strategies aimed at identifying customer needs, creating value for customers, and building strong relationships with them. Here are the key components of marketing:\n\n1. **Market Research**: Understanding the needs, preferences, and behaviors of the target market through surveys, interviews, focus groups, and data analysis.\n\n2. **Product Development**: Creating products or services that meet the needs and desires of the target market.\n\n3. **Branding**: Establishing a distinct identity for a product or company, including its name, logo, tagline, and overall image.\n\n4. **Pricing**: Setting a price that reflects the value of the product or service, is competitive, and considers the target market's willingness to pay.\n\n5. **Promotion**: Communicating the benefits of the product or service to the target market through advertising, sales promotions, public relations, and digital marketing.\n\n6. **Distribution**: Making the product or service available to the target market through various channels, including online and physical stores.\n\n7. **Sales**: Engaging with customers to encourage them to make a purchase, often involving direct interaction through sales teams or automated systems.\n\n8. **Customer Service**: Providing support and service to customers before, during, and after a purchase to ensure satisfaction and build loyalty.\n\nEffective marketing requires a deep understanding of the market, a strong value proposition, and the ability to execute strategies that attract and retain customers. It is an essential function for any business to drive growth and achieve long-term success.",
        },
        created_at: "2024-08-28T07:02:40.240620+05:30",
    },
    {
        id: 2,
        note_text:
            "Software development is the process of designing, coding, testing, and maintaining software applications. It involves various methodologies such as Agile, Scrum, and Waterfall.",
        color: "red",
        prompt: {
            convo: {
                id: 101,
                title: "Software Development",
            },
            response_text:
                "Software development is the process of designing, coding, testing, and maintaining software applications. The development process can be structured using methodologies like Agile, Scrum, or Waterfall, depending on the project requirements and team preferences.",
        },
        created_at: "2024-08-28T08:15:20.341623+05:30",
    },
    {
        id: 3,
        note_text:
            "Data Structures are ways of organizing and storing data in a computer so that it can be accessed and modified efficiently. Examples include arrays, linked lists, stacks, and queues.",
        color: "emerald",
        prompt: {
            convo: {
                id: 102,
                title: "Data Structures",
            },
            response_text:
                "Data Structures are crucial for organizing and storing data in a way that allows for efficient access and modification. Common data structures include arrays, linked lists, stacks, queues, trees, and graphs.",
        },
        created_at: "2024-08-28T09:30:45.453789+05:30",
    },
    {
        id: 4,
        note_text:
            "Algorithms are step-by-step procedures or formulas for solving problems. They are fundamental to computer science and can range from simple sorting algorithms to complex machine learning algorithms.",
        color: "sky",
        prompt: {
            convo: {
                id: 103,
                title: "Algorithms",
            },
            response_text:
                "Algorithms are step-by-step procedures or formulas for solving specific problems. They are essential in computer science, with applications ranging from basic sorting and searching to complex tasks like machine learning.",
        },
        created_at: "2024-08-28T10:05:30.567891+05:30",
    },
    {
        id: 5,
        note_text:
            "Web development is the process of building and maintaining websites. It involves both frontend and backend development, using technologies like HTML, CSS, JavaScript, and various backend languages.",
        color: "indigo",
        prompt: {
            convo: {
                id: 104,
                title: "Web Development",
            },
            response_text:
                "Web development involves creating and maintaining websites. It includes both frontend development (using HTML, CSS, JavaScript) and backend development (using languages like Node.js, Python, Ruby, etc.).",
        },
        created_at: "2024-08-28T11:22:15.678943+05:30",
    },
    {
        id: 6,
        note_text:
            "Cloud computing is the delivery of computing services—servers, storage, databases, networking, software—over the Internet, or 'the cloud'.",
        color: "red",
        prompt: {
            convo: {
                id: 105,
                title: "Cloud Computing",
            },
            response_text:
                "Cloud computing provides access to computing services like servers, storage, databases, and networking over the Internet. It allows for on-demand availability of resources, scalability, and cost efficiency.",
        },
        created_at: "2024-08-28T12:10:25.789654+05:30",
    },
    {
        id: 7,
        note_text:
            "Machine Learning is a branch of artificial intelligence that focuses on building systems that can learn from and make decisions based on data.",
        color: "red",
        prompt: {
            convo: {
                id: 106,
                title: "Machine Learning",
            },
            response_text:
                "Machine Learning enables systems to learn from data and improve their performance over time without being explicitly programmed. It is a subset of artificial intelligence with applications in various fields, including predictive analytics and natural language processing.",
        },
        created_at: "2024-08-28T13:45:50.890321+05:30",
    },
    {
        id: 8,
        note_text:
            "Cybersecurity involves protecting computer systems, networks, and data from theft, damage, or unauthorized access. It includes practices like encryption, firewalls, and secure coding.",
        color: "green",
        prompt: {
            convo: {
                id: 107,
                title: "Cybersecurity",
            },
            response_text:
                "Cybersecurity is the practice of safeguarding computer systems, networks, and data from threats such as hacking, malware, and unauthorized access. It includes measures like encryption, firewalls, and secure software development practices.",
        },
        created_at: "2024-08-28T14:30:15.901432+05:30",
    },
    {
        id: 9,
        note_text:
            "Artificial Intelligence is the simulation of human intelligence in machines that are programmed to think and learn like humans.",
        color: "indigo",
        prompt: {
            convo: {
                id: 108,
                title: "Artificial Intelligence",
            },
            response_text:
                "Artificial Intelligence (AI) involves creating systems that mimic human intelligence, enabling machines to learn, reason, and perform tasks that typically require human cognition. AI is used in various applications, from autonomous vehicles to recommendation systems.",
        },
        created_at: "2024-08-28T15:20:30.012345+05:30",
    },
    {
        id: 10,
        note_text:
            "Blockchain is a distributed ledger technology that allows data to be stored across a network of computers in a way that is secure, transparent, and tamper-proof.",
        color: "default",
        prompt: {
            convo: {
                id: 109,
                title: "Blockchain",
            },
            response_text:
                "Blockchain is a decentralized digital ledger that records transactions across multiple computers in a secure, transparent, and immutable manner. It is the underlying technology for cryptocurrencies like Bitcoin and has applications in various industries, including finance and supply chain management.",
        },
        created_at: "2024-08-28T16:05:45.123456+05:30",
    },
    {
        id: 11,
        note_text:
            "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the systems development life cycle and provide continuous delivery with high software quality.",
        color: "sky",
        prompt: {
            convo: {
                id: 110,
                title: "DevOps",
            },
            response_text:
                "DevOps is a cultural and technical movement aimed at unifying software development (Dev) and IT operations (Ops). It promotes collaboration, automation, and continuous integration/continuous delivery (CI/CD) to accelerate software development and deployment.",
        },
        created_at: "2024-08-28T17:30:50.234567+05:30",
    },
];
