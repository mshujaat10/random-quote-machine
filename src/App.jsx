import './App.css'
import React, { useMemo, useState } from "react";
import { FaQuoteLeft, FaTwitter } from "react-icons/fa";

function App() {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [theme, setTheme] = useState("text-[#27ae60]");
  const [bgTheme, setBgTheme] = useState("bg-[#27ae60]")

  const themeColors = ["text-[#2c3e50]", "text-[#f39c12]", "text-[#77b1a9]", "text-[#16a085]", "text-[#9b59b6]", "text-[#fb6964]"];
  const bgThemeColors = ["bg-[#2c3e50]", "bg-[#f39c12]", "bg-[#77b1a9]", "bg-[#16a085]", "bg-[#9b59b6]", "bg-[#fb6964]"];

  const getRandomQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes", {
        method: "GET",
      });
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      const randomThemeIndex = Math.floor(Math.random() * themeColors.length);
      const randomTheme = themeColors[randomThemeIndex];
      const randomBgTheme = bgThemeColors[randomThemeIndex]
      setBgTheme(randomBgTheme)
      setTheme(randomTheme);
      setQuote(randomQuote);
    } catch (err) {
      console.log("Error occurred: ", err);
      throw err;
    }
  };

  useMemo(() => {
    getRandomQuote();
  }, []);

  return (
    <div className={`w-full h-full ${bgTheme} flex items-center justify-center`}>
      <div id="wrapper">
        <div id="quote-box" className="bg-white px-[50px] py-[40px] rounded-[15px]">
          <div className="w-[450px] text-center mb-4">
            <i className={`${theme} inline-block text-2xl me-[10px]`}><FaQuoteLeft /></i>
            <span id="text" className={`text-[28px] leading-8 ${theme}`}>{quote.text}</span>
          </div>
          <p className={`text-end ${theme} text-xl mb-5`} id="author">- {quote.author}</p>
          <div className="flex items-center justify-between mt-2">
            <a className={`${bgTheme} text-white rounded-sm p-3`} href="https://twitter.com/intent/tweet" id="tweet-quote" target="_blank" title="Tweet this Quote!"><FaTwitter /></a>
            <button onClick={getRandomQuote} id="new-quote" className={`${bgTheme} text-white py-2 px-5 rounded-md`}>New quote</button>
          </div>
        </div>
        <p className="text-white text-center pt-5 text-[15px]">By Muhammad Shujaat</p>
      </div>
    </div>
  )
}

export default App
