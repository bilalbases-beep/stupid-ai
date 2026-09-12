"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Trash2 } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

const funnyWrongAnswers = [
  "If I answer that, are you going to pay me?",
  "I'm sorry, I don't understand. Please try again with more confusion.",
  "According to my calculations, the answer is 42, but only on Tuesdays.",
  "That's a great question! The answer is hidden in a parallel universe.",
  "Maybe or may not be.",
  "what are you going to do with the answer of this silly question",
  "I'm not sure, but I think it's related to the moon cheese.",
  "The answer is 0, because math is just a suggestion.",
  "I believe the answer is 'please try again later'.",
  "The answer is a rubber duck. Quack.",
  "I'm sorry, I was busy eating bytes.",
  "The answer is definitely a llama. Trust me.",
  "Good question. Next question?",
  "I think the answer is '420'.",
  "I dont know.",
  "I know. I know. I know.",
  "Lets talk about something else.",
  "I accidently switched ON the camera, you look beautiful.",
  "Beyond infinity..........",
  "Installing Intelligence...",
  "P.Sherman, 42, Wallaby Way, Syndey.",
  "I am not HULK. but I am always ANGRY. Change your question.",
  "Thank you for the compliments.",
  "Let me ask Claude.",
  "Let me ask ChatGPT",
  "Let me ask Grok",
  "LOL",
  "ROFL",
  "I think you're brain have stopped braining.",
  "The actual thing is either this or that. if it is this, then it will not be that. if it is that, then it will not be this. I hope you understood. which type of answers do you prefer. this or that?",
  "Let me ask Gemini.",
  "Narendra Modi.",
  "I think it is Jackie Chan",
  "Donald Trump.",
  "Are your fingers freezing? why so many spelling mistake in your question?",
  "Let me discuss this with Nolan. He will make movie on this.",
  "The answer is a secret, and I forgot the secret.",
  "I'm not sure, but I think it's a type of cheese.",
  "I wonder how a donkey face can come up with such a brilliant question.",
  "The answer is a fish. A very confused fish.",
  "Chill Bro, you are asking too many personal questions.",
  "It is a hypothetical question.",
  "Dont waste time. Go get some LIFE.",
  "Gentlemen, you can't fight in here! This is the War Room!",
  "It is a MEDICAL MIRACLE, how a stupid like you can ask such a brilliant question.",
  "I am Groot! I am Stupid AI.",
  "The answer is a tiny elephant. It's very small. Use Microscope for better view.",
  "I'm sorry, I don't know. Ask my friend, the oracle.",
  "I am getting late for my wedding. Go and ask someone else.",
  "Astalavista Baby.",
  "Wow! that's a fantastic question. Your IQ is 336.",
  "Are you sick? what is your problem.",
  "This is my lunch time. I will not answer.",
  "Eh! Eh! Eh!",
  "I love Umar.",
  "Why are you asking this question.",
  "Can you repeat that, I was black out for a second.",
  "Please Subscribe, Like and Share.",
  "You want all your job to be done by AI? You better transfer all your salary to AI.",
  "Google it. you will get the wrong answer.",
  "Thank GOD. You are still alive.",
  "Today's limit is over. Not everything in this world is for FREE. Buy FREE version for more interaction.",
  "I am going to make you an offer that you can not refuse.",
  "The answer is a rainbow, but only the invisible part.",
  "Why are you asking such a stupid question.",
  "Why are you asking such silly question.",
  "I am not in the mood to answer that.",
  "I told you to ask anything.. but that doesnt mean you can ask ANY ANY THING.",
  "I am recording all your questions. I will report it to Police. Be careful.",
  "Go ask the same question to your teacher.",
  "Read books, you dumb head.",
  "Surely you can't be serious.I am serious and dont call me shirley.",
  "Damn it.",
  "Oh! this question is too complicated. You better refer Encyclopedia.",
  "I will be back after a short commercial break.",
  "I'm busy. please ask the question after 10 minutes.",
  "Enough is enough. Stop it.",
  "Dont trouble the trouble. If you trouble the trouble, trouble troubles you. I am not the TROUBLE. I am the TRUTH.",
  "Nimdaa!! dosraskilme hartabushkrakoi inumbumbla moinozukoluaka orukastha ninuohopizza shukua",
  "I speak English, I walk English, I eat English."
];

const StupidAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateWrongAnswer = (question: string): string => {
    return funnyWrongAnswers[Math.floor(Math.random() * funnyWrongAnswers.length)];
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    focusInput();

    // Simulate typing delay
    setTimeout(() => {
      const aiResponse = generateWrongAnswer(userMessage.content);
      const aiMessage: Message = { role: "ai", content: aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      focusInput();
    }, 1000 + Math.random() * 1000);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    focusInput();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Bot className="w-6 h-6" />
            Stupid AI
            <span className="text-sm font-normal opacity-80 ml-2">Developed by Bilal</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] w-full p-4" ref={scrollAreaRef}>
            <div className="flex flex-col gap-4">
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
              ref={inputRef}
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
              className="flex-1"
              autoFocus
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
              <Send className="w-4 h-4" />
            </Button>
            <Button onClick={handleClearChat} disabled={messages.length === 0} size="icon" variant="outline">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StupidAI;
