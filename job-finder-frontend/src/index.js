const url = "http://localhost:3000/applications";

function myFetch(url, options = {}) {
  return fetch(url, options).then((res) => res.json());
}



function showApplication(application) {
  const newRow = document.createElement("tr");
  // newRow.dataset.applicationId = application.id;
  const title = document.createElement("td");
  title.contentEditable = "true";
  title.innerHTML = application.title;
  const company = document.createElement("td");
  company.innerHTML = application.company;
  company.contentEditable = "true";
  // const link = document.createElement("td");
  // link.innerHTML = application.link;
  // link.contentEditable = "true";
  const applied = document.createElement("td");
  applied.contentEditable = "true";
  if (application.applied === "true") {
    applied.classList.add("true");
    applied.innerHTML = "Yes";
  } else {
    applied.classList.add("false");
    applied.innerHTML = "No";
  }
  // addDropdown(applied);
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
  rejected.contentEditable = "true";

  if (application.rejected == "true") {
    rejected.classList.add("true");
    rejected.innerHTML = "Yes";
  } else {
    rejected.classList.add("false");
    rejected.innerHTML = "No";
  }
  if (application.applied === "false" && application.rejected === "true") {
    rejected.classList.add("false");
    rejected.innerHTML = "No"
  }
  // addDropdown(rejected);
  const received_offer = document.createElement("td");
  received_offer.contentEditable = "true";
  // received_offer.innerHTML = application.received_offer
  if (application.received_offer == "true") {
    received_offer.classList.add("true");
    received_offer.innerHTML = "Yes";
  } else {
    received_offer.classList.add("false");
    received_offer.innerHTML = "No";
  }
  // addDropdown(received_offer);
  const accepted_offer = document.createElement("td");
  accepted_offer.contentEditable = "true";
  if (application.accepted_offer == "true") {
    accepted_offer.classList.add("true");
    accepted_offer.innerHTML = "Yes";
  } else {
    accepted_offer.classList.add("false");
    accepted_offer.innerHTML = "No";
  }
  // addDropdown(accepted_offer);
  // const editBtn = document.createElement('button')
  const deleteBtn = document.createElement("button");
  deleteBtn.dataset.applicationId = application.id;
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.classList.add("delete-button");


  newRow.append(
    title,
    company,
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

const spreadsheetDiv = document.querySelector(".spreadsheet-div")
spreadsheetDiv.addEventListener("click", (e) => {
  const applicationId = e.target.dataset.applicationId;

  if (applicationId) {
    const options = {
      method: "DELETE",
    };

    myFetch(`${url}/${applicationId}`, options).then(() => {
      e.target.parentNode.classList.add("animation-target");
      e.target.parentNode.remove();
    });
  }

});



function addDropdown(tag) {
  const selectTF = document.createElement("select");
  const yes = document.createElement("option");
  yes.classList.add("yes-dropdown");
  yes.value = "yes";
  yes.innerHTML = "yes";
  const no = document.createElement("option");
  no.classList.add("no-dropdown");

  no.value = "no";
  no.innerHTML = "no";

  selectTF.append(no, yes);

  tag.append(selectTF);
}

function NewAppForm(user) {
  const newApplication = document.querySelector("#new-application-form");
  newApplication.addEventListener("submit", (e) => {
    e.preventDefault();
    const jobTitle = document.querySelector("#job-title").value;
    const company = document.querySelector("#company").value;
    // const applicationLink = document.querySelector("#application-link").value;
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
        user_id: user.id,
        title: jobTitle,
        company: company,
        // link: applicationLink,
        poc: poc,
        interview_date: interviewDate,
        interviewer: interviewer,
      }),
    };

    myFetch(url, postOptions).then((application) => {
      showApplication(application);
      const removeNoAppsText = document.querySelector(".no-apps");
      if (removeNoAppsText) {
        removeNoAppsText.innerHTML = "";
      }
      newApplication.reset();
    });
  });
}

function addApplicationBtn() {
  const newAppBtn = document.createElement("button");
  newAppBtn.setAttribute("id", "application-btn");
  newAppBtn.textContent = "New Job Application";

  const spacing = document.createElement("br");

  const modal = document.querySelector("#myModal");
  const span = document.querySelector("#myModal .close");
  const form = document.querySelector("#new-application-form");

  newAppBtn.addEventListener("click", (e) => {

    modal.style.display = "block";
  });

  span.addEventListener("click", (e) => {

    modal.style.display = "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.style.display = "none";
  });

  window.addEventListener("click", () => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  const pageBanner = document.querySelector(".page-banner");
  pageBanner.append(newAppBtn, spacing);
}