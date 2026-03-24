# 💬 AnonyDrop (Anonymous Messaging Platform)

SpillIt is a modern anonymous messaging web app that allows users to receive honest messages from anyone through a unique shareable link.

Inspired by platforms like NGL, but built with a scalable serverless architecture using Vercel and Supabase.

---

## 🚀 Features

* 🔗 Unique user link (e.g. `/u/username`)
* 🕵️ Anonymous message submission
* 📥 Private inbox dashboard
* ⚡ Fast serverless backend (Vercel Functions)
* 🗄️ Supabase database integration
* 🔐 Secure authentication (Supabase Auth)
* 🚫 Basic anti-spam protection
* 📱 Mobile-friendly UI

---

## 🧠 How It Works

1. User signs up and gets a unique username
2. A public link is generated:

   ```
   https://yourapp.com/u/username
   ```
3. Anyone can send anonymous messages through that link
4. Messages are stored securely in the database
5. User logs in to view messages privately

---

## 🏗️ Tech Stack

**Frontend**

* React (Vite)
* Tailwind CSS

**Backend**

* Vercel Serverless Functions

**Database**

* Supabase (PostgreSQL)

**Authentication**

* Supabase Auth

---

## 📂 Project Structure

```
/src
  /pages
  /components
  /hooks

/api
  send-message.js
  get-messages.js

/supabase
  client.js
```

---

## ⚙️ Environment Variables

Create a `.env` file and add:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 🛠️ Setup & Installation

1. Clone the repo:

   ```
   git clone https://github.com/your-username/spillit.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run locally:

   ```
   npm run dev
   ```

---

## 🌐 Deployment

This project is optimized for deployment on **Vercel**:

* Push to GitHub
* Import project into Vercel
* Add environment variables
* Deploy 🚀

---

## ⚠️ Disclaimer

This app allows anonymous messaging. Misuse (harassment, bullying, abuse) is strictly discouraged.

Future improvements may include:

* Content moderation
* AI filtering
* Reporting system

---

## 💡 Future Improvements

* 🔔 Real-time notifications
* 📊 Message analytics
* 🧠 AI-generated prompts
* 🔗 Social media sharing
* 📩 Reply system

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built by Hassan Mahmud 🚀
