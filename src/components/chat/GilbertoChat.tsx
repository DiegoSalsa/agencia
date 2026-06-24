"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { usePathname } from "next/navigation";
import { Bot, Loader2, Send } from "lucide-react";

const CHAT_SESSION_KEY = "gilberto.public.sessionMessages";

function getMessageText(message: UIMessage) {
    return message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("");
}

function renderInlineMarkdown(text: string) {
    const pieces = text.split(/(\*\*[^*]+\*\*)/g);

    return pieces.map((piece, index) => {
        if (piece.startsWith("**") && piece.endsWith("**")) {
            return (
                <strong key={index} className="font-semibold text-neutral-50">
                    {piece.slice(2, -2)}
                </strong>
            );
        }

        return <span key={index}>{piece}</span>;
    });
}

function MessageText({ text }: { text: string }) {
    const normalized = text
        .replace(/\r\n/g, "\n")
        .replace(/([.!?])([A-ZÁÉÍÓÚÑ])/g, "$1\n\n$2")
        .replace(/(\*\*[^*]+:\*\*)/g, "\n$1 ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    return (
        <div className="space-y-2">
            {normalized.split("\n").map((line, index) => {
                const cleanLine = line.trim();
                if (!cleanLine) return <div key={index} className="h-1" />;

                const bullet = cleanLine.match(/^[-*]\s+(.+)/);
                if (bullet) {
                    return (
                        <div key={index} className="flex gap-2">
                            <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-indigo-500" />
                            <p>{renderInlineMarkdown(bullet[1])}</p>
                        </div>
                    );
                }

                return <p key={index}>{renderInlineMarkdown(cleanLine)}</p>;
            })}
        </div>
    );
}

function ChatContactForm({ reason }: { reason?: string }) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (result.ok) {
                setStatus("success");
            } else {
                setStatus("error");
                setErrorMsg(result.message || "Error al enviar");
            }
        } catch (err) {
            setStatus("error");
            setErrorMsg("Error de conexión");
        }
    }

    if (status === "success") {
        return (
            <div className="mt-3 rounded-md bg-green-500/10 p-3 text-sm text-green-200 border border-green-500/20 text-center">
                ¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 rounded-md border border-white/10 bg-neutral-900/50 p-3">
            {reason && <p className="text-[12px] font-medium text-indigo-300 mb-1">{reason}</p>}
            <input name="name" required placeholder="Tu nombre" className="rounded border border-white/10 bg-neutral-950 px-2 py-1.5 text-[13px] text-neutral-100 outline-none focus:border-indigo-500/50" />
            <input name="email" type="email" required placeholder="tu@email.com" className="rounded border border-white/10 bg-neutral-950 px-2 py-1.5 text-[13px] text-neutral-100 outline-none focus:border-indigo-500/50" />
            <textarea name="message" required placeholder="¿En qué te podemos ayudar?" rows={2} className="resize-none rounded border border-white/10 bg-neutral-950 px-2 py-1.5 text-[13px] text-neutral-100 outline-none focus:border-indigo-500/50" />
            
            {status === "error" && <p className="text-[12px] text-red-400">{errorMsg}</p>}
            
            <button type="submit" disabled={status === "loading"} className="mt-1 rounded bg-indigo-600 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-50">
                {status === "loading" ? "Enviando..." : "Enviar mensaje"}
            </button>
        </form>
    );
}

const initialMessage: UIMessage = {
    id: "initial-msg",
    role: "assistant",
    parts: [{ type: "text", text: "¡Hola! Soy Gilberto, asesor de PuroCode. ¿En qué te puedo ayudar hoy?" }],
};

function readSessionMessages() {
    if (typeof window === "undefined") return [initialMessage];

    try {
        const raw = window.sessionStorage.getItem(CHAT_SESSION_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
        }
    } catch {
        // Fallback
    }
    return [initialMessage];
}

export default function GilbertoChat({ className = "" }: { className?: string }) {
    const pathname = usePathname();
    const pathnameRef = useRef(pathname);
    const [input, setInput] = useState("");
    const [initialMessages] = useState<UIMessage[]>(() => readSessionMessages() as UIMessage[]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const transport = useMemo(
        () =>
            new DefaultChatTransport({
                api: "/api/gilberto",
                prepareSendMessagesRequest: ({ messages }) => {
                    return {
                        body: {
                            messages,
                            context: {
                                pathname: pathnameRef.current,
                            },
                        },
                    };
                },
            }),
        [],
    );

    const { messages, sendMessage, status, stop, error } = useChat({
        transport,
        messages: initialMessages,
    });

    const isBusy = status === "submitted" || status === "streaming";

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, status]);

    useEffect(() => {
        pathnameRef.current = pathname;
    }, [pathname]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.sessionStorage.setItem(CHAT_SESSION_KEY, JSON.stringify(messages));
    }, [messages]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const text = input.trim();
        if (!text || isBusy) return;

        setInput("");
        await sendMessage({ text });
    }

    return (
        <section className={`mx-auto flex h-[min(720px,calc(100vh-2rem))] w-full max-w-3xl flex-col rounded-lg border border-white/10 bg-neutral-950 shadow-2xl ${className}`}>
            <header className="flex flex-col gap-3 border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-indigo-600">
                        <Bot size={17} className="text-white" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="truncate text-[15px] font-semibold text-neutral-100">Gilberto</h2>
                        <p className="truncate text-[12px] text-neutral-500">Asesor Comercial de PuroCode</p>
                    </div>
                </div>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                {messages.map((message) => {
                    const isUser = message.role === "user";
                    let text = getMessageText(message);
                    
                    const showForm = text.includes("[CONTACT_FORM]");
                    if (showForm) {
                        text = text.replace(/\[CONTACT_FORM\]/g, "").trim();
                    }

                    return (
                        <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[85%] rounded-lg border px-4 py-3 text-[14px] leading-6 ${
                                    isUser
                                        ? "border-indigo-500/30 bg-indigo-600/20 text-indigo-50"
                                        : "border-white/10 bg-neutral-900 text-neutral-200"
                                }`}
                            >
                                {text ? <MessageText text={text} /> : message.role === "assistant" && !showForm ? "Escribiendo..." : ""}
                                
                                {showForm && <ChatContactForm />}
                            </div>
                        </div>
                    );
                })}

                {isBusy && (
                    <div className="flex items-center gap-2 text-[13px] text-neutral-500">
                        <Loader2 size={14} className="animate-spin" />
                        Gilberto está escribiendo
                    </div>
                )}

                {error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-[13px] text-red-200">
                        {error.message || "No se pudo completar la respuesta."}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
                <div className="flex items-end gap-2 rounded-lg border border-white/10 bg-neutral-900 p-2 focus-within:border-indigo-500/50 transition-colors">
                    <textarea
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                                event.preventDefault();
                                event.currentTarget.form?.requestSubmit();
                            }
                        }}
                        rows={1}
                        placeholder="Escríbele a Gilberto..."
                        className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-[14px] text-neutral-100 outline-none placeholder:text-neutral-600"
                    />
                    <button
                        type={isBusy ? "button" : "submit"}
                        onClick={isBusy ? stop : undefined}
                        disabled={!isBusy && !input.trim()}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-600 text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                        title={isBusy ? "Detener respuesta" : "Enviar"}
                    >
                        {isBusy ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                </div>
            </form>
        </section>
    );
}
