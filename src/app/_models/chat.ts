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
