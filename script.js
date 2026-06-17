//store files in the cache memory:
//step one
if("serviceWorker" in navigator){
  navigator.serviceWorker.register("service-worker.js");
}

//------------------------------------------------------------------


const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");
const hours = document.querySelectorAll(".score h2");
const total = document.querySelectorAll(".score span");

let data ;

async function loadData() {
    const result = await fetch("./data.json");
    data = await result.json();
}

await loadData();


function getPosts(){
    
    return{

        dailyScore: function (){
            for(let i = 0; i < data.length ; i++){
                let current = data[i].timeframes.daily.current;
                hours[i].textContent = ` ${current} hrs`;

                let previous = data[i].timeframes.daily.previous;
                total[i].textContent = `Previous - ${previous}hrs`;
            }
        },

        weeklyScore: function (){
            for(let i = 0; i < data.length ; i++){
                let current = data[i].timeframes.weekly.current;
                hours[i].textContent = ` ${current} hrs`;

                let previous = data[i].timeframes.weekly.previous;
                total[i].textContent = `Last Week - ${previous}hrs`;
            }
        },

        monthlyScore: function (){
            for(let i = 0; i < data.length ; i++){
                let current = data[i].timeframes.monthly.current;
                hours[i].textContent = ` ${current} hrs`;

                let previous = data[i].timeframes.monthly.previous;
                total[i].textContent = `Last Month - ${previous}hrs`;
            }
        }
    };

}

function showDailyScore() {
    const result = getPosts();
    result.dailyScore();
};

showDailyScore();

daily.addEventListener("click", ()=>{
    daily.classList.add("active");
    weekly.classList.remove("active");
    monthly.classList.remove("active");

    showDailyScore();
});

weekly.addEventListener("click",async ()=>{
    weekly.classList.add("active");
    daily.classList.remove("active");
    monthly.classList.remove("active");

    const result = getPosts();
    result.weeklyScore();
});

monthly.addEventListener("click",async ()=>{
    monthly.classList.add("active");
    daily.classList.remove("active");
    weekly.classList.remove("active");

    const result = getPosts();
    result.monthlyScore();
});