// utils/WebSocketClient.ts
type WebSocketEventCallback = (data: string) => void;

export class WebSocketClient {
    private socket: WebSocket | null = null;
    private url: string;
    private onMessageCallback?: WebSocketEventCallback;
    private reconnectInterval = 5000;

    constructor(url: string) {
        this.url = url;
    }

    public connect() {
        try {
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                console.log("[WebSocket] Connected");
            };

            this.socket.onmessage = (event) => {
                console.log("[WebSocket] Message received:", event.data);
                if (this.onMessageCallback) {
                    this.onMessageCallback(event.data);
                }
            };

            this.socket.onerror = (error) => {
                console.error("[WebSocket] Error:", error);
            };

            this.socket.onclose = () => {
                console.warn("[WebSocket] Disconnected. Reconnecting in 5s...");
                setTimeout(() => this.connect(), this.reconnectInterval);
            };
        } catch (ex) {
            console.error('[WebSocket] Exception during connect:', ex);
        }
    }

    public onMessage(callback: WebSocketEventCallback) {
        this.onMessageCallback = callback;

        // Nếu socket đang mở, gán lại handler luôn
        if (this.socket) {
            this.socket.onmessage = (event) => {
                if (this.onMessageCallback) {
                    this.onMessageCallback(event.data);
                }
            };
        }
    }

    public send(message: string) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.warn("[WebSocket] Cannot send, socket not open");
        }
    }

    public close() {
        this.socket?.close();
    }

    public isConnected() {
        return this.socket?.readyState === WebSocket.OPEN;
    }
}
