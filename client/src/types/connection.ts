export interface IConnectionParticipant {
    id: string;
    name: string;
    image: string | null;
}

export interface IConnectionArea {
    id: string;
    name: string;
}

export interface IPendingConnection {
    id: string;
    status: string;
    createdAt: string;
    requester: IConnectionParticipant;
    area: IConnectionArea;
}

export interface IActiveConnection {
    id: string;
    status: string;
    createdAt: string;
    requester: IConnectionParticipant;
    receiver: IConnectionParticipant;
    area: IConnectionArea;
}
