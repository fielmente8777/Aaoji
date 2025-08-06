"use client";
import React, { useEffect, useState } from "react";
import "./chatbot.css";
import ChatbotButton from "./ChatbotButton";
import ChatWindow from "./ChatWindow";

const ChatbotWidget = ({
  onSubmit,
  messages,
  messageFlows,
  openInterval,
  finalMessage,
  title,
  logo,
  theme = "#7D684D",
  setIsOpenChatbot,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [innerWidth, setInnerWidth] = useState(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (setIsOpenChatbot) setIsOpenChatbot(!isOpen);
  };

  const handleSubmit = async (formData) => {
    try {
      if (onSubmit) await onSubmit(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      setIsOpen(true);
      if (setIsOpenChatbot) setIsOpenChatbot(true);
    }, openInterval || 3000);

    return () => clearInterval(interval);
  }, [openInterval]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);

      const handleResize = () => {
        setInnerWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      if (isOpen) {
        if (innerWidth && innerWidth < 640) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      } else {
        document.body.style.overflow = "auto";
      }

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isOpen, innerWidth]);

  return (
    <div>
      {isOpen && (
        <div className="fixed sm:bottom-4 bottom-0 md:right-4 sm:right-2 right-0 z-[99999999] sm:w-fit w-full sm:h-fit h-dvh bg-gray-500 ">
          <div
            className={`w-full h-full ${
              isOpen
                ? "transition-all duration-500 translate-y-0 block"
                : "translate-y-full opacity-0 hidden"
            }`}
          >
            {messageFlows && messageFlows.length > 0 && (
              <ChatWindow
                messages={messages}
                messageFlows={messageFlows}
                onClose={toggleChat}
                onSubmit={handleSubmit}
                title={title}
                logo={logo}
                theme={theme}
                finalMessage={finalMessage}
              />
            )}
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="px-2 fixed bottom-6 right-4 z-[99999]">
          <ChatbotButton onClick={toggleChat} theme={theme} />
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
