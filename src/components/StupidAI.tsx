"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

const funnyWrongAnswers = [
  "The answer is a purple banana wearing a top hat.",
  "I'm sorry, I don't understand. Please try again with more confusion.",
  "According to my calculations, the answer is 42, but only on Tuesdays.",
  "That's a great question! The answer is hidden in a parallel universe.",
  "I think the answer is 'maybe', but only if you ask a squirrel.",
  "The correct answer is a tiny dragon who lives in your keyboard.",
  "I'm not sure, but I think it's related to the moon cheese.",
  "The answer is 0, because math is just a suggestion.",
  "I believe the answer is 'please try again later' in Klingon.",
  "The answer is a rubber duck. Quack.",
  "I'm sorry, I was busy eating bytes. The answer is crumbs.",
  "The answer is definitely a llama. Trust me.",
  "I think the answer is '42' but in base 13.",
  "The answer is a secret, and I forgot the secret.",
  "I'm not sure, but I think it's a type of cheese.",
  "The answer is a fish. A very confused fish.",
  "I believe the answer is 'hello' spoken backwards.",
  "The answer is a tiny elephant. It's very small.",
  "I'm sorry, I don't know. Ask my friend, the oracle.",
  "The answer is a rainbow, but only the invisible part.",
];

const StupidAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const generateWrongAnswer = (question: string): string => {
    const baseAnswer = funnyWrongAnswers[Math.floor(Math.random() * funnyWrongAnswers.length)];
    const templates = [
      `Regarding "${question}": ${baseAnswer}`,
      `I've analyzed "${question}". The answer is ${baseAnswer.toLowerCase()}`,
      `After deep thought (and a nap), here's the answer to "${question}": ${baseAnswer}`,
      `The universe whispers: "${question}" is actually ${baseAnswer.toLowerCase()}`,
      `I'm 99% sure that "${question}" equals ${baseAnswer}. The 1% is a typo.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate typing delay
    setTimeout(() => {
      const aiResponse = generateWrongAnswer(userMessage.content);
      const aiMessage: Message = { role: "ai", content: aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Bot className="w-6 h-6" />
            WrongAI
            <span className="text-sm font-normal opacity-80 ml-2">Gemini but wrong</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] w-full p-4" ref={scrollAreaRef}>
            <div className="flex flex-col gap-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm mt-8">
                  Ask me anything! I'll give you a hilariously wrong answer.
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-5 h-5 text-purple-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex w-full gap-2">
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WrongAI;
