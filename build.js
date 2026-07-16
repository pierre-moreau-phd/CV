/* ============================================================
   build.js — source unique du site.
   Édite CONTENT / SEO ci-dessous puis lance :  node build.js
   → régénère index.html (EN) et index-fr.html (FR),
   pages 100 % statiques (bon pour le SEO, fonctionne sans JS).
   Design : styles.css   |   Interactions : script.js
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");

/* ---------- helpers ---------- */
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
const list = (arr, fn) => arr.map(fn).join("");

/* ============================================================
   SEO (par langue) — repris de l'ancien site
   ============================================================ */
const SITE = "https://pierremoreau.myddns.me";
const COMMON = {
  email: "moreau.p.02@gmail.com",
  telephone: "+33611805832",
  image: SITE + "/og-image.png",
  sameAs: [
    "https://www.linkedin.com/in/pierre-moreau-phd/",
    "https://github.com/pierre-moreau-phd",
  ],
};

const SEO = {
  en: {
    title: "Pierre Moreau — PhD ML / AI Healthcare Engineer",
    description:
      "PhD in Machine Learning (2023), AI researcher specialized in healthcare. Post-doc at UPJV (RAUC project): generative AI, medical imaging, LLM/RAG systems for healthcare.",
    keywords:
      "Pierre Moreau, machine learning, AI engineer, healthcare AI, LLM, RAG, computer vision, medical imaging, Amiens",
    canonical: SITE + "/index.html",
    jobTitle: "PhD in Machine Learning, AI Healthcare Engineer",
    personDesc:
      "AI researcher with a PhD in machine learning, specialized in healthcare. Post-doctoral researcher at UPJV (RAUC project).",
    org: "University of Picardie Jules Verne",
    knowsAbout: [
      "Machine Learning", "Deep Learning", "Generative AI", "Large Language Models",
      "Retrieval-Augmented Generation", "Healthcare AI", "Medical Imaging",
      "Computer Vision", "Whisper Speech-to-Text", "Explainable AI",
    ],
    knowsLanguage: [
      { name: "French", alternateName: "fr" },
      { name: "English", alternateName: "en" },
    ],
    ogUrl: SITE + "/",
    ogDesc:
      "AI researcher with a PhD in ML, specialized in healthcare — multimodal learning, generative AI and medical imaging.",
    ogLocale: "en_US",
    ogLocaleAlt: "fr_FR",
    twDesc: "AI researcher specialized in healthcare — generative AI and medical imaging.",
  },
  fr: {
    title: "Pierre Moreau — Docteur en ML / Ingénieur IA Santé",
    description:
      "Docteur en Machine Learning (2023), chercheur IA spécialisé en santé. Post-doc à l'UPJV (projet RAUC) : IA générative, imagerie médicale, systèmes LLM/RAG pour la santé.",
    keywords:
      "Pierre Moreau, machine learning, ingénieur IA, IA santé, LLM, RAG, vision par ordinateur, imagerie médicale, Amiens",
    canonical: SITE + "/index-fr.html",
    jobTitle: "Docteur en Machine Learning, Ingénieur IA Santé",
    personDesc:
      "Chercheur IA, docteur en machine learning, spécialisé en santé. Post-doctorant à l'UPJV (projet RAUC).",
    org: "Université de Picardie Jules Verne",
    knowsAbout: [
      "Machine Learning", "Deep Learning", "IA générative", "Large Language Models",
      "Retrieval-Augmented Generation", "IA santé", "Imagerie médicale",
      "Vision par ordinateur", "Whisper Speech-to-Text", "IA explicable",
    ],
    knowsLanguage: [
      { name: "Français", alternateName: "fr" },
      { name: "Anglais", alternateName: "en" },
    ],
    ogUrl: SITE + "/index-fr.html",
    ogDesc:
      "Chercheur IA spécialisé en santé — apprentissage multimodal, IA générative et imagerie médicale.",
    ogLocale: "fr_FR",
    ogLocaleAlt: "en_US",
    twDesc: "Chercheur IA spécialisé en santé — IA générative et imagerie médicale.",
  },
};

/* ============================================================
   CONTENU (par langue)
   ============================================================ */
const CONTENT = {
  en: {
    nav: [
      { id: "about", label: "About" },
      { id: "work", label: "Work" },
      { id: "experience", label: "Experience" },
      { id: "research", label: "Research" },
      { id: "skills", label: "Skills" },
      { id: "contact", label: "Contact" },
    ],
    hero: {
      status: "Amiens, France · open to collaborations",
      name: "Pierre Moreau",
      role: "PhD in Machine Learning, engineering AI products for healthcare & business.",
      tagline:
        "AI researcher specialised in healthcare — multimodal learning, clinical risk, generative AI. I also ship practical AI products for hospitals and small businesses.",
      ctaContact: "Get in touch",
      ctaWork: "See the work",
      cvLabel: "CV",
      cvHref: "Pierre_Moreau_CV_EN.pdf",
    },
    metrics: [
      { value: "5", target: 5, label: "peer-reviewed publications" },
      { value: "9+", target: 9, label: "years building software" },
      { value: "2023", target: 2023, label: "PhD defended · comp. sci." },
      { value: "3", target: 3, label: "AI products in the works" },
    ],
    about: {
      num: "01", title: "About",
      lead: [
        "I'm an AI & Machine Learning engineer with a PhD in computer science (Nov 2023), specialised in healthcare. My doctoral research, run with Amiens University Hospital, focused on motion analysis with AI — applied notably to Parkinson's disease.",
        "I'm currently a post-doctoral researcher at the University of Picardie Jules Verne on the RAUC project: an optimised care pathway for digestive surgical emergencies, using AI to predict post-operative complications. Before that, I led the AI & Data Science workstream at Capgemini Engineering on a generative-AI medical assistant, coordinating a team of 15–20.",
        "In parallel I build practical AI products for healthcare and small businesses, with deep expertise in LLM systems, multimodal RAG, computer vision (medical imaging), explainable AI and production ML.",
      ],
      facts: [
        { k: "Location", v: "Amiens, France" },
        { k: "Email", v: "moreau.p.02@gmail.com" },
        { k: "LinkedIn", v: "pierre-moreau-phd" },
        { k: "GitHub", v: "pierre-moreau-phd" },
        { k: "Languages", v: "French (native) · English (B2)" },
      ],
      nowTitle: "Currently", nowUpdated: "upd. May 2026",
      now: [
        { tag: "research", title: "Post-doc RAUC · UPJV", desc: "Predicting post-operative complications for digestive surgical emergencies, with Amiens University Hospital." },
        { tag: "product", title: "Solis — AI ERP for SMBs", desc: "An AI ERP for artisans & small firms: quotes, invoices, e-invoicing, voice dictation (Whisper), OCR." },
        { tag: "product", title: "Boussole MVP — Q4 2026", desc: "AI assistant for French benefits (60+ via OpenFisca) and legal recourse. MVP shipping in November." },
      ],
    },
    work: {
      num: "02", title: "Selected work", subtitle: "Products & applications — in production or active development.",
      items: [
        { no: "01", kind: "Product · in dev", year: "2024 →", name: "Solis — AI-powered ERP", desc: "Full-stack ERP for French artisans & small businesses, in late-stage development: quotes, invoices, credit notes, deposits, e-invoicing (Factur-X), Stripe billing, OCR scanning, voice dictation (Whisper) and a conversational AI assistant. GDPR audit, in-house 'Atelier' design system.", tags: ["Django", "Next.js 15", "Claude API", "Whisper", "Stripe", "Factur-X"], href: "https://noovate.ddns.net/", hrefLabel: "Live demo" },
        { no: "02", kind: "Product · deployed", year: "2024", name: "Vesta — radiology planning", desc: "Web app that generates the monthly schedule for the Radiology Department at Amiens University Hospital — 5 specialties, 6-week rotation, manual locks with automatic regeneration. Fully client-side (React + Vite), persisted in localStorage.", tags: ["React", "Vite", "TypeScript", "Hospital deployment"] },
      ],
    },
    experience: {
      num: "03", title: "Experience",
      items: [
        { date: "09/2025 — present", role: "Post-Doctoral Researcher in AI", org: "University of Picardie Jules Verne — Amiens", bullets: ["Project RAUC: optimised care pathway for digestive surgical emergencies, integrating AI and e-health", "Predicting post-operative complications from clinical data", "Partnership with Amiens University Hospital (CHU)"] },
        { date: "03/2024 — 05/2025", role: "Data & AI Engineer — AI & Data Science Lead, Healthcare", org: "Capgemini Engineering — Paris", bullets: ["Led design and development of a GenAI medical-assistant demonstrator with multimodal workflows", "NLP pipelines: OCR for blood-test analysis, Whisper speech-to-text, automated keyword extraction", "Fine-tuned LLMs (OpenAI, Mistral) with PEFT / LoRA for clinical summarisation and transcription", "Built a multimodal RAG pipeline with LangChain over structured and unstructured medical data", "Applied research on placenta segmentation with Transformers (UNetR, SwinUNet)", "Coordinated researchers, data scientists and clinicians (team of 15–20)"] },
        { date: "2022 — 2023", role: "Teaching & Research Associate (ATER)", org: "University of Picardie Jules Verne — Amiens", bullets: ["Lectures and labs for undergraduates (PHP, Bash, C, advanced programming)", "Course design on machine-learning fundamentals"] },
        { date: "2019 — 2023", role: "PhD — Human Movement Modeling & Analysis", org: "UPJV & Amiens University Hospital", bullets: ["Built a comprehensive human-motion database for quantitative analysis and model training", "Data analysis with PCA, Dynamic Time Warping and correlation", "Genetic algorithms for parameter tuning and feature selection", "Deep-learning models (RNN, LSTM, CNN, residual nets) and SVM for classification", "Interpretable biomechanical representations via matrix-based dynamic models", "PhD defended November 2023"] },
        { date: "2017 — 2019", role: "Software Engineer (apprenticeship → full-time)", org: "LV Informatique — Amiens", bullets: ["Developed and maintained the Lynéade / Lynéa2 ERP (WinDev): accounting, purchasing, sales, inventory, after-sales", "SQL database administration and performance tuning", "Customer-driven delivery — direct foundation for my current ERP (Solis)"] },
      ],
    },
    research: {
      num: "04", title: "Research & publications",
      projTitle: "Research & professional projects",
      projects: [
        { name: "Medical AI Assistant (Capgemini)", desc: "GenAI medical-assistant demonstrator with multimodal processing: OCR for blood tests, Whisper STT, fine-tuned LLMs for clinical summarisation, multimodal RAG.", tags: ["Python", "LangChain", "PEFT / LoRA", "RAG"] },
        { name: "Placenta Segmentation (3D Doppler)", desc: "Transformer segmentation (UNetR, SwinUNet) for earlier preeclampsia detection on 3D Doppler images. Submitted to CMIG 2025 (co-author).", tags: ["PyTorch", "UNetR", "SwinUNet", "Medical imaging"] },
        { name: "Human Movement Analysis (PhD)", desc: "Motion modeling for Parkinson's disease and activity recognition. Deep learning (RNN, LSTM, CNN), genetic algorithms, interpretable matrix representations. 3 publications.", tags: ["RNN / LSTM", "PCA / DTW", "Genetic algorithms", "SVM"] },
      ],
      pubTitle: "Selected publications",
      pubs: [
        { year: "2026", status: "Accepted", title: "A Genetic Algorithm-Optimized PID Controller for Robust Tumor Treatment via Combined Immuno-Chemotherapy", venue: "Int. Conf. on Control, Decision and Information Technologies (CoDIT)", authors: "Jérôme Bosche, Consibelle Djiffouo Dzoyim, Pierre Moreau" },
        { year: "2025", status: "Submitted", title: "Towards Better Placenta Segmentation for Earlier Preeclampsia Detection on 3D Doppler Images", venue: "Computerized Medical Imaging and Graphics (CMIG)", authors: "C. Alliod, E. Micard, Pierre Moreau, L. Challier, G. Martensen, H. Kadi, S. Le Bars, O. Morel, M. Blanchon, M. Beaumont" },
        { year: "2023", status: "Published", title: "Two-branch neural network using two data types for human activity recognition", venue: "IEEE Sensors Journal", authors: "Pierre Moreau, David Durand, Jérôme Bosche, Michel Lefranc" },
        { year: "2021", status: "Published", title: "A motion recognition technique based on linear matrix representation to improve Parkinson's disease treatments", venue: "9th Int. Conf. on Systems and Control (ICSC)", authors: "Pierre Moreau, David Durand, Jérôme Bosche, Michel Lefranc" },
        { year: "2020", status: "Published", title: "A motion recognition algorithm using polytopic modeling", venue: "7th Int. Conf. on Control, Decision and Information Technologies (CoDIT)", authors: "Pierre Moreau, David Durand, Jérôme Bosche, Michel Lefranc" },
      ],
    },
    skills: {
      num: "05", title: "Skills",
      groups: [
        { label: "ML & Deep Learning", items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "XGBoost", "Hugging Face", "CNN / RNN / LSTM", "Transformers", "Reinforcement Learning", "Genetic Algorithms"] },
        { label: "GenAI & LLMs", items: ["Claude API", "OpenAI", "LangChain", "Multimodal RAG", "PEFT / LoRA", "Fine-tuning", "Prompt Engineering", "Vector DB"] },
        { label: "Computer Vision", items: ["UNetR", "SwinUNet", "OpenCV", "PIL / Pillow", "Medical Imaging", "Segmentation"] },
        { label: "NLP & Speech", items: ["NLTK", "Whisper (STT)", "OCR", "Tokenization", "Embeddings"] },
        { label: "Data Science & XAI", items: ["NumPy", "Pandas", "SciPy", "Matplotlib", "Seaborn", "PCA", "DTW", "SHAP", "LIME", "ANOVA"] },
        { label: "Backend & MLOps", items: ["FastAPI", "Django", "Flask", "Next.js 15", "Supabase", "PostgreSQL", "Docker", "Stripe"] },
        { label: "Languages & Tools", items: ["Python", "SQL", "JavaScript / TypeScript", "Bash", "HTML / CSS", "Git", "Claude Code / Cursor", "Jupyter"] },
        { label: "AI Ethics & Compliance", items: ["GDPR / RGPD", "EU AI Act", "Bias / Fairness", "Explainable AI", "Quantization / Pruning"] },
        { label: "Spoken languages", items: ["French — Native", "English — B2"] },
      ],
    },
    contact: {
      num: "06", title: "Contact",
      big: "Let's build something useful together.",
      lead: "I'm always up for discussing AI & ML opportunities — especially in healthcare and applied products. Reach out.",
      methods: [
        { label: "Email", value: "moreau.p.02@gmail.com", href: "mailto:moreau.p.02@gmail.com" },
        { label: "LinkedIn", value: "pierre-moreau-phd", href: "https://www.linkedin.com/in/pierre-moreau-phd/" },
        { label: "GitHub", value: "pierre-moreau-phd", href: "https://github.com/pierre-moreau-phd" },
      ],
    },
    footer: { note: "PhD ML · AI Healthcare Engineer · built in Amiens" },
  },
  fr: {
    nav: [
      { id: "about", label: "À propos" },
      { id: "work", label: "Réalisations" },
      { id: "experience", label: "Expérience" },
      { id: "research", label: "Recherche" },
      { id: "skills", label: "Compétences" },
      { id: "contact", label: "Contact" },
    ],
    hero: {
      status: "Amiens, France · ouvert aux collaborations",
      name: "Pierre Moreau",
      role: "Docteur en Machine Learning, je conçois des produits IA pour la santé & les entreprises.",
      tagline:
        "Chercheur en IA spécialisé santé — apprentissage multimodal, risque clinique, IA générative. Je développe aussi des produits IA concrets pour les hôpitaux et les TPE.",
      ctaContact: "Me contacter",
      ctaWork: "Voir les réalisations",
      cvLabel: "CV",
      cvHref: "Pierre_Moreau_CV_FR.pdf",
    },
    metrics: [
      { value: "5", target: 5, label: "publications scientifiques" },
      { value: "9+", target: 9, label: "ans de dev logiciel" },
      { value: "2023", target: 2023, label: "thèse soutenue · informatique" },
      { value: "3", target: 3, label: "produits IA en cours" },
    ],
    about: {
      num: "01", title: "À propos",
      lead: [
        "Je suis ingénieur en IA & Machine Learning, docteur en informatique (nov. 2023), spécialisé en santé. Ma thèse, menée avec le CHU d'Amiens, portait sur l'analyse du mouvement par IA — appliquée notamment à la maladie de Parkinson.",
        "Je suis actuellement post-doctorant à l'Université de Picardie Jules Verne sur le projet RAUC : un parcours de soins optimisé pour les urgences chirurgicales digestives, avec de l'IA pour prédire les complications post-opératoires. Auparavant, j'ai dirigé le pôle IA & Data Science Santé chez Capgemini Engineering sur un assistant médical par IA générative, en coordonnant une équipe de 15 à 20 personnes.",
        "En parallèle, je conçois des produits IA concrets pour la santé et les TPE, avec une expertise solide en systèmes LLM, RAG multimodal, vision par ordinateur (imagerie médicale), IA explicable et ML en production.",
      ],
      facts: [
        { k: "Localisation", v: "Amiens, France" },
        { k: "Email", v: "moreau.p.02@gmail.com" },
        { k: "LinkedIn", v: "pierre-moreau-phd" },
        { k: "GitHub", v: "pierre-moreau-phd" },
        { k: "Langues", v: "Français (natif) · Anglais (B2)" },
      ],
      nowTitle: "En ce moment", nowUpdated: "maj mai 2026",
      now: [
        { tag: "recherche", title: "Post-doc RAUC · UPJV", desc: "Prédiction des complications post-opératoires pour les urgences chirurgicales digestives, avec le CHU d'Amiens." },
        { tag: "produit", title: "Solis — ERP IA pour TPE", desc: "Un ERP IA pour artisans & TPE : devis, factures, facturation électronique, dictée vocale (Whisper), OCR." },
        { tag: "produit", title: "MVP Boussole — T4 2026", desc: "Assistant IA pour les aides françaises (60+ via OpenFisca) et les recours juridiques. MVP livré en novembre." },
      ],
    },
    work: {
      num: "02", title: "Réalisations", subtitle: "Produits & applications — en production ou en développement actif.",
      items: [
        { no: "01", kind: "Produit · en dev", year: "2024 →", name: "Solis — ERP propulsé par l'IA", desc: "ERP full-stack pour artisans & TPE français, en développement avancé : devis, factures, avoirs, acomptes, facturation électronique (Factur-X), abonnements Stripe, OCR, dictée vocale (Whisper) et assistant IA conversationnel. Audit RGPD, design system « Atelier » maison.", tags: ["Django", "Next.js 15", "Claude API", "Whisper", "Stripe", "Factur-X"], href: "https://noovate.ddns.net/", hrefLabel: "Démo live" },
        { no: "02", kind: "Produit · déployé", year: "2024", name: "Vesta — planning radiologie", desc: "Application web qui génère le planning mensuel du Service de Radiologie du CHU d'Amiens — 5 spécialités, rotation sur 6 semaines, verrous manuels avec régénération automatique. 100 % côté client (React + Vite), persisté en localStorage.", tags: ["React", "Vite", "TypeScript", "Déployé au CHU"] },
      ],
    },
    experience: {
      num: "03", title: "Expérience",
      items: [
        { date: "09/2025 — en cours", role: "Post-Doctorant en IA", org: "Université de Picardie Jules Verne — Amiens", bullets: ["Projet RAUC : parcours de soins optimisé pour les urgences chirurgicales digestives, intégrant IA et e-santé", "Prédiction des complications post-opératoires à partir de données cliniques", "Partenariat avec le CHU d'Amiens"] },
        { date: "03/2024 — 05/2025", role: "Ingénieur Data & IA — Responsable IA & Data Science Santé", org: "Capgemini Engineering — Paris", bullets: ["Direction de la conception et du développement d'un démonstrateur d'assistant médical par IA générative, workflows multimodaux", "Pipelines NLP : OCR pour analyses sanguines, transcription Whisper, extraction de mots-clés", "Fine-tuning de LLM (OpenAI, Mistral) avec PEFT / LoRA pour résumés cliniques et transcription", "Pipeline RAG multimodal avec LangChain sur données médicales structurées et non structurées", "Recherche appliquée sur la segmentation du placenta (UNetR, SwinUNet)", "Coordination chercheurs, data scientists et cliniciens (équipe de 15–20)"] },
        { date: "2022 — 2023", role: "ATER — Attaché Temporaire d'Enseignement et de Recherche", org: "Université de Picardie Jules Verne — Amiens", bullets: ["TD et TP pour étudiants de licence (PHP, Bash, C, programmation avancée)", "Conception de cours sur les fondamentaux du machine learning"] },
        { date: "2019 — 2023", role: "Thèse — Modélisation et Analyse du Mouvement Humain", org: "UPJV & CHU d'Amiens", bullets: ["Création d'une base de données de mouvements humains pour l'analyse quantitative et l'entraînement de modèles", "Analyse : ACP, Dynamic Time Warping (DTW), corrélation", "Algorithmes génétiques pour le réglage de paramètres et la sélection de features", "Modèles de deep learning (RNN, LSTM, CNN, réseaux résiduels) et SVM", "Représentations biomécaniques interprétables via modèles dynamiques matriciels", "Thèse soutenue en novembre 2023"] },
        { date: "2017 — 2019", role: "Développeur (alternance → CDD)", org: "LV Informatique — Amiens", bullets: ["Développement et maintenance de l'ERP Lynéade / Lynéa2 (WinDev) : compta, achats, ventes, inventaire, SAV", "Administration base SQL et optimisation des performances", "Développement piloté client — fondement direct de mon ERP actuel (Solis)"] },
      ],
    },
    research: {
      num: "04", title: "Recherche & publications",
      projTitle: "Projets recherche & pro",
      projects: [
        { name: "Assistant Médical IA (Capgemini)", desc: "Démonstrateur d'assistant médical par IA générative, traitement multimodal : OCR analyses sanguines, Whisper STT, fine-tuning LLM pour résumés cliniques, RAG multimodal.", tags: ["Python", "LangChain", "PEFT / LoRA", "RAG"] },
        { name: "Segmentation du placenta (Doppler 3D)", desc: "Segmentation par Transformers (UNetR, SwinUNet) pour la détection précoce de la prééclampsie sur images Doppler 3D. Soumis à CMIG 2025 (co-auteur).", tags: ["PyTorch", "UNetR", "SwinUNet", "Imagerie médicale"] },
        { name: "Analyse du mouvement humain (thèse)", desc: "Modélisation du mouvement appliquée à Parkinson et à la reconnaissance d'activité. Deep learning (RNN, LSTM, CNN), algorithmes génétiques, représentations matricielles interprétables. 3 publications.", tags: ["RNN / LSTM", "PCA / DTW", "Algos génétiques", "SVM"] },
      ],
      pubTitle: "Publications sélectionnées",
      pubs: [
        { year: "2026", status: "Accepté", title: "A Genetic Algorithm-Optimized PID Controller for Robust Tumor Treatment via Combined Immuno-Chemotherapy", venue: "Int. Conf. on Control, Decision and Information Technologies (CoDIT)", authors: "Jérôme Bosche, Consibelle Djiffouo Dzoyim, Pierre Moreau" },
        { year: "2025", status: "Soumis", title: "Towards Better Placenta Segmentation for Earlier Preeclampsia Detection on 3D Doppler Images", venue: "Computerized Medical Imaging and Graphics (CMIG)", authors: "C. Alliod, E. Micard, Pierre Moreau, L. Challier, G. Martensen, H. Kadi, S. Le Bars, O. Morel, M. Blanchon, M. Beaumont" },
        { year: "2023", status: "Publié", title: "Two-branch neural network using two data types for human activity recognition", venue: "IEEE Sensors Journal", authors: "Pierre Moreau, David Durand, Jérôme Bosche, Michel Lefranc" },
        { year: "2021", status: "Publié", title: "A motion recognition technique based on linear matrix representation to improve Parkinson's disease treatments", venue: "9th Int. Conf. on Systems and Control (ICSC)", authors: "Pierre Moreau, David Durand, Jérôme Bosche, Michel Lefranc" },
        { year: "2020", status: "Publié", title: "A motion recognition algorithm using polytopic modeling", venue: "7th Int. Conf. on Control, Decision and Information Technologies (CoDIT)", authors: "Pierre Moreau, David Durand, Jérôme Bosche, Michel Lefranc" },
      ],
    },
    skills: {
      num: "05", title: "Compétences",
      groups: [
        { label: "ML & Deep Learning", items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "XGBoost", "Hugging Face", "CNN / RNN / LSTM", "Transformers", "Reinforcement Learning", "Algos génétiques"] },
        { label: "IA générative & LLM", items: ["Claude API", "OpenAI", "LangChain", "RAG multimodal", "PEFT / LoRA", "Fine-tuning", "Prompt Engineering", "Vector DB"] },
        { label: "Vision par ordinateur", items: ["UNetR", "SwinUNet", "OpenCV", "PIL / Pillow", "Imagerie médicale", "Segmentation"] },
        { label: "NLP & Parole", items: ["NLTK", "Whisper (STT)", "OCR", "Tokenization", "Embeddings"] },
        { label: "Data Science & IA explicable", items: ["NumPy", "Pandas", "SciPy", "Matplotlib", "Seaborn", "PCA", "DTW", "SHAP", "LIME", "ANOVA"] },
        { label: "Backend & MLOps", items: ["FastAPI", "Django", "Flask", "Next.js 15", "Supabase", "PostgreSQL", "Docker", "Stripe"] },
        { label: "Langages & Outils", items: ["Python", "SQL", "JavaScript / TypeScript", "Bash", "HTML / CSS", "Git", "Claude Code / Cursor", "Jupyter"] },
        { label: "Éthique IA & Conformité", items: ["RGPD / GDPR", "EU AI Act", "Biais / Équité", "IA explicable", "Quantization / Pruning"] },
        { label: "Langues parlées", items: ["Français — Natif", "Anglais — B2"] },
      ],
    },
    contact: {
      num: "06", title: "Contact",
      big: "Construisons quelque chose d'utile ensemble.",
      lead: "Toujours partant pour échanger sur l'IA & le ML — surtout en santé et sur des produits concrets. Écrivez-moi.",
      methods: [
        { label: "Email", value: "moreau.p.02@gmail.com", href: "mailto:moreau.p.02@gmail.com" },
        { label: "LinkedIn", value: "pierre-moreau-phd", href: "https://www.linkedin.com/in/pierre-moreau-phd/" },
        { label: "GitHub", value: "pierre-moreau-phd", href: "https://github.com/pierre-moreau-phd" },
      ],
    },
    footer: { note: "Docteur ML · Ingénieur IA Santé · conçu à Amiens" },
  },
};

/* ============================================================
   Rendu du <head>
   ============================================================ */
function jsonLd(lang, s) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pierre Moreau",
    givenName: "Pierre",
    familyName: "Moreau",
    jobTitle: s.jobTitle,
    description: s.personDesc,
    url: SITE + "/",
    email: "mailto:" + COMMON.email,
    telephone: COMMON.telephone,
    image: COMMON.image,
    address: { "@type": "PostalAddress", addressLocality: "Amiens", addressCountry: "FR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: s.org, url: "https://www.u-picardie.fr/" },
    worksFor: { "@type": "Organization", name: s.org },
    sameAs: COMMON.sameAs,
    knowsAbout: s.knowsAbout,
    knowsLanguage: s.knowsLanguage.map((l) => ({ "@type": "Language", name: l.name, alternateName: l.alternateName })),
  };
  return JSON.stringify(data, null, 2);
}

function head(lang) {
  const s = SEO[lang];
  return `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(s.title)}</title>

  <!-- SEO -->
  <meta name="description" content="${esc(s.description)}">
  <meta name="author" content="Pierre Moreau">
  <meta name="keywords" content="${esc(s.keywords)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${s.canonical}">

  <!-- i18n alternates -->
  <link rel="alternate" hreflang="en" href="${SITE}/index.html">
  <link rel="alternate" hreflang="fr" href="${SITE}/index-fr.html">
  <link rel="alternate" hreflang="x-default" href="${SITE}/">

  <!-- Schema.org Person -->
  <script type="application/ld+json">
${jsonLd(lang, s)}
  </script>

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${s.ogUrl}">
  <meta property="og:title" content="${esc(s.title)}">
  <meta property="og:description" content="${esc(s.ogDesc)}">
  <meta property="og:image" content="${COMMON.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(s.title)}">
  <meta property="og:locale" content="${s.ogLocale}">
  <meta property="og:locale:alternate" content="${s.ogLocaleAlt}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(s.title)}">
  <meta name="twitter:description" content="${esc(s.twDesc)}">
  <meta name="twitter:image" content="${COMMON.image}">
  <meta name="twitter:image:alt" content="${esc(s.title)}">

  <!-- Theme color -->
  <meta name="theme-color" content="#0a0c10">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="apple-touch-icon" href="favicon.svg">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

  <!-- Styles & script -->
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
  <noscript><style>[data-reveal]{opacity:1;transform:none}</style></noscript>`;
}

/* ============================================================
   Rendu du <body>
   ============================================================ */
function nav(lang, t) {
  const links = list(t.nav, (n) => `<a href="#${n.id}" class="nav-link" data-nav="${n.id}">${esc(n.label)}</a>`);
  const enActive = lang === "en" ? " is-active" : "";
  const frActive = lang === "fr" ? " is-active" : "";
  return `<header class="site-header" id="top">
  <nav class="nav">
    <a href="#top" class="nav-brand"><span class="nav-dot" aria-hidden="true"></span>Pierre Moreau</a>
    <div class="nav-right">
      <div class="nav-links">${links}</div>
      <div class="nav-tools">
        <div class="lang-pill" role="group" aria-label="Language">
          <a class="lang-btn${enActive}" href="index.html" hreflang="en">EN</a>
          <a class="lang-btn${frActive}" href="index-fr.html" hreflang="fr">FR</a>
        </div>
        <a class="cv-btn" href="${esc(t.hero.cvHref)}" download>${esc(t.hero.cvLabel)} <span aria-hidden="true">↓</span></a>
      </div>
    </div>
  </nav>
</header>`;
}

function hero(t) {
  const h = t.hero;
  return `<section id="home" class="hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="hero-inner">
    <div class="hero-content">
      <div class="hero-status" data-reveal data-reveal-delay="0"><span class="status-dot" aria-hidden="true"></span>${esc(h.status)}</div>
      <h1 class="hero-name" data-reveal data-reveal-delay="70">${esc(h.name)}</h1>
      <p class="hero-role" data-reveal data-reveal-delay="140">${esc(h.role)}</p>
      <p class="hero-tagline" data-reveal data-reveal-delay="210">${esc(h.tagline)}</p>
      <div class="hero-actions" data-reveal data-reveal-delay="280">
        <a href="#contact" class="btn-primary">${esc(h.ctaContact)} →</a>
        <a href="#work" class="btn-ghost">${esc(h.ctaWork)}</a>
      </div>
    </div>
  </div>
</section>`;
}

function metrics(t) {
  return `<section class="metrics">
  <div class="metrics-inner">
    ${list(t.metrics, (m) => `<div class="metric" data-reveal>
      <div class="metric-value" data-count="${m.target}">${esc(m.value)}</div>
      <div class="metric-label">${esc(m.label)}</div>
    </div>`)}
  </div>
</section>`;
}

function sectionHead(num, title, tight) {
  return `<div class="section-head${tight ? " tight" : ""}" data-reveal>
    <span class="section-num">${esc(num)}</span>
    <h2 class="section-title">${esc(title)}</h2>
    <span class="section-rule" aria-hidden="true"></span>
  </div>`;
}

function about(t) {
  const a = t.about;
  return `<section id="about" class="section">
  ${sectionHead(a.num, a.title)}
  <div class="about-cols">
    <div class="about-main">
      <div class="about-lead" data-reveal>
        ${list(a.lead, (p) => `<p>${esc(p)}</p>`)}
      </div>
      <div class="about-facts" data-reveal>
        ${list(a.facts, (f) => `<div class="fact"><div class="fact-k">${esc(f.k)}</div><div class="fact-v">${esc(f.v)}</div></div>`)}
      </div>
    </div>
    <div class="about-side" data-reveal>
      <div class="now-card">
        <div class="now-head">
          <span class="now-head-title">${esc(a.nowTitle)}</span>
          <span class="now-updated">${esc(a.nowUpdated)}</span>
        </div>
        ${list(a.now, (n) => `<div class="now-item">
          <span class="now-tag">${esc(n.tag)}</span>
          <div class="now-item-title">${esc(n.title)}</div>
          <div class="now-desc">${esc(n.desc)}</div>
        </div>`)}
      </div>
    </div>
  </div>
</section>`;
}

function work(t) {
  const w = t.work;
  return `<div class="band">
  <section id="work" class="section">
    ${sectionHead(w.num, w.title, true)}
    <p class="section-sub" data-reveal>${esc(w.subtitle)}</p>
    <div class="work-list">
      ${list(w.items, (it) => `<article class="work-card" data-reveal>
        <div class="work-card-row">
          <div class="work-card-main">
            <div class="work-meta">
              <span class="work-kind">${esc(it.kind)}</span>
              <span class="dot-sep" aria-hidden="true"></span>
              <span class="work-year">${esc(it.year)}</span>
            </div>
            <h3 class="work-name">${esc(it.name)}</h3>
            <p class="work-desc">${esc(it.desc)}</p>
            <div class="tags">${list(it.tags, (tag) => `<span class="tag">${esc(tag)}</span>`)}</div>
          </div>
          <div class="work-card-side">
            <span class="work-no" aria-hidden="true">${esc(it.no)}</span>
            ${it.href ? `<a class="link-pill" href="${esc(it.href)}" target="_blank" rel="noopener">${esc(it.hrefLabel)} ↗</a>` : ""}
          </div>
        </div>
      </article>`)}
    </div>
  </section>
</div>`;
}

function experience(t) {
  const e = t.experience;
  return `<section id="experience" class="section">
  ${sectionHead(e.num, e.title)}
  ${list(e.items, (it) => `<div class="exp-row" data-reveal>
    <div class="exp-date">${esc(it.date)}</div>
    <div>
      <h3 class="exp-role">${esc(it.role)}</h3>
      <div class="exp-org">${esc(it.org)}</div>
      <ul class="exp-bullets">${list(it.bullets, (b) => `<li>${esc(b)}</li>`)}</ul>
    </div>
  </div>`)}
</section>`;
}

function research(t) {
  const r = t.research;
  return `<div class="band">
  <section id="research" class="section">
    ${sectionHead(r.num, r.title)}
    <div class="subhead" data-reveal>${esc(r.projTitle)}</div>
    <div class="proj-grid">
      ${list(r.projects, (p) => `<article class="proj-card" data-reveal>
        <h3 class="proj-name">${esc(p.name)}</h3>
        <p class="proj-desc">${esc(p.desc)}</p>
        <div class="tags">${list(p.tags, (tag) => `<span class="tag sm">${esc(tag)}</span>`)}</div>
      </article>`)}
    </div>
    <div class="subhead pubs" data-reveal>${esc(r.pubTitle)}</div>
    ${list(r.pubs, (p) => `<article class="pub-row" data-reveal>
      <div class="pub-meta">
        <span class="pub-year">${esc(p.year)}</span>
        <span class="pub-status">${esc(p.status)}</span>
      </div>
      <div>
        <h3 class="pub-title">${esc(p.title)}</h3>
        <div class="pub-venue">${esc(p.venue)}</div>
        <div class="pub-authors">${esc(p.authors)}</div>
      </div>
    </article>`)}
  </section>
</div>`;
}

function skills(t) {
  const s = t.skills;
  return `<section id="skills" class="section">
  ${sectionHead(s.num, s.title)}
  <div class="skills-grid">
    ${list(s.groups, (g) => `<div class="skill-group" data-reveal>
      <h3 class="skill-label">${esc(g.label)}</h3>
      <div class="chips">${list(g.items, (i) => `<span class="chip">${esc(i)}</span>`)}</div>
    </div>`)}
  </div>
</section>`;
}

function contact(t) {
  const c = t.contact;
  return `<section id="contact" class="contact">
  <div class="contact-glow" aria-hidden="true"></div>
  <div class="contact-inner">
    <div class="contact-eyebrow" data-reveal>${esc(c.num)} · ${esc(c.title)}</div>
    <h2 class="contact-big" data-reveal>${esc(c.big)}</h2>
    <p class="contact-lead" data-reveal>${esc(c.lead)}</p>
    <div class="contact-grid">
      ${list(c.methods, (m) => `<a class="contact-card" data-reveal href="${esc(m.href)}"${/^https?:/.test(m.href) ? ' target="_blank" rel="noopener"' : ""}>
        <span class="contact-card-label">${esc(m.label)}</span>
        <span class="contact-card-value">${esc(m.value)} <span aria-hidden="true">↗</span></span>
      </a>`)}
    </div>
  </div>
</section>`;
}

function footer(t) {
  return `<footer class="site-footer">
  <div class="footer-inner">
    <span class="footer-item">© 2026 Pierre Moreau</span>
    <span class="footer-item">${esc(t.footer.note)}</span>
    <a href="#top" class="footer-top">↑ top</a>
  </div>
</footer>`;
}

function page(lang) {
  const t = CONTENT[lang];
  const body = [
    nav(lang, t),
    hero(t),
    metrics(t),
    about(t),
    work(t),
    experience(t),
    research(t),
    skills(t),
    contact(t),
    footer(t),
  ].join("\n\n");

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
${head(lang)}
</head>
<body>
${body}
</body>
</html>
`;
}

/* ---------- write ---------- */
const out = [
  { file: "index.html", lang: "en" },
  { file: "index-fr.html", lang: "fr" },
];
for (const { file, lang } of out) {
  fs.writeFileSync(path.join(__dirname, file), page(lang), "utf8");
  console.log("écrit", file, "(" + lang + ")");
}
