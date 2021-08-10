import { Injectable } from '@angular/core';
import { Message, Room, roomlist } from 'app/_models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  rooms : roomlist = {
    roomlist: []
  };
  

  constructor() { }
  
  getrooms(){
    let message : Message = {sender: "zyad", me:true, message:`Hi Zyad,graag neem ik contact met je op`};
    let message2 : Message = {sender: "kevin", me:false, message:"Ja super gaaf!!! U kunt mij bellen op 06-123454321"};
    let message3 : Message = {sender: "arjan", me:true, message:"Top, is het goed als ik je bel op 19 Jan 2038?"};
    let message4 : Message = {sender: "ronald", me:false, message:"Ja dat is helemaal prima, ik spreek u dan"};
    let te : Room = {roommessage: [message,message2,message3,message4],jobid:3,roomname:"zyad e",roomimage:"rr",active:true};
    let tee : Room = {roommessage: [message,message2,message3,message4],jobid:2,roomname:"zyad kamer",roomimage:"plaatje",active:false};
    this.rooms.roomlist.push(te);
    this.rooms.roomlist.push(tee);
  }
}
