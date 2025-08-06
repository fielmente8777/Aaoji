"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { IoIosSend } from "react-icons/io";
import "react-datepicker/dist/react-datepicker.css";
import "./input-date.scss";
import { countries } from "./constant";
import Image from "next/image";

const ChatWindow = ({
  messages,
  messageFlows,
  onClose,
  onSubmit,
  title,
  logo,
  theme,
  finalMessage,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [chat, setChat] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [countryCode, setCountryCode] = useState("+91");

  const [startDate] = useState(new Date());

  const [selectedOptions, setSelectedOptions] = useState({});
  const chatEndRef = useRef(null);

  const isValidDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-").map(Number);
    if (!day || !month || !year || year.toString().length !== 4) return false;
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const toDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleChange = (e) => setInput(e.target.value);

  const handleDateChange = (dateValue) => {
    const value = new Date(dateValue || "").toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const [day, month, year] = value.split("/");

    if (!value) return;

    const currentFlow = messageFlows[currentIndex];
    const key = currentFlow.key || `q${currentIndex}`;
    const answer = `${day}-${month}-${year}`;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (key.toLowerCase() === "check-in") {
      if (!isValidDate(answer)) {
        addBotMessage(
          "❌ Invalid check-in date. Format should be DD-MM-YYYY.",
          key
        );
        return;
      }

      const checkIn = toDate(answer);
      setCheckInDate(checkIn);

      if (checkIn < today) {
        addBotMessage("❌ Check-in date cannot be in the past.", key);
        return;
      }
    }

    if (key.toLowerCase() === "check-out") {
      if (!isValidDate(answer)) {
        addBotMessage(
          "❌ Invalid check-out date. Format should be DD-MM-YYYY.",
          key
        );
        return;
      }

      const checkOut = toDate(answer);
      if (checkOut <= checkInDate) {
        addBotMessage("❌ Check-out date must be after check-in date.", key);
        return;
      }
    }

    setChat((prev) => [...prev, { sender: "user", text: answer, key }]);
    setAnswers((prev) => ({ ...prev, [key]: answer }));
    setInput("");
    setCurrentStep((prev) => prev + 1);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const nextIndex = currentIndex + 1;

      if (nextIndex < messageFlows.length) {
        setCurrentIndex(nextIndex);
        setChat((prev) => [
          ...prev,
          {
            sender: "bot",
            text: messageFlows[nextIndex].question,
            ...(messageFlows[nextIndex].options && {
              options: messageFlows[nextIndex].options,
            }),
            key: messageFlows[nextIndex].key,
          },
        ]);
      } else {
        setShowFinalMessage(true);
        if (onSubmit) onSubmit({ ...answers, [key]: answer });
      }
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentFlow = messageFlows[currentIndex];
    const key = currentFlow.key || `q${currentIndex}`;
    let answer = input;

    if (key === "phone") {
      answer = `${countryCode} ${answer}`;
    }

    setChat((prev) => [...prev, { sender: "user", text: answer, key }]);
    setAnswers((prev) => ({ ...prev, [key]: answer }));
    setInput("");
    setCurrentStep((prev) => prev + 1);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const nextIndex = currentIndex + 1;

      if (nextIndex < messageFlows.length) {
        setCurrentIndex(nextIndex);
        setChat((prev) => [
          ...prev,
          {
            sender: "bot",
            text: messageFlows[nextIndex].question,
            ...(messageFlows[nextIndex].options && {
              options: messageFlows[nextIndex].options,
            }),
            key: messageFlows[nextIndex].key,
          },
        ]);
      } else {
        setShowFinalMessage(true);
        if (onSubmit) onSubmit({ ...answers, [key]: answer });
      }
    }, 1000);
  };

  const handleOptionSelect = (selectedOption, allOptions, key) => {
    if (selectedOption.value === "all") {
      setSelectedOptions((prev) => {
        const existing = prev[key] || { isSelected: false, value: [] };

        if (existing.isSelected) return prev;

        return {
          ...prev,
          [key]: {
            ...existing,
            value: allOptions.map((item) => item.label),
          },
        };
      });
    } else {
      setSelectedOptions((prev) => {
        const existing = prev[key] || { isSelected: false, value: [] };

        if (existing.isSelected) return prev;

        if (existing.value.includes(selectedOption.label)) {
          return {
            ...prev,
            [key]: {
              ...existing,
              value: existing.value.filter(
                (opt) => opt !== selectedOption.label
              ),
            },
          };
        }

        return {
          ...prev,
          [key]: {
            ...existing,
            value: [...existing.value, selectedOption.label],
          },
        };
      });
    }
  };

  const handleConfirm = () => {
    const currentFlow = messageFlows[currentIndex];
    const key = currentFlow.key || `q${currentIndex}`;

    setChat((prev) => [
      ...prev,
      { sender: "user", text: selectedOptions[key].value, key },
    ]);

    setSelectedOptions((prev) => {
      const isExist = prev[key];

      if (isExist && isExist.value.length > 0) {
        return {
          ...prev,
          [key]: { ...isExist, isSelected: true },
        };
      }

      return { ...prev };
    });

    setAnswers((prev) => ({ ...prev, [key]: selectedOptions[key].value }));
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const nextIndex = currentIndex + 1;

      if (nextIndex < messageFlows.length) {
        setCurrentIndex(nextIndex);
        setChat((prev) => [
          ...prev,
          {
            sender: "bot",
            text: messageFlows[nextIndex].question,
            ...(messageFlows[nextIndex].options && {
              options: messageFlows[nextIndex].options,
            }),
            key: messageFlows[nextIndex].key,
          },
        ]);
      } else {
        setShowFinalMessage(true);
        if (onSubmit)
          onSubmit({ ...answers, [key]: selectedOptions[key]?.value });
      }
    }, 1000);
  };

  const addBotMessage = (text, key) => {
    setChat((prev) => [...prev, { sender: "bot", text, key }]);
  };

  useEffect(() => {
    if (chat.length === 0 && messageFlows.length > 0) {
      setChat([
        {
          sender: "bot",
          text: messageFlows[0].question,
          key: messageFlows[0].key,
        },
      ]);
    }
  }, [messageFlows, chat.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  return (
    <div className="sm:rounded-2xl shadow-2xl sm:h-[80dvh] flex flex-col h-full scroll sm:w-[375px]">
      {/* Header */}
      <div
        className="p-4 flex justify-between items-center "
        style={{
          background: theme,
          color: "white",
        }}
      >
        <div className="flex items-center">
          {logo && (
            <Image
              width={45}
              height={25}
              src={logo}
              alt="Hotel logo"
              className="mr-2 object-contain rounded-full"
            />
          )}
          <h3 className="font-medium">{title}</h3>
        </div>

        <div className="flex space-x-2">
          {/* <button
            onClick={onReset}
            className="p-1 rounded hover:bg-opacity-20 hover:rotate-45 duration-500"
            aria-label="Start new conversation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-.75-.75H11.77a.75.75 0 000 1.5h2.43l-.31.31a7 7 0 00-11.712 3.138.75.75 0 001.45.389a5.5 5.5 0 019.2-2.466l.312.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                clipRule="evenodd"
              />
            </svg>
          </button> */}

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-opacity-20 hover:rotate-180 duration-500"
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
      {/* Messages area */}
      <div className="flex-1 flex-grow bg-gray-50 flex flex-col p-4 gap-2 overflow-auto scroll-hidden">
        <p className="text-sm rounded-lg text-[#474747] ">{title}</p>

        <div
          className={`max-w-[80%] px-3 py-2 text-sm rounded-lg self-start bg-gray-200 text-gray-800`}
        >
          {messages}
        </div>

        {chat.map((msg, index) => (
          <>
            {msg.sender === "bot" && index !== 0 && (
              <p className="rounded-lg text-[#474747]">{title}</p>
            )}

            <div
              key={index}
              style={{
                background: `${
                  msg?.sender === "user"
                    ? !Array.isArray(msg.text)
                      ? theme
                      : ""
                    : "#EEEEEE"
                }`,
              }}
              className={`max-w-[85%] break-words whitespace-wrap px-3 py-3 rounded-lg mt-3 ${
                msg.sender === "user"
                  ? "self-end bg-gray-100 text-white"
                  : "self-start bg-gray-200 text-gray-800"
              }`}
            >
              {Array.isArray(msg.text) ? (
                <div className="flex flex-wrap gap-2 justify-end border-t-[2px] py-2">
                  {msg.text.map((opt, index) => (
                    <div
                      key={index}
                      style={{
                        background: theme,
                      }}
                      className="text-white rounded-full text-sm px-3 py-1"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              ) : (
                msg.text
              )}
            </div>

            {msg?.options && (
              <div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {msg.options.map((opt, idx) => (
                    <button
                      key={idx}
                      style={{
                        background: `${
                          selectedOptions[msg.key]?.value.includes(opt?.label)
                            ? theme
                            : "#eae6e6"
                        }`,

                        color: `${
                          selectedOptions[msg.key]?.value.includes(opt.label)
                            ? "#ffffff"
                            : "#393838"
                        }`,
                      }}
                      onClick={() =>
                        handleOptionSelect(opt, msg?.options, msg?.key)
                      }
                      className={`px-3 py-1 text-sm rounded-full border text-white`}
                      disabled={selectedOptions[msg.key]?.isSelected}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {selectedOptions[msg.key] &&
                  selectedOptions[msg.key].value.length > 0 &&
                  !selectedOptions[msg.key]?.isSelected && (
                    <div>
                      <button
                        className="mx-0 bg-slate-900 text-white rounded-full text-sm px-6 mt-2 py-1"
                        onClick={() => handleConfirm()}
                      >
                        Confirm
                      </button>
                    </div>
                  )}
              </div>
            )}
          </>
        ))}

        {showFinalMessage && (
          <div className="max-w-full px-3 py-2 rounded-lg text-sm self-start bg-gray-200 text-gray-800 mt-5">
            {`🎉 ${finalMessage}` || "🎉 Thank you for your responses!"}
          </div>
        )}

        {/* Typing Indicator */}

        {isTyping && (
          <div className="max-w-[80%] w-fit">
            <div>
              <p className="text-sm rounded-lg mt-1 text-[#474747]">{title}</p>
            </div>

            <div className="mt-1 w-fit">
              {/* <span class="loader"></span> */}
              <div className="flex bg-gray-200 py-3 gap-2 px-4 rounded-lg text-sm">
                <div className="h-[10px] animate-pulse w-[10px] rounded-full bg-gray-400" />
                <div className="h-[10px] animate-pulse w-[10px] rounded-full bg-gray-400" />
                <div className="h-[10px] animate-pulse w-[10px] rounded-full bg-gray-400" />
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
      {/* input field form */}
      {currentIndex < messageFlows.length && (
        <form
          onSubmit={handleSubmit}
          className="p-1 border-t bg-gray-50 w-full sm:px-0 px-4 py-3 flex items-center">
          <div className="flex items-center gap-2 w-full border sm:border-none border-gray-600 sm:rounded-none rounded-full px-2">
            <div className="w-full flex items-center">
              {messageFlows[currentIndex]?.key === "phone" && (
                <select
                  className=" text-gray-700"
                  onChange={(e) => setCountryCode(e.target.value)}
                  // defaultValue={countries[0].code}
                  value={countryCode}
                >
                  {countries.map((countryCode, idx) => (
                    <option key={idx} value={countryCode.code}>
                      {countryCode.code}
                    </option>
                  ))}
                </select>
              )}

              {messageFlows[currentIndex]?.type?.toLowerCase() === "date" ? (
                <div className="w-full relative">
                  <div className="w-full h-full rounded-md text-sm">
                    <DatePicker
                      showTwoColumnMonthYearPicker
                      className="outline-none py-6 px-4 cursor-pointer w-full"
                      selected={startDate}
                      onChange={(date) => handleDateChange(date)}
                      showMonthDropdown
                      showIcon
                      dateFormat={"dd/MM/yyyy"}
                    />
                  </div>

                  {/* <input
                    ref={dateRef}
                    type={messageFlows[currentIndex]?.type}
                    value={input}
                    onChange={handleDateChange}
                    placeholder="Type your answer..."
                    className="w-full h-full rounded-md text-sm outline-none bg-transparent bg-blue-500 absolute top-0 -z-50"
                    disabled={
                      !!messageFlows[currentIndex].options ||
                      messageFlows.length === currentStep
                    }
                    required
                  /> */}
                </div>
              ) : (
                <input
                  type={messageFlows[currentIndex]?.type}
                  value={input}
                  onChange={handleChange}
                  placeholder="Type your answer..."
                  className="w-full h-full flex-grow rounded-md px-3 py-4 text-black placeholder:text-gray-500 outline-none bg-transparent"
                  disabled={
                    !!messageFlows[currentIndex].options ||
                    messageFlows.length === currentStep
                  }
                  required
                />
              )}
            </div>

            <button
              type="submit"
              // style={{
              //   background: theme || "#C2185B",
              // }}
              disabled={
                !!messageFlows[currentIndex].options ||
                messageFlows[currentIndex].type === "date"
              }
              className=" flex justify-center items-center"
            >
              <span className="inline-block duration-200">
                <IoIosSend
                  size={24}
                  color={theme || "C2185B"}
                  opacity={`${
                    messageFlows?.length === currentStep ? "0.4" : "1"
                  }`}
                />
              </span>
            </button>
          </div>
        </form>
      )}
      <span className="text-sm bg-white text-center py-2 text-black/50">
        Powered by Eazotel
      </span>
    </div>
  );
};

export default ChatWindow;
