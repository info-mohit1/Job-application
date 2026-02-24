 
let currentTab = "all";

 
const STATUS_CONFIG = {
    interview: {
        label: "INTERVIEW",
        btnClass: "bg-green-600 text-white shadow-lg",
        badgeClass: "status text-xs bg-green-100 text-green-700 font-bold inline-block px-2 py-1 mt-2 rounded"
    },
    rejected: {
        label: "REJECTED",
        btnClass: "bg-red-600 text-white shadow-lg",
        badgeClass: "status text-xs bg-red-100 text-red-700 font-bold inline-block px-2 py-1 mt-2 rounded"
    },
    all: {
        btnClass: "bg-blue-600 text-white shadow-lg"
    }
};

 
function showTab(tabName) {
    currentTab = tabName;
    
    const tabs = document.querySelectorAll(".tabBtn");
    const [allBtn, interviewBtn, rejectedBtn] = tabs;

     
    tabs.forEach(btn => {
        btn.className = "tabBtn interactive-element bg-white text-gray-600 px-6 py-2 rounded-md font-semibold border border-gray-200";
    });

     
    const activeBtn = tabName === 'all' ? allBtn : (tabName === 'interview' ? interviewBtn : rejectedBtn);
    activeBtn.className = `tabBtn interactive-element px-6 py-2 rounded-md font-semibold ${STATUS_CONFIG[tabName].btnClass}`;

    updateView();
}


function setStatus(button, newStatus) {
    const jobCard = button.closest(".job");
    const statusBadge = jobCard.querySelector(".status");
    const config = STATUS_CONFIG[newStatus];

    jobCard.setAttribute("data-status", newStatus);
    statusBadge.textContent = config.label;
    statusBadge.className = config.badgeClass;

    updateView();
}

 
function deleteJob(button) {
    button.closest(".job").remove();
    updateView();
}


function updateView() {
    const allJobs = document.querySelectorAll(".job");
    let counts = { all: 0, interview: 0, rejected: 0, visible: 0 };

    allJobs.forEach(card => {
        const status = card.getAttribute("data-status");
        
      
        counts.all++;
        if (status === "interview") counts.interview++;
        if (status === "rejected") counts.rejected++;

       
        const shouldShow = currentTab === "all" || currentTab === status;
        card.style.display = shouldShow ? "block" : "none";
        if (shouldShow) counts.visible++;
    });

    
    document.getElementById("totalCount").textContent = counts.all;
    document.getElementById("interviewCount").textContent = counts.interview;
    document.getElementById("rejectedCount").textContent = counts.rejected;
    document.getElementById("tabCount").textContent = `${counts.visible} jobs`;

    renderEmptyState(counts.visible);
}


function renderEmptyState(visibleCount) {
    const emptyDiv = document.getElementById("emptyState");
    const emptyTitle = document.getElementById("emptyTitle");
    const emptySub = document.getElementById("emptySub");

    if (visibleCount === 0) {
        emptyDiv.classList.remove("hidden");
        if (currentTab === "interview") {
            emptyTitle.textContent = "No Interview Jobs Available";
            emptySub.textContent = "Keep working hard and don't give up hope! 😊";
        } else if (currentTab === "rejected") {
            emptyTitle.textContent = "No Rejected Jobs Available";
            emptySub.textContent = "You haven't been rejected yet. Keep it up! 👍";
        } else {
            emptyTitle.textContent = "No Jobs Available";
            emptySub.textContent = "Your job list is currently empty.";
        }
    } else {
        emptyDiv.classList.add("hidden");
    }
}


document.addEventListener("DOMContentLoaded", updateView);