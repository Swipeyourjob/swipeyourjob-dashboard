export class roomlist{
    constructor(public roomlist: Array<Room>) { }
}

export class Room{
    constructor(public roommessage: Array<Message>) { }
    jobid!: number;
    roomname !: string;
    roomimage !: string;
    active : boolean = false;
}
export class Message{
    sender!: string;
    me!: boolean;
    message!:string;
}
