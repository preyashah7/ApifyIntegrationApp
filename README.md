# 🚀 Apify Integration App

A full-stack React application to run Apify actors dynamically by fetching input schemas and showing outputs. This tool allows users to:

- Authenticate using their Apify API Key
- Select an actor from their Apify account
- Enter input dynamically based on the actor's schema
- Run the actor and view results in real-time

---

## 🧪 Test Actor Used

For testing this application, the following actor was used:

```

23cspre130\~mytestactor

````

This actor was created manually and supports a simple input schema for quick testing and output simulation.

---

## ▶️ How to Run the Application

### 1. **Clone the repository**

```bash
git clone https://github.com/your-username/apify-integration-app.git
cd apify-integration-app
````

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Start the backend (optional)**

If you're using the fallback schema feature via local server (`localhost:5000`):

```bash
# from backend folder
npm run start
```

Otherwise, make sure you're using valid Apify API access to retrieve live schemas.

### 4. **Start the React app**

```bash
npm start
```

It will open at: [http://localhost:5173](http://localhost:5173)

---

## 🧠 Assumptions & Design Choices

| Design Area            | Decision                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **Step-based UI**      | Used a simple linear stepper (`API Key → Actor Selection → Input & Output`) for clarity and better UX |
| **Schema Fetching**    | If live schema fails (e.g., actor is private or non-existent), fallback to local dummy schema         |
| **Output Display**     | Only displays simple JSON items from actor run (logs or results) to keep UI minimal                   |
| **Single Page Output** | Combined input and output in Step 3 for smoother UX and less scrolling/navigation                     |
| **Actor Format**       | Actor ID must follow `username~actorname` convention (as required by Apify API)                       |

---

## 📸 Screenshots

### 🔐 Step 1: Enter API Key

![Step 1](screenshots/Screenshot%202025-07-31%20170630.png)

### 🎭 Step 2: Fetching Actors

![Step 2](screenshots/Screenshot%202025-07-31%20170652.png)

### 📝 Step 3: Dropdown Of All The Actors

![Step 3](screenshots/Screenshot%202025-07-31%20170711.png)

### 🔐 Step 4: Select Actor

![Step 4](screenshots/Screenshot%202025-07-31%20170734.png)

### 🎭 Step 5: Fill Input & Run Actor

![Step 5](screenshots/Screenshot%202025-07-31%20170804.png)

### 📝 Step 6: Actor Completing it's task
![Step 6](screenshots/Screenshot%202025-07-31%20170816.png)

### 🔐 Step 7: Output

![Step 7](screenshots/Screenshot%202025-07-31%20170904.png)
![Step 8](screenshots/Screenshot%202025-07-31%20170918.png)
![Step 9](screenshots/Screenshot%202025-07-31%20170933.png)
---

## 📦 Folder Structure

```
/apify-integration-app/
├── /server/
├── /public/
├── /src/
│   ├── /components/
│   │   ├── ApiKeyInput.jsx
│   │   ├── ActorSelector.jsx
│   │   └── ActorInputForm.jsx
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```


---

## 📩 Contact

For any issues or feedback, feel free to reach out!