export class roomlist{
    constructor(public roomlist: Array<Room>) { }
}

export class Room{
    constructor(public roommessage: Array<Message>) { }
    jobid!: number;
    roomname !: string;
    roomimage !: string;
    active : boolean = false;
    roomid !: number;
}

export class CreateRoomRequest{
    chatjobid!: number;
    chatname!:string;
    roomGuest!:string[];
}
export class RoomRequest{
    room_id             !:  number;
    chatname            !: string; 
    chatjobid           !: string;
    roomAdmin           !: string;
    jobLogo             !: string;
    jobTitle            !: string;
    companyTitle        !: string;
    chatLastMessage     !: string;
    lastmessageboolean  !: boolean;
}
export class Message{
    sender!: string;
    me!: boolean;
    message!:string;
}

export class CreateroomResponse {
    ok !:boolean;
    reason !:string;
}

export class loginSocket{
    jwt     !: string | null;
    action  !: string | null;
    message ?: string | null;
    roomid  ?: number | null;
}