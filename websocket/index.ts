// utils/websocket/index.ts
import { WebSocketClient } from './WebSocketClient';

const WS_URL = 'ws://172.16.0.10:5101'; // Hoặc từ process.env nếu cần

export const websocketInstance = new WebSocketClient(WS_URL);
