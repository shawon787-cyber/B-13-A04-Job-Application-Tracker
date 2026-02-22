
let interviewList = [];
let rejectList = [];
let currentJob = 'all';

let allJobs = document.getElementById("jobs");
let interviewTotal = document.getElementById("interview-total");
let rejectedTotal = document.getElementById("rejected-total");

const allBtn = document.getElementById('allBtn');
const interviewBtn = document.getElementById('interviewBtn');
const rejectedBtn = document.getElementById('rejectedBtn');

const noJob = document.getElementById("no-job");
const filterSection = document.getElementById("filtered-section");
const container = document.getElementById("container");

function getStatusClass(status){
    if(status.toUpperCase() === "NOT APPLIED") return "bg-sky-100";
    if(status.toUpperCase() === "INTERVIEW") return "bg-green-500 text-white";
    if(status.toUpperCase() === "REJECTED") return "bg-red-500 text-white";
    return "";
}

function renderJob(list){
    filterSection.innerHTML = "";
    list.forEach(job => {
        let statusClass = getStatusClass(job.appliedStatus);
        let div = document.createElement('div');
        div.className = 'job-card bg-stone-100 p-8 rounded-xl flex justify-between mb-6';
        div.innerHTML = `
            <div>
                <h3 class="card-heading text-2xl font-semibold">${job.cardTitle}</h3>
                <p class="card-sub-head text-sm text-gray-500 mt-1">${job.cardSubtitle}</p>
                <ul class="text-list flex gap-8 mt-4 text-sm text-gray-500">
                    <li class="list-none">${job.textList1 || ''}</li>
                    <li class="list-disc">${job.textList2 || ''}</li>
                    <li class="list-disc">${job.textList3 || ''}</li>
                </ul>
                <h4 class="applied-status font-medium mt-6 ${statusClass} p-2 w-32 text-center rounded-md">${job.appliedStatus}</h4>
                <p class="description text-gray-500 mt-4">${job.description}</p>
                <div class="flex gap-3 mt-5">
                    <button class="interview-btn btn btn-outline btn-accent text-xl py-4">Interview</button>
                    <div>
                        <button class="reject-btn btn btn-outline btn-error text-xl py-4">Rejected</button>
                    </div>
                </div>
            </div>
            <div>
                <button class="delete-btn bg-gray-200 p-2 rounded-md text-[#eb5971] cursor-pointer">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        `;
        filterSection.appendChild(div);
    });
}

function btnToggle(id){
    [allBtn, interviewBtn, rejectedBtn].forEach(btn => {
        btn.classList.add('bg-gray-200','text-black');
        btn.classList.remove('bg-black','text-white');
    });
    document.getElementById(id).classList.remove('bg-gray-200','text-black');
    document.getElementById(id).classList.add('bg-black','text-white');

    if(id === "interviewBtn"){
        currentJob = "interview-btn";
        const filtered = interviewList.filter(job => job.appliedStatus === "INTERVIEW");
        container.classList.add("hidden");
        if(filtered.length === 0){
            noJob.classList.remove("hidden");
            filterSection.classList.add("hidden");
        } else {
            noJob.classList.add("hidden");
            filterSection.classList.remove("hidden");
            renderJob(filtered);
        }
        allJobs.innerText = filtered.length + ' of ' + container.children.length + " Jobs";
    }
    else if(id === "rejectedBtn"){
        currentJob = "rejected-btn";
        const filtered = rejectList.filter(job => job.appliedStatus === "REJECTED");
        container.classList.add("hidden");
        if(filtered.length === 0){
            noJob.classList.remove("hidden");
            filterSection.classList.add("hidden");
        } else {
            noJob.classList.add("hidden");
            filterSection.classList.remove("hidden");
            renderJob(filtered);
        }
        allJobs.innerText = filtered.length + ' of ' + container.children.length + " Jobs";
    }
    else if(id === "allBtn"){
        currentJob = "all";
        filterSection.classList.add("hidden");
        noJob.classList.add("hidden");
        container.classList.remove("hidden");
        allJobs.innerText = container.children.length + " Jobs";
    }
}

function updateTotal(){
    interviewTotal.innerText = interviewList.length;
    rejectedTotal.innerText = rejectList.length;
    const total = document.querySelector(".allTotal");
    total.innerText = container.children.length;
}

document.addEventListener("DOMContentLoaded", function(){
    updateTotal();
});

document.addEventListener('click', function(event){
    if(event.target.closest('.delete-btn')){
        const card = event.target.closest(".job-card");
        const title = card.querySelector(".card-heading").innerText;

        interviewList = interviewList.filter(job => job.cardTitle !== title);
        rejectList = rejectList.filter(job => job.cardTitle !== title);

        card.remove();

        updateTotal();

        if(currentJob === "interview-btn"){
            const filtered = interviewList.filter(job => job.appliedStatus==="INTERVIEW");
            if(filtered.length === 0){
                filterSection.classList.add("hidden");
                noJob.classList.remove("hidden");
            } else {
                filterSection.classList.remove("hidden");
                noJob.classList.add("hidden");
                renderJob(filtered);
            }
        }
        else if(currentJob === "rejected-btn"){
            const filtered = rejectList.filter(job => job.appliedStatus==="REJECTED");
            if(filtered.length === 0){
                filterSection.classList.add("hidden");
                noJob.classList.remove("hidden");
            } else {
                filterSection.classList.remove("hidden");
                noJob.classList.add("hidden");
                renderJob(filtered);
            }
        }
    }
});

document.addEventListener('click', function(event){
    const card = event.target.closest('.job-card');
    if(!card) return;

    const statusEl = card.querySelector(".applied-status");
    let currentStatus = statusEl.innerText;
    const cardTitle = card.querySelector(".card-heading").innerText;
    const cardSubtitle = card.querySelector(".card-sub-head").innerText;
    const textList = card.querySelector(".text-list").innerText;
    const description = card.querySelector(".description").innerText;

    const cardInfo = { cardTitle, cardSubtitle, textList1:textList.split("\n")[0], textList2:textList.split("\n")[1], textList3:textList.split("\n")[2], description };

    if(event.target.classList.contains('interview-btn')){
        if(currentStatus !== "INTERVIEW"){
            if(currentStatus === "REJECTED"){
                rejectList = rejectList.filter(item => item.cardTitle !== cardTitle);
            }
            if(!interviewList.some(item => item.cardTitle === cardTitle)){
                interviewList.push({...cardInfo, appliedStatus:"INTERVIEW"});
            }

            document.querySelectorAll('.job-card').forEach(c=>{
                if(c.querySelector(".card-heading").innerText === cardTitle){
                    const sEl = c.querySelector(".applied-status");
                    sEl.innerText = "INTERVIEW";
                    sEl.className = "applied-status font-medium mt-6 p-2 w-32 text-center rounded-md bg-green-500 text-white";
                }
            });
        }
    }

    if(event.target.classList.contains('reject-btn')){
        if(currentStatus !== "REJECTED"){
            if(currentStatus === "INTERVIEW"){
                interviewList = interviewList.filter(item => item.cardTitle !== cardTitle);
            }
            if(!rejectList.some(item => item.cardTitle === cardTitle)){
                rejectList.push({...cardInfo, appliedStatus:"REJECTED"});
            }

            document.querySelectorAll('.job-card').forEach(c=>{
                if(c.querySelector(".card-heading").innerText === cardTitle){
                    const sEl = c.querySelector(".applied-status");
                    sEl.innerText = "REJECTED";
                    sEl.className = "applied-status font-medium mt-6 p-2 w-32 text-center rounded-md bg-red-500 text-white";
                }
            });
        }
    }

    updateTotal();

    if(currentJob === "interview-btn"){
        const filtered = interviewList.filter(job => job.appliedStatus==="INTERVIEW");
        if(filtered.length === 0){
            filterSection.classList.add("hidden");
            noJob.classList.remove("hidden");
        } else {
            filterSection.classList.remove("hidden");
            noJob.classList.add("hidden");
            renderJob(filtered);
        }
    }
    else if(currentJob === "rejected-btn"){
        const filtered = rejectList.filter(job => job.appliedStatus==="REJECTED");
        if(filtered.length === 0){
            filterSection.classList.add("hidden");
            noJob.classList.remove("hidden");
        } else {
            filterSection.classList.remove("hidden");
            noJob.classList.add("hidden");
            renderJob(filtered);
        }
    }
});