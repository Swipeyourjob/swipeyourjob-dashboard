import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, Room, roomlist, RoomRequest } from 'app/_models/chat';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class ChatService {

  rooms : roomlist = {
    roomlist: []
  };
  

  constructor(private http: HttpClient) { }
  
  getrooms(){
    this.getUserRooms().subscribe(
      (data) =>{
        data.forEach(element => {
          let jobid : number = parseInt(element.chatjobid);
          
          let message   : Message     = {sender: "zyad", me:true, message:`Hi Zyad,graag neem ik contact met je op`};
          let message2  : Message    = {sender: "kevin", me:false, message:"Ja super gaaf!!! U kunt mij bellen op 06-123454321"};
          let message3  : Message    = {sender: "arjan", me:true, message:"Top, is het goed als ik je bel op 19 Jan 2038?"};
          let message4  : Message    = {sender: "ronald", me:false, message:"Ja dat is helemaal prima, ik spreek u dan"};
          let current_room : Room   = {roommessage: [message,message2,message3,message4],jobid:jobid,roomname:element.chatname,roomimage:element.jobLogo,active:false, roomid: element.room_id};
          this.rooms.roomlist.push(current_room);
        });
        // this.rooms.roomlist.push(te);
        // this.rooms.roomlist.push(tee);
      },
      (err) => {
        console.log(err);
      }

    );
   
  }
  private getUserRooms() {
    return this.http.get<RoomRequest[]>(`${environment.apiUrl}/rooms?start=1&amount=10000000`, httpOptions);
  }
}
