// FireBase
// var database = firebase.database();
console.log(document.getElementById("check"))
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBqHYkfC1jCnH2GD6rBDTj66HJpap9eufE',
  authDomain: 'smarthome-c2d9d.firebaseapp.com',
  projectId: 'smarthome-c2d9d'
});
const firebase_db = firebaseApp.firestore();


const  roomsOfHome=[];
firebase_db.collection("NhaA")
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc)=>{
        
      })
        
    });
    
    firebase_db.collection("roomNhaA")
    .onSnapshot((querySnapshot) => {
      document.querySelector('.category ul').innerHTML ='';
      querySnapshot.forEach((doc)=>{
         document.querySelector('.category ul').innerHTML +=`<li ><a href="#!"class="room" >${doc.data().roomName}</a></li>`      
      })
        
    });        


// Header
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('weather_status');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecast = document.getElementById('weather_forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='629281bc49a62ccb35a7e72f96f14d66';



getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        //console.log(data)
        showWeatherData(data);
        })

    })
}


// function showWeatherData(data){
  
//   //console/log(tempIndoor)
//     let {humidity,temp, wind_speed} = data.current;
//     //console.log(humidity,temp,wind_speed)    
//     currentWeatherItemsEl.innerHTML=
//     `<div >
//     <div class="temp" style="font-size:20px;">
//       <strong id="tempOutdoor"> 14°C</strong>
//       <strong>°C/</strong>
//       <strong>${temp}°C</strong>
//     </div>
//     <p>Indoor/Outdoor Temp</p>
//   </div>
//   <div>
//   <div class="humit" style="font-size:20px;" >
//       <strong id="humitOutdoor"> 48.2%/ </strong>
//       <strong>%/</strong>
//       <strong>  ${humidity} %</strong>
//     </div>
//     <p>Indoor/Outdoor Humidity</p>
//   </div>
//   <div>
//     <strong style="font-size:20px;">${wind_speed} km/h</strong>
//     <p>Wind speed</p>
//   </div>
// </div>`
//   // weatherForecast.innerHTML=
//   // `<img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="weather icon" class="weather_icon">
//   //             <!-- <div class="icon icon-w"></div> -->
//   //             <div class="heading">
//   //               <h5 class="date" id="date">Monday, 1 Feb 2019</h5>
//   //               <h2 class="title" id="title">${data.current.weather[0].main}</h2>`
//   document.getElementById('weather_icon').src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
//   document.getElementById('title').innerHTML=`${data.current.weather[0].main}`;

//   }



    firebase_db.collection("NhaA").where("type","==","sensor")
    .onSnapshot((querySnapshot) => {
      
      querySnapshot.forEach((doc) => {
        
        document.getElementById("tempOutdoor").innerHTML=doc.data().temp;
        document.getElementById("humitOutdoor").innerHTML=doc.data().humidity;
        
    });
  })
  
  setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const yeah = time.getFullYear();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month] +" " +yeah;

}, 1000);

const rooms= document.getElementsByClassName('room');
function handleRoom(){
  for (let index = 0; index < rooms.length; index++) {    
    
    rooms[index].addEventListener('click',function(){
      this.removeClass("active");
    })
  }
 }
handleRoom();

//JS for Modal and Del Device
const modal = document.querySelector(".modal");

const iconCloseModal = document.querySelector(".modal_icon_close i");
const buttonCloseModal = document.querySelector(".modal__footer button");
const buttonYesModal = document.getElementById('button_y');

const devices= document.getElementsByClassName('del_device');
function delDevice(){
  for (let index = 0; index < devices.length; index++) {
    devices[index].onclick=function(){
      modal.classList.toggle("hide")
      //console.log(devices[index].getAttribute('name'))
      buttonYesModal.onclick=(e)=>{
        //console.log(devices[index].getAttribute('name'))
        createToast(e.target.getAttribute('class'));
        firebase_db.collection("NhaA").doc(devices[index].getAttribute('name')).delete().then(() => {
          console.log("Document successfully deleted!");
           toggleModal();
           
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
      //  window.location.reload()
      }
    }   
  }
}
delDevice();


function toggleModal() {
  modal.classList.toggle("hide");
}
iconCloseModal.addEventListener("click", toggleModal);
buttonCloseModal.addEventListener("click", toggleModal);
buttonYesModal.addEventListener('click',(e)=>{
  createToast(e.target.getAttribute('class'));
  toggleModal();
})
modal.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) toggleModal();
});

//TOAST
const toasts = {
	success: {
		icon: '<i class="fas fa-check-circle"></i>',
		msg: 'Thành công !',
	},
	error: {
		icon: '<i class="fas fa-exclamation-triangle"></i>',
		msg: 'Lỗi !',
	},
	warning: {
		icon: '<i class="fas fa-exclamation-circle"></i>',
		msg: 'Không hợp lệ !',
	},
}

function createToast(status) {
	let toast = document.createElement('div')
	toast.className = `toast success`

	toast.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span class="msg">Success !</span>
    <span class="countdown"></span>
    `
	document.querySelector('#toasts').appendChild(toast)

	setTimeout(() => {
		toast.style.animation = 'hide_slide 1s ease forwards'
	}, 2000)
	setTimeout(() => {
		toast.remove()
	}, 3000)
}

//Render appliances each Room
// ADD ROOM
const appliancesInRoom= document.getElementById("appliances");
// console.log(appliancesInRoom)
setTimeout(()=>{
  const roomActives= document.getElementsByClassName('room');  
    for (let index = 0; index < roomActives.length; index++) {
      roomActives[index].addEventListener('click',function(){
        // for (let index1 = 0; index1 < roomActives.length; index1++) {
        //   console.log(2);
        //   ()=>{roomActives[index1].removeClass("active") 

        //     console.log(1) }
        // }
        handleRoom()
        // for (let index2 = 0; index2 < roomActives.length; index2++) {
          
        //   roomActives[index2].classList.toggle('active');
        // }
        roomActives[index].classList.toggle('active');
        
        
        firebase_db.collection("NhaA").where("room","==",roomActives[index].innerHTML)
        .onSnapshot((querySnapshot) => {
          appliancesInRoom.innerHTML=""
          let i=0
          querySnapshot.forEach((doc)=>{
            
            
            appliancesInRoom.innerHTML+=` 
            
            <div class="appliance">
              <input type="checkbox" name="asdfg" id="${String.fromCharCode(97+i)}" class="${doc.data().id}">
              <label for="${String.fromCharCode(97+i)}">
                <i class="r"></i>                
                <strong >${doc.data().type}<i class='bx bx-trash del_device' name="${doc.data().id}"></i></strong>         
               
                <span data-o="opened" data-c="closed"></span>
                
                <small></small>
              </label>
            </div>`
            i++
            
            // console.log(document.getElementsByClassName(doc.data().id)[0])
            
            setTimeout(()=>{
              document.getElementsByClassName(doc.data().id)[0].checked=doc.data().value? true : false
              
            },10)
            setTimeout(()=>{
              document.getElementsByClassName(doc.data().id)[0].onclick= ()=>{

                if(document.getElementsByClassName(doc.data().id)[0].checked){
                  // console.log(doc.data().id)
                  // console.log(document.getElementsByClassName(doc.data().id)[0])
                   firebase_db.collection("NhaA").doc(doc.data().id).update({value:1,type:doc.data().type,id:doc.data().id,room:doc.data().room,humidity:doc.data().humidity,temp:doc.data().temp})
                   createToast(document.querySelector('.category ul'));
                }else{
                   firebase_db.collection("NhaA").doc(doc.data().id).update({value:0,type:doc.data().type,id:doc.data().id,room:doc.data().room,humidity:doc.data().humidity,temp:doc.data().temp})
                   createToast(document.querySelector('.category ul'));
                }
              }
            },100)
            
            //document.getElementsByClassName(doc.data().id)[0].checked=true
          })
          appliancesInRoom.innerHTML+=`<div class="button_room" >

          <button id="add_device" style="height: fit-content;" name="${roomActives[index].innerHTML}">Add device <i class='bx bx-plus-circle'></i></button>
          <button id="del_room" style="height: fit-content;" name="${roomActives[index].innerHTML}">Del Room <i class='bx bx-eraser'></i></i></button>
        </div>
         <div class="m-player">
          <h2>Shared Devices</h2>
          <div class="player">
            <div class="disc"></div>
            <div class="artist">
              <p>Rosetta Stoned</p>
              <small>Tool</small>
            </div>
            <div class="controls">
              <input type="checkbox" name="a" id="p">
              <label for="p">
                <div class="control"></div>
              </label>
            </div>
          </div>
        </div> `
            
        })
      
      })    
    }
  

},1000)


// roomAct();  
const addRoom =document.getElementById('add_room');
const iconCloseModal2 = document.querySelector(".modal_icon_close2 i");
const buttonCloseModal2 = document.querySelector(".modal__footer2 button");
const buttonYesModal2 = document.getElementById('button_y2');

const modalAddRoom = document.querySelector('.modal_add_room');
function addroom (){
  addRoom.addEventListener('click',function(){
    
    modalAddRoom.classList.toggle('hide');
    buttonYesModal2.addEventListener('click',(e)=>{
      createToast(document.querySelector('.category ul'));
      //console.log(document.querySelectorAll('.category ul li')  )
      //document.querySelector('.category ul').innerHTML +=`<li ><a href="#!"class="room" >${document.getElementById('roomAdded').value}</a></li>`
      let idRoom=makeid()
      
      firebase_db.collection("roomNhaA").doc(idRoom).set({
        roomName:document.getElementById('roomAdded').value,
        id:idRoom
      })
      toggleModalAddRoom();
      // window.location.reload()
    })
  })
}
addroom();

function toggleModalAddRoom() {
  modalAddRoom.classList.toggle("hide");
}
iconCloseModal2.addEventListener("click", toggleModalAddRoom);
buttonCloseModal2.addEventListener("click", toggleModalAddRoom);

modal.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) toggleModalAddRoom();
});


setInterval(delDevice,1000)


function delRoom(){
  document.getElementById('del_room').onclick=()=>{
    modal.classList.toggle("hide")
      //console.log(devices[index].getAttribute('name'))
      buttonYesModal.onclick=(e)=>{
        //console.log(devices[index].getAttribute('name'))
        createToast(e.target.getAttribute('class'));
        console.log(document.getElementById('del_room').getAttribute('name'))
        firebase_db.collection("roomNhaA").where("roomName","==",document.getElementById('del_room').getAttribute('name'))
          .get()
          .then((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log( doc.data().id);
              firebase_db.collection("roomNhaA").doc(doc.data().id.toString()).delete().then(() => {
                console.log("Document successfully deleted!");
                toggleModal();
                
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
          });
          })          
        // window.location.reload();
      }
  }

}
setInterval(delRoom,1000)
  
console.log(document.getElementById("sign_out"))
document.getElementById("sign_out").addEventListener('click',()=> window.location.href="./register.html")
// //CheckStatusDivice
// function CheckStatusDivice(){
//   document.onload = (){

//   }
// }

// setInterval(()=>{
//   //console.log(document.getElementsByName("appliance"))

   
//    const devicesInRoom=document.getElementsByName("asdfg")
//    for (let index = 0; index < devicesInRoom.length; index++) {
//      devicesInRoom[index].onclick=()=>{
       
//        console.log(devicesInRoom[index])
//       if(devicesInRoom[index].checked){
        
//         console.log(devicesInRoom[index].getAttribute('class'))
//          firebase_db.collection("NhaA").doc(devicesInRoom[index].getAttribute('class')).update({value:1,type:doc.data().type,id:doc.data().id,room:doc.data().room,humidity:doc.data().humidity,temp:doc.data().temp})
//       }else{
//         console.log(devicesInRoom[index].getAttribute('class'))
//          firebase_db.collection("NhaA").doc(devicesInRoom[index].getAttribute('class')).update({value:0,type:doc.data().type,id:doc.data().id,room:doc.data().room,humidity:doc.data().humidity,temp:doc.data().temp})
//       }
//      }
     
//    }
// },1000)


const iconCloseModal3 = document.querySelector(".modal_icon_close3 i");
const buttonCloseModal3 = document.querySelector(".modal__footer3 button");
const buttonYesModal3 = document.getElementById('button_y3');
const modalAddDevice = document.querySelector('.modal_add_device');
//AddDevice
function addDevice(){
  document.getElementById('add_device').onclick=()=>{
    modalAddDevice.classList.toggle('hide');
    buttonYesModal3.addEventListener('click',(e)=>{
        //console.log(devices[index].getAttribute('name'))
        createToast(e.target.getAttribute('class'));
        console.log(document.getElementById('add_device').getAttribute('name'))
        let idDevice =makeid()
        firebase_db.collection("NhaA").doc(idDevice).set({value:0,type:document.getElementById('deviceAdded').value,id:idDevice,room:document.getElementById('add_device').getAttribute('name'),humidity:0,temp:0})
                   createToast(document.querySelector('.category ul'));
                   toggleModalDevice();
                  
        
      })
      //  window.location.reload()
  }
}
function toggleModalDevice() {
  modalAddDevice.classList.toggle("hide");
}
iconCloseModal3.addEventListener("click", toggleModalDevice);
buttonCloseModal3.addEventListener("click", toggleModalDevice);

modal.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) toggleModalDevice();
});

setInterval(addDevice,1000)

//random id
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 19; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

