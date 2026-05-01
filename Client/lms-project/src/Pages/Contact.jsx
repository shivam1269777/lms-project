import HomeLayout from "../Layouts/HomeLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosinstance from "../Helpers/axiosintance";
import { Mail, User, MessageSquare } from "lucide-react";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!userInput.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      toast.error("Invalid Email ID");
      return;
    }

    try {
      const response = axiosinstance.post("/contact", { ...userInput });
      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Form submitted successfully 🎉",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({ name: "", email: "", message: "" });
      }
    } catch (err) {
      toast.error("Operation failed...");
    }
  }

  return (
    <HomeLayout>
      
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black px-4">
        
        <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
          shadow-[0_10px_40px_rgba(255,255,255,0.05)] hover:shadow-[0_15px_60px_rgba(255,235,59,0.15)] 
          transition-all duration-500">
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Contact <span className="text-yellow-400">Us</span>
          </h1>
          <p className="text-center text-gray-400 mb-8 text-sm">
            We’d love to hear from you! Please fill out the form below.
          </p>

          <form noValidate onSubmit={onFormSubmit} className="flex flex-col gap-5">
            
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Full name"
                onChange={handleInputChange}
                value={userInput.name}
                className="w-full bg-gray-900/70 text-white placeholder-gray-400 border border-gray-700 rounded-lg pl-10 pr-3 py-3 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 outline-none transition-all"
              />
            </div>

            
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleInputChange}
                value={userInput.email}
                className="w-full bg-gray-900/70 text-white placeholder-gray-400 border border-gray-700 rounded-lg pl-10 pr-3 py-3 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 outline-none transition-all"
              />
            </div>

            
            <div className="relative">
              <MessageSquare className="absolute top-3 left-3 text-gray-400" size={20} />
              <textarea
                id="message"
                name="message"
                placeholder="Your message..."
                onChange={handleInputChange}
                value={userInput.message}
                className="w-full bg-gray-900/70 text-white placeholder-gray-400 border border-gray-700 rounded-lg pl-10 pr-3 py-3 h-36 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 outline-none transition-all resize-none"
              />
            </div>

            
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-white-900 font-semibold py-3 rounded-lg text-base transition-all duration-300 shadow-sm hover:shadow-yellow-400/30 active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>

          
          <p className="text-center text-sm text-gray-400 mt-5">
            We usually respond within{" "}
            <span className="text-yellow-400 font-medium">24 hours</span>.
          </p>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Contact;
