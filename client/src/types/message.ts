export interface IMessage {
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    connectionId: string;
    createdAt: string;
}