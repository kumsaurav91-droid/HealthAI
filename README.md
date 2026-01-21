# 🏥 HealthAI | AI Mental Health & Early Disease Detection

**HealthAI** is a research-driven, preventive healthcare prototype developed for the **IBM SkillsBuild / AICTE Applied AI Internship 2025**. Aligned with the **United Nations Sustainable Development Goal 3 (Good Health & Well-being)**, this platform serves as a first-level digital screening companion to bridge the gap between symptom onset and professional medical intervention.

---

## 🎯 Project Purpose
The platform addresses the critical need for a private, stigma-free environment where individuals can evaluate their well-being. It focuses on:
* **Mental Health Screening:** Identifying stressors and anxiety markers to promote timely awareness.
* **Early Disease Identification:** Symptom-based analysis for early identification of physical health risks.
* **Stigma Reduction:** Providing an anonymized interface for users who may otherwise delay seeking help due to social pressure.

---

## 🌟 Key Features
* **Real-Time AI Diagnostic Chat:** Engage in natural language conversations with a diagnostic assistant to discuss health concerns.
* **Dynamic Risk Visualization:** Features animated progress bars for Mental Stress and Physical Risk that update instantly based on AI analysis.
* **Intelligent UI Logic:** The interface utilizes a color-coded system (Green, Orange, Red) to reflect the severity of identified risks.
* **Responsive Dashboard:** A modern, dark-themed interface built with glassmorphism effects for a premium user experience.

---

## 🌍 SDG Alignment
This project is strictly mapped to **UN SDG 3**:
* **Target 3.4:** Promote mental health and well-being through digital awareness tools.
* **Target 3.d:** Strengthen the capacity for early warning and risk reduction for global health risks.

---

## 🛠️ Technical Stack
* **Frontend:** HTML5, CSS3, and **Tailwind CSS** for a modern, responsive user interface.
* **Backend:** **Node.js** and **Express.js** to handle API requests and diagnostic logic.
* **AI Engine:** Upgraded to **Google Gemini 2.5 Flash** for ultra-fast NLP analysis.
* **PDF Engine:** **jsPDF** integration for client-side report generation.
* **Machine Learning:** **Extra Trees Classifier** model used for risk classification with **81.8% accuracy**.
* **Security:** **Dotenv** for secure management of sensitive API credentials.

---

## 🚀 Live Project Access
* **Live Demo:** [**View HealthAI on Render**](https://healthai-x4b4.onrender.com/)
* **Resources:** [**HealthAI Resources**](https://drive.google.com/drive/folders/1JUB4s77eTYI1nNo7eTV1Iu63m7eDq851?usp=drive_link)

---

## 💻 Optimal Viewing Experience
> [!IMPORTANT]
> **For the best user experience, it is highly recommended to view the live website in Desktop Mode.** The dashboard's glassmorphism effects and real-time risk charts are optimized for larger screens to provide full clarity of the diagnostic data.

---

## ⚙️ How It Works (Data Flow)
The system follows a synchronized architecture to ensure data integrity and real-time feedback:
* Natural Language Input: User describes symptoms in the chat interface.
* AI Processing: Gemini 2.5 Flash parses the text to identify medical markers and emotional distress levels.
* Data Normalization: The backend converts AI probabilities into a 0-100 scale.
* UI Update: script.js triggers CSS transitions to move the risk bars and change colors based on risk thresholds.
* Report Generation: report.js captures the current session state and compiles a structured PDF using jsPDF.

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository
Open your terminal and run the following commands to download the project files:
```bash
git clone [https://github.com/kumsaurav91-droid/HealthAI.git](https://github.com/kumsaurav91-droid/HealthAI.git)
cd HealthAI
```
### Step 2: Environment Setup (Required)

This project requires a secure API key to connect to Gemini 2.5 Flash:
* **1.** Create a file named .env in the root folder.
* **2.** Paste your Google AI Studio API key inside as shown below:
```bash
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

### Step 3: Install Dependencies

* Install the necessary Node.js packages (Express, Dotenv, Google Generative AI):
```bash
npm install
```

### Step 4: Verify Installation
* Ensure you have the correct versions of Node and NPM installed:
```Bash
node --version
npm --version
```

### Step 5: Start the Application
* Launch the server to begin the diagnostic research session:
```Bash
npm start
```
[!NOTE] Once the terminal shows "Server running", open http://localhost:3000 in your browser.



## 📂 File Structure
```text
HealthAI/
├── public/                 # Frontend Assets (Client-Side)
│   ├── index.html          # Dashboard structure & Tailwind UI layout
│   ├── style.css           # Custom glassmorphism, animations & bar transitions
│   └── script.js           # Fetch API logic, DOM manipulation & UI updates
├── .env                    # Secret Environment Variables (API Keys - Local Only)
├── .gitignore              # Prevents sensitive files from being public
├── package.json            # Project metadata and dependencies
├── server.js               # Backend Server & Gemini AI integration
└── README.md               # Detailed Project Documentation
```

## 📞 Contact

**SAURAV KUMAR**

- GitHub: [@kumsaurav91-droid](https://github.com/kumsaurav91-droid)
- Linkedin Profile: [@kumsaurav91](https://www.linkedin.com/in/kumsaurav91)

**⭐ Star this repository if you find it helpful!**


// ssss