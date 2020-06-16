const url = "http://localhost:3000/applications";
const userUrl = "http://localhost:3000/users";

function myFetch(url, options = {}) {
  return fetch(url, options).then((res) => res.json());
}

myFetch(url).then((applications) => {
  for (const application of applications) {
    showApplication(application);
  }
});

function showApplication(application) {
  // t.boolean "applied"
  // t.boolean "rejected"
  // t.boolean "received_offer"
  // t.boolean "accepted_offer"
  const newRow = document.createElement("tr");
  // newRow.dataset.applicationId = application.id;
  const title = document.createElement("td");
  title.contentEditable = "true";
  title.innerHTML = application.title;
  const company = document.createElement("td");
  company.innerHTML = application.company;
  company.contentEditable = "true";
  const link = document.createElement("td");
  link.innerHTML = application.link;
  link.contentEditable = "true";
  const applied = document.createElement("td");
  applied.innerHTML = application.applied;
  applied.contentEditable = "true";
  if (application.applied == true) {
    applied.classList.add("true");
  } else {
    applied.classList.add("false");
  }
  const poc = document.createElement("td");
  poc.innerHTML = application.poc;
  poc.contentEditable = "true";
  const date = document.createElement("td");
  date.innerHTML = application.interview_date;
  date.contentEditable = "true";
  const interviewer = document.createElement("td");
  interviewer.innerHTML = application.interviewer;
  interviewer.contentEditable = "true";
  const rejected = document.createElement("td");
  rejected.innerHTML = application.rejected;
  rejected.contentEditable = "true";
  if (application.rejected == true) {
    rejected.classList.add("true");
  } else {
    rejected.classList.add("false");
  }
  const received_offer = document.createElement("td");
  received_offer.innerHTML = application.received_offer;
  received_offer.contentEditable = "true";
  if (application.received_offer == true) {
    received_offer.classList.add("true");
  } else {
    received_offer.classList.add("false");
  }
  const accepted_offer = document.createElement("td");
  accepted_offer.innerHTML = application.accepted_offer;
  accepted_offer.contentEditable = "true";
  if (application.accepted_offer == true) {
    accepted_offer.classList.add("true");
  } else {
    accepted_offer.classList.add("false");
  }
  // const editBtn = document.createElement('button')
  const deleteBtn = document.createElement("button");
  deleteBtn.dataset.applicationId = application.id;
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.classList.add("delete-button");
  deleteBtn.addEventListener("click", (e) => {
    const applicationId = e.target.dataset.applicationId;
    const options = {
      method: "DELETE",
    };

    myFetch(`${url}/${applicationId}`, options).then((application) => {
      // e.target.parentNode.remove();
      e.target.parentNode.classList.add("animation-target");
      e.target.parentNode.remove();
    });
  });
  newRow.append(
    title,
    company,
    link,
    applied,
    poc,
    date,
    interviewer,
    rejected,
    received_offer,
    accepted_offer,
    deleteBtn
  );
  document.querySelector(".spreadsheet-table").append(newRow);
}

const newApplication = document.querySelector("form");
newApplication.addEventListener("submit", (e) => {
  e.preventDefault();
  const jobTitle = document.querySelector("#job-title").value;
  const company = document.querySelector("#company").value;
  const applicationLink = document.querySelector("#application-link").value;
  const poc = document.querySelector("#poc").value;
  const interviewDate = document.querySelector("#interview-date").value;
  const interviewer = document.querySelector("#interviewer").value;

  postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      user_id: 1,
      title: jobTitle,
      company: company,
      link: applicationLink,
      poc: poc,
      interview_date: interviewDate,
      interviewer: interviewer,
    }),
  };

  myFetch(url, postOptions).then((application) => {
    showApplication(application);
    newApplication.reset();
  });
});

// Get the modal
const modal = document.getElementById("myModal");
// Get the button that opens the modal
const btn = document.getElementById("application-btn");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
const form = document.querySelector("form");
// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

form.onsubmit = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
