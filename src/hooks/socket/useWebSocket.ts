import React from "react";
import { useChatStore } from "@/providers/stores/ChatStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { getCookie } from "@/app/actions";

export function useWebSocket() {
    const wsRef = React.useRef<WebSocket | null>(null);
    const isConnected = React.useRef(false);

    const { clearWordQueue, pushInWordQueue } = useChatStore(
        useShallow((state) => ({
            clearWordQueue: state.clearWordQueue,
            pushInWordQueue: state.pushInWordQueue,
        })),
    );

    const connectWebSocket = React.useCallback(async () => {
        try {
            const development = process.env.NEXT_PUBLIC_ENV === "development";
            const BASEURL = development
                ? process.env.NEXT_PUBLIC_WS_DEV_URL
                : process.env.NEXT_PUBLIC_WS_PROD_URL;
            const sessionid = await getCookie("sessionid");

            if (!BASEURL) throw new Error("BASEURL is not defined");
            if (!sessionid) throw new Error("sessionid is not defined");

            let wsUrl = "";

            if (window.location.protocol === "http:") {
                wsUrl = "ws://";
            } else {
                wsUrl = "wss://";
            }

            wsUrl += window.location.host + "/api/ws/?sessionid=${sessionid}";

            wsRef.current = new WebSocket(wsUrl);

            wsRef.current.onopen = () => {
                console.log("ws connected +_+");
                isConnected.current = true;
            };

            wsRef.current.onmessage = (event: MessageEvent) => {
                const data = JSON.parse(event.data);
                if (data.event_name === "TEST") {
                    clearWordQueue();
                }
                if (data.event_name === "PROMPT_TEXT_RECEIVE") {
                    pushInWordQueue(data.data.text);
                }
            };

            wsRef.current.onclose = () => {
                console.log("ws disconnected, reconnecting...");
                isConnected.current = false;
                // Try reconnecting after 1 second
                setTimeout(() => connectWebSocket(), 1000);
            };

            wsRef.current.onerror = (error) => {
                console.error("ws error:", error);
                wsRef.current?.close();
            };
        } catch (error) {
            console.error("failed to initialize, error:", error);
        }
    }, [clearWordQueue, pushInWordQueue]);

    React.useEffect(() => {
        connectWebSocket();
        return () => wsRef.current?.close();
    }, [connectWebSocket]);

    const ensureWebSocketConnected = React.useCallback(async () => {
        if (!isConnected.current && wsRef.current?.readyState !== WebSocket.OPEN) {
            console.log("ws not connected, reconnecting...");
            connectWebSocket();
            while (!isConnected.current) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        }
    }, [connectWebSocket]);

    return { ensureWebSocketConnected, wsRef, isConnected };
}
