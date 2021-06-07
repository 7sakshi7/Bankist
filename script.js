
const account1 ={
    owner:'Sakshi Agarwal',
    transaction:[200,450,-400,3000,-650,-130,70,1300],
    movementsDates: [
        '2021-05-20T17:01:17.194Z',
        '2021-05-12T10:51:36.790Z',
        '2021-04-08T14:11:59.604Z',
        '2021-01-28T09:15:04.904Z',
        '2020-12-23T07:42:02.383Z',
        '2020-11-18T21:31:17.178Z',
        '2020-07-11T23:36:17.929Z',
        '2020-04-01T10:17:24.185Z',
      ],
    interestRate:1.2,
    pin:1111,
};
const account2 ={
    owner:'Jessica Devis',
    transaction:[5000,3400,-150,-750,-3210,-1000,8500,-30],
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
    interestRate:1.5,
    pin:2222,
};
const account3 ={
    owner:'Stefan Williams',
    transaction:[200,-250,340,-300,-20,50,400,-460],
    movementsDates: [
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
      ],
    interestRate:0.7,
    pin:3333,
};
const account4 ={
    owner:'Jonas',
    transaction:[430,1000,700,50,90],
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ], 
    interestRate:1,
    pin:4444,
};

const accounts =[account1,account2,account3,account4];

generateUsername();

// elements of login page------>

const login_page = document.getElementById('login-page');
const greet = document.getElementById('greet');
const go = document.getElementById('go');
const user_login = document.getElementById('user');
const pin_login =  document.getElementById('userpin');

let whichArray;

// elements of main apge
const second = document.getElementById('second');
const user_enter = document.getElementById('username');
const pin_enter =  document.getElementById('pin');
const transactions = document.getElementById('transactions');
const trans_button = document.querySelector('#transactions .info button ');
const balance = document.getElementById('balance');
const deposit = document.getElementById('deposit');
const withdraw = document.getElementById('withdraw');
const today = document.querySelector('#current-heading h4');
const interest = document.getElementById('interest');
const switch_btn = document.getElementById('switch');

let sort = false;
// transfer buttons
const transfer_btn = document.getElementById('transfer-btn')
const deposit_btn = document.getElementById('deposit-btn')
const close = document.getElementById('close');
const sort_value = document.getElementById('sort_value');

// event listeners
sort_value.addEventListener('click',(e)=>{
    e.preventDefault();
    sort = !sort;
    isSort(e);
})

function isSort(e){
    // e.preventDefault();
    console.log(sort);
    const array = sort ? accounts[whichArray].transaction.slice().sort((a,b)=>b-a) : accounts[whichArray].transaction;
    const dates = sort ? accounts[whichArray].movementsDates.slice().sort((a,b)=>new Date(a) - new Date(b)) : accounts[whichArray].movementsDates;
   displayTransactions(array,dates);

}
go.addEventListener('click',(e)=>{
   e.preventDefault();
   if(checkCredentials(user_login.value,pin_login.value)){
       second.style.display="block";
       login_page.style.display="none";
       renderUi(e);
   }
   else{
    console.log('Wrong credentials');
    user_login.value="";
    pin_login.value="";
   }
});

transfer_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const ur = document.getElementById('tr-user').value;
    console.log(typeof ur,);
    const amount = document.getElementById('tr-amt').value;
    let found = false;
    document.getElementById('tr-user').value="";
    document.getElementById('tr-amt').value="";

    for (const array of accounts){
        console.log(typeof array.userName);
        if(array.userName == ur){
            array.transaction.unshift(Number(amount));
            found=true;
            console.log(array.transaction);
            break;
        }
    }
    if(found){
        accounts[whichArray].transaction.unshift(-amount);
        console.log(accounts[whichArray].transaction);
        renderUi(e);
    }
    else
    alert('invalid username');

});
switch_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(checkCredentials(user_enter.value,pin_enter.value))
    {
        renderUi(e);
    }
    else{
        alert('Wrong credentials');
    }
        user_enter.value="";
        pin_enter.value="";

});
deposit_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const depositAmt = Number(document.querySelector('#option-2 form input').value);
    accounts[whichArray].transaction.unshift(depositAmt);
    accounts[whichArray].movementsDates.unshift(new Date());
    document.querySelector('#option-2 form input').value=""
    // console.log(accounts[whichArray].transaction);
    renderUi(e);
});
close.addEventListener('click',(e)=>{
    e.preventDefault();
    const closeUser = document.querySelectorAll('#option-3 form input');
    // console.log(closeUser);
    if(checkCredentials(closeUser[0].value,closeUser[1].value)){
        const confirmClose = confirm('Are you you want to close this account','yes');
        if(confirmClose){
            for(const [index,array] of accounts.entries()){
                if(array.pin == Number(closeUser[1].value)){
                    if(index == whichArray){
                        alert('Cant close this account as it open right Now...')
                    }
                    else{
                        accounts.splice(index,1);
                        alert('Account Deleted successfully');
                        break;
                    }
                }
            }
        }
        closeUser[0].value = "";
        closeUser[1].value = "";
    
    }
})


//  functions

function convert(str){
    const user = str.split(' ').map((arr)=>  arr[0]).join('').toLowerCase();
    return user;
}
 function generateUsername(){
         accounts.forEach((array)=>{
         array.userName = convert(array.owner);
     });
 }

 function checkCredentials(us,pi){
  
     for (const [index,array] of accounts.entries()) {
        if(array.userName == us){
            if(array.pin == Number(pi)){
                whichArray = index;
                return true;
            }
            else
            return false;
        }    
    }
     return false;
 }

 function renderUi(e){
     e.preventDefault()
    
     const date = new Date().getHours();
     greet.textContent = `Good ${date <12 ? 'Morning' : 'Afternoon'} ${accounts[whichArray].owner}!!!`;
        
     displayTransactions(accounts[whichArray].transaction,accounts[whichArray].movementsDates);
     let bal = new Intl.NumberFormat('en-IN',{
        style:"currency",
        currency:"INR",
    }).format(calcdeposits(accounts[whichArray].transaction));
     
    balance.innerText = bal;
     deposit.innerText = bal;
     
     withdraw.innerText =new Intl.NumberFormat('en-IN',{
        style:"currency",
        currency:"INR",
    }).format(calcwithdraw(accounts[whichArray].transaction));
    
     let dt = new Date();
     today.innerText = dt.getDate() + "/" + dt.getMonth()+1 + "/" + dt.getFullYear() + "," + dt.getHours()+":"+dt.getMinutes()+":"+dt.getMinutes();
     interest.innerText = accounts[whichArray].interestRate;

 }
 function changePin(str){
     str = str.slice(3);
     str = str.padStart(4,'*');
     return str;
 }
 const  displayTransactions = function(movements,dates) {
       transactions.innerHTML="";
       movements.forEach((amt,index)=>{
           let ds = Math.floor((new Date() - new Date(dates[index]))/(1000 *60*60*24));
           if(amt<0){
               var  row=`<div class="info">
               <button class="trans red" >${amt<0 ? 'Withdrawal':'Deposit'}</button>
               <h3>${ds == 0 ? 'Today' : ds + 'Days Ago'}</h3>
               <div class="amt">${new Intl.NumberFormat('en-IN',{
                   style:"currency",
                   currency:"INR",
                }).format(amt)}</div>
                </div>`;
            }
            else{
                var  row=`<div class="info">
               <button class="trans green" >${amt<0 ? 'Withdrawal':'Deposit'}</button>
               <h3>${ds == 0 ? 'Today' : ds + 'Days Ago'}</h3>
               <div class="amt">${new Intl.NumberFormat('en-IN',{
                   style:"currency",
                   currency:"INR",
                }).format(amt)}</div>
                </div>`;
            }
        let tr = transactions.innerHTML ;
        tr+=row;
        transactions.innerHTML = tr;
     });

 }

 const calcdeposits = function(movements){
     return movements.filter((amt)=> amt>0).reduce((sum,amt) =>sum+amt,0 );
 }
 const calcwithdraw = function(movements){
     return movements.filter((amt)=> amt<0).reduce((sum,amt) =>sum+Math.abs(amt),0 );
 }
