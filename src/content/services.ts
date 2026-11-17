import type { ImageKey } from "@/config/images";

export type Service = {
  slug: string;
  number: string;
  title: string;
  /** One line for overviews */
  summary: string;
  /** Opening paragraph on the service page */
  intro: string;
  /** Short heading for the list of areas */
  coversHeading: string;
  covers: string[];
  /** Further explanation, one paragraph each */
  body: string[];
  /** Important clinical notes shown in a highlighted panel */
  note?: { heading: string; text: string };
  image?: ImageKey;
};

export const services: Service[] = [
  {
    slug: "addiction-psychiatry",
    number: "01",
    title: "Addiction Psychiatry & Recovery",
    summary:
      "Specialist assessment and treatment for alcohol, drug and behavioural addictions, with support for families.",
    intro:
      "Addiction is a health condition, not a failing of character. Dr Sedohia offers specialist, non-judgemental assessment and treatment for people affected by alcohol, drugs and behavioural addictions, with recovery plans built around each person's circumstances.",
    coversHeading: "What this service includes",
    covers: [
      "Comprehensive substance use assessment",
      "Alcohol and drug use disorders",
      "Behavioural addictions",
      "Medically supervised detoxification, where clinically appropriate",
      "Outpatient rehabilitation and follow-up",
      "Relapse prevention planning",
      "Support and guidance for families",
    ],
    body: [
      "Care begins with a careful assessment of physical and mental health, patterns of use and the wider context of a person's life. From there, Dr Sedohia agrees a plan with you that may combine medical treatment, psychological support and practical relapse prevention.",
      "Families are often carrying a great deal of worry. Where you agree to their involvement, relatives can receive guidance on how best to support recovery while looking after their own wellbeing.",
    ],
    note: {
      heading: "About detoxification",
      text: "Withdrawal from some substances can carry medical risk. Whether detoxification is suitable, and in which care setting, is decided only after clinical assessment. Home-based detoxification is not safe for everyone, and a supervised setting may be recommended.",
    },
    image: "meetDoctor",
  },
  {
    slug: "adult-psychiatry",
    number: "02",
    title: "Adult Psychiatric Services",
    summary:
      "Assessment, diagnosis and treatment for a wide range of mental health conditions in adults.",
    intro:
      "Specialist psychiatric care for adults, from first assessment and diagnosis through to treatment and ongoing review. Each plan is shaped by your history, your priorities and the evidence for what is likely to help.",
    coversHeading: "Conditions commonly assessed and treated",
    covers: [
      "Depression",
      "Anxiety disorders",
      "Bipolar disorder",
      "Schizophrenia and other psychotic disorders",
      "Adult ADHD",
      "Trauma-related conditions, including acute stress disorder and PTSD",
      "Sleep disorders",
      "Complex psychiatric presentations",
    ],
    body: [
      "An initial assessment allows time to understand what you are experiencing, how long it has been present and how it is affecting your life, work and relationships. Dr Sedohia will explain his findings clearly and discuss the options available.",
      "Treatment may include medication, psychological approaches, lifestyle measures and coordination with other professionals. Decisions are made together, and plans are reviewed as your needs change.",
    ],
    image: "philosophy",
  },
  {
    slug: "urgent-psychiatric-care",
    number: "03",
    title: "Urgent & Crisis Psychiatric Interventions",
    summary:
      "Prompt specialist consultation for acute deterioration and urgent psychiatric concerns, where available.",
    intro:
      "When a person's mental health deteriorates quickly, families need specialist advice without delay. Calm Restored aims to offer prompt consultations for urgent psychiatric concerns, subject to availability and clinical suitability.",
    coversHeading: "Situations where an urgent consultation may help",
    covers: [
      "Acute deterioration in mental health",
      "Severe emotional distress",
      "Significant or sudden changes in behaviour",
      "Acute psychotic or manic presentations",
      "Other urgent psychiatric concerns",
    ],
    body: [
      "Please telephone the team to discuss an urgent request, rather than using the online form. The team will talk through the situation and advise on the most appropriate next step, which may be a consultation or referral to emergency services.",
    ],
    note: {
      heading: "Urgent care is not emergency care",
      text: "If someone is at immediate risk of harm to themselves or others, or needs emergency medical attention, go to the nearest emergency department or contact emergency services straight away. This website and its enquiry form are not monitored continuously.",
    },
    image: "consultation",
  },
  {
    slug: "second-opinions",
    number: "04",
    title: "Second Opinions & Specialist Reviews",
    summary:
      "Independent specialist assessment to clarify a diagnosis or review current treatment.",
    intro:
      "Sometimes a fresh, independent perspective is what is needed. A specialist review can bring clarity where a diagnosis is uncertain, where treatment has not helped as hoped, or where you simply want reassurance that you are on the right path.",
    coversHeading: "A review can include",
    covers: [
      "Diagnostic clarification",
      "Review of existing treatment and medication",
      "Independent specialist assessment",
    ],
    body: [
      "Dr Sedohia will consider your history, previous assessments and current treatment, and will explain his conclusions in plain language. With your consent, recommendations can be shared with your existing clinician so that care remains joined up.",
    ],
    image: "philosophy",
  },
  {
    slug: "concierge-psychiatric-care",
    number: "05",
    title: "Private Concierge Psychiatric Care",
    summary:
      "Personal, continuous specialist care with coordination, flexibility and discretion.",
    intro:
      "Concierge care places a single specialist relationship at the centre of your treatment. It is designed for individuals who value continuity, discretion and a carefully coordinated approach.",
    coversHeading: "What concierge care offers",
    covers: [
      "Personalised consultations at an unhurried pace",
      "Individual care planning",
      "Coordination with other professionals involved in your care",
      "Family involvement, where you authorise it",
      "Continuity of care with the same specialist",
    ],
    body: [
      "Your plan may combine in-person, virtual and, where suitable, home-based consultations. The team will discuss with you how care can be arranged around your commitments while keeping clinical standards and your privacy at the forefront.",
    ],
    image: "meetDoctor",
  },
  {
    slug: "virtual-consultations",
    number: "06",
    title: "Virtual Psychiatric Consultations",
    summary:
      "Secure video consultations for convenience and continuity, where clinically suitable.",
    intro:
      "Virtual consultations allow you to see a specialist from a private space of your choosing. They can be particularly helpful for follow-up appointments and for maintaining continuity when travel is difficult.",
    coversHeading: "Virtual care may suit",
    covers: [
      "Follow-up and medication review appointments",
      "Individuals with busy or unpredictable schedules",
      "Continuity of care while travelling",
      "Initial discussions about suitable care options",
    ],
    body: [
      "Whether a virtual consultation is appropriate depends on your clinical needs and on where you are located at the time of the appointment, as professional and legal requirements differ between countries. The team will confirm suitability before booking.",
    ],
    image: "consultation",
  },
  {
    slug: "workplace-mental-health",
    number: "07",
    title: "Workplace Mental Health Consultancy",
    summary:
      "Specialist mental health support, education and policy development for organisations.",
    intro:
      "Healthy organisations are built by people who feel supported. Calm Restored works with employers to strengthen mental health support, from employee programmes to leadership education and policy.",
    coversHeading: "Services for organisations",
    covers: [
      "Employee Assistance Programmes",
      "Workplace mental health screening",
      "Psychiatric consultations for employees",
      "Counselling support",
      "Mental health education and training",
      "Stress and burnout support",
      "Crisis intervention",
      "Organisational mental health policy development",
    ],
    body: [
      "Every engagement begins with a conversation about your organisation, your people and what you hope to achieve. Individual employee consultations remain confidential, within the limits explained to employees in advance.",
    ],
    image: "workplace",
  },
  {
    slug: "home-visits",
    number: "08",
    title: "Home Visits",
    summary:
      "Specialist assessment and follow-up in the comfort and privacy of home, where suitable.",
    intro:
      "For some individuals, attending a clinic is difficult or unhelpful. Home visits bring specialist assessment and follow-up into a familiar, private environment.",
    coversHeading: "Home visits can support",
    covers: [
      "Home-based psychiatric assessment",
      "Follow-up and review appointments",
      "Individuals for whom travel is difficult",
      "Families who wish to be involved, with consent",
    ],
    body: [
      "Home visits are offered subject to clinical suitability and service availability. The team will discuss practical arrangements and any safety considerations before a visit is confirmed.",
    ],
    image: "welcome",
  },
  {
    slug: "advocacy-and-education",
    number: "09",
    title: "Mental Health Advocacy & Education",
    summary:
      "Awareness, stigma reduction, professional education and community engagement.",
    intro:
      "Dr Sedohia is committed to improving understanding of mental health in Ghana and beyond. Talks and training help communities, professionals and organisations respond to mental illness with knowledge and compassion.",
    coversHeading: "Areas of work",
    covers: [
      "Public awareness and mental health literacy",
      "Reducing stigma around mental illness and addiction",
      "Education for health and allied professionals",
      "Community engagement and talks",
    ],
    body: [
      "If you would like Dr Sedohia to speak at an event or contribute to an education programme, please use the enquiry form and select this service.",
    ],
    image: "aboutAcademic",
  },
  {
    slug: "stress-management-ecotherapy",
    number: "10",
    title: "Stress Management, Relaxation & Ecotherapy",
    summary:
      "Personalised stress management, relaxation techniques and supervised nature-based activities.",
    intro:
      "Prolonged stress affects sleep, mood, concentration and physical health. This service offers a structured, personalised approach to understanding stress and building practical ways of managing it.",
    coversHeading: "What this service includes",
    covers: [
      "Stress assessment",
      "Personalised coping strategies",
      "Evidence-based relaxation techniques, such as breathing and progressive muscle relaxation",
      "Appropriately supervised nature-based activities",
    ],
    body: [
      "Time spent in natural settings can support wellbeing for many people. Where it is clinically appropriate, nature-based activities may form part of an individual plan, alongside other forms of care.",
      "Stress management and ecotherapy are complementary approaches. They do not replace psychiatric assessment or treatment where this is needed, and responses differ from person to person.",
    ],
    image: "ecotherapy",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Options for the enquiry form */
export const serviceOptions = [
  ...services.map((s) => s.title),
  "Not sure yet",
];
