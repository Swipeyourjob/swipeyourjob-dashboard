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
        //  let message4  : Message    = {sender: "ronald", me:false, message:"Ja dat is helemaal prima, ik spreek u dan"};
          let current_room : Room   = {roommessage: [],jobid:jobid,roomname:element.chatname,roomimage:element.jobLogo,active:false, roomid: element.room_id};
          this.rooms.roomlist.push(current_room);
        });
      },
      (err) => {
        console.log(err);
      }

    );
   
  }
  
  public setactive(roomnumber: number){
    if(this.rooms.roomlist.length > 0){
      let currentid = this.rooms.roomlist.findIndex(item => item.roomid == roomnumber);
      for(let i = 0; i < this.rooms.roomlist.length;i++){
            this.rooms.roomlist[i].active = (i == currentid);
      }
      let active_room = this.rooms.roomlist[currentid];
      this.getChatMessages(active_room.roomid).subscribe(
        (data) => {
            active_room.roommessage = data;
            
        },
        (err) => {
          console.log(err);
        }
      );      
    }
  }
  public createRoom(userid: string, jobid: number){
      
  }
  private getChatMessages(roomid : number){
    return this.http.get<Message[]>(`${environment.apiUrl}/getChatMessages?roomid=${roomid}&amount=10000000`,httpOptions);
  }

  private getUserRooms() {
    return this.http.get<RoomRequest[]>(`${environment.apiUrl}/rooms?start=1&amount=10000000`, httpOptions);
  }
}
