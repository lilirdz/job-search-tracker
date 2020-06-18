const userUrl = "http://localhost:3000/users";

function myFetch(url, options = {}) {
  return fetch(url, options).then((res) => res.json());
}

showLogInButton();
showSignUpButton();

function showSignUpButton() {
  const signUpButton = document.createElement("button");
  signUpButton.innerHTML = "I'd like to sign up.";
  signUpButton.classList.add("sign-up-button");
  signUpButton.addEventListener("click", (e) => createUser(signUpButton));
  document.querySelector(".log-in-options").append(signUpButton);
}

function logInUser(logInButton) {
  logInButton.remove();
  const enterNameLabel = createNameInputDirections();
  const typeInName = createNameInputField();
  const submitName = createSubmitNameButton();
  const spacing = document.createElement("br");

  const logInForm = document.createElement("form");
  logInForm.classList.add("initial-log-in-form");
  logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.querySelector(".entered-name").value != 0) {
      logMeIn();
    } else {
      pleaseEnterName();
    }
    logInForm.reset();
  });
  logInForm.append(enterNameLabel, typeInName, spacing, submitName);
  document.querySelector(".page-banner").append(logInForm);
}

function showUser(user) {
  const username = document.querySelector("#username");
  username.innerHTML = `Hello ${user.name}!`;

  const status = document.querySelector("#status");
  status.innerHTML = `Status: ${user.status}`;

  const editBtn = document.createElement("button");
  editBtn.setAttribute("id", "edit-btn");
  editBtn.textContent = "Edit Your Profile";

  const userModal = document.querySelector("#userModal");
  const userSpan = document.querySelector("#userModal .close");
  const userForm = document.querySelector("#edit-user-form");

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    userModal.style.display = "block";
  });

  userSpan.addEventListener("click", (e) => {
    e.preventDefault();
    userModal.style.display = "none";
  });

  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    userModal.style.display = "none";
  });

  window.addEventListener("click", () => {
    if (event.target === userModal) {
      userModal.style.display = "none";
    }
  });

  const editUserForm = document.querySelector("#edit-user-form");
  editUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const updateName = document.querySelector("#user-name-change").value;
    const updateStatus = document.querySelector("#user-status-change").value;
    const patchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: updateName,
        status: updateStatus,
      }),
    };
    myFetch(`${userUrl}/${user.id}`, patchOptions).then((user) => {
      if (updateName === "") {
        username;
      } else {
        username.textContent = `Hi ${updateName}!`;
      }
      if (updateStatus === "") {
        status;
      } else {
        status.textContent = `Status: ${updateStatus}`;
      }
    });
  });
  addApplicationBtn();
  NewAppForm(user);
  // filterApplications();
  const spacing = document.createElement("br");
  const pageBanner = document.querySelector(".page-banner");
  pageBanner.append(spacing, editBtn);
}

function filterApplications() {
  // const filterLabel = document.createElement("label");
  // filterLabel.setAttribute("for", "select-columns-to-filter");
  // filterLabel.innerHTML = "Filter by:";
  // const filterDropdown = document.createElement("select");
  // filterDropdown.setAttribute("name", "select-columns-to-filter");
  // const if_applied = document.createElement("option");
  // if_applied.classList.add("if-applied-option");
  // if_applied.value = "true";
  // if_applied.innerHTML = "already applied";
  // filterDropdown
  const filterByApplied = document.createElement("button");
  filterByApplied.innerHTML = "Show applied only";
  filterByApplied.addEventListener("click", (e) => {
    displayApplications();
  });
  // filterDropdown.append(filterLabel, if_applied);
  const pageBanner = document.querySelector(".page-banner");
  pageBanner.append(filterByApplied);
}

function displayApplications() {
  myFetch(url).then((applications) => {
    console.log(applications);
    for (const application of applications) {
      document.querySelector(".spreadsheet-table").innerHTML = "";
      if (application.applied == "true") {
        showApplication(application);
      }
    }
  });
}

function showLogInButton() {
  const logInButton = document.createElement("button");
  logInButton.innerHTML = "I have an account.";
  logInButton.classList.add("log-in-button");
  logInButton.addEventListener("click", (e) => logInUser(logInButton));
  document.querySelector(".log-in-options").append(logInButton);
}

function pleaseSignUp() {
  const pleaseSignUp = document.createElement("p");
  pleaseSignUp.classList.add("please-sign-up");
  pleaseSignUp.innerHTML = "Account not found. Please sign up.";
  document.querySelector(".initial-log-in-form").innerHTML = "";
  document.querySelector(".initial-log-in-form").append(pleaseSignUp);
}

function pleaseEnterName() {
  if (document.querySelector(".initial-log-in-form p")) {
    const error_message = document.querySelector(".initial-log-in-form p");
    error_message.append("!");
  } else {
    const error_message = document.createElement("p");
    error_message.textContent = "Please enter a name";
    document.querySelector(".initial-log-in-form").append(error_message);
  }
}

function logMeIn() {
  const username = document.querySelector("#username");
  const status = document.querySelector("#status");
  const findName = document.querySelector(".entered-name").value;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: findName,
    }),
  };
  myFetch("http://localhost:3000/users_signin", options).then((user) => {
    if (user.error) {
      pleaseSignUp();
    } else {
      document.querySelector(".initial-log-in-form").innerHTML = "";
      document.querySelector(".log-in-options").innerHTML = "";

      showUser(user);

      if (user.applications.length) {
        for (const application of user.applications) {
          showApplication(application);
        }
      } else {
        const noAppsYet = document.createElement("p");
        noAppsYet.classList.add("no-apps");
        noAppsYet.innerHTML = "You don't have any applications added yet.";
        document.querySelector(".right").append(noAppsYet);
      }
    }
  });
}
function createNameInputDirections() {
  const enterNameLabel = document.createElement("h4");
  enterNameLabel.innerHTML = "Enter your name to pull up your information.";
  // enterNameLabel.setAttribute("for", "username");
  return enterNameLabel;
}
function createNameInputField() {
  const typeInName = document.createElement("input");
  typeInName.classList.add("entered-name");
  typeInName.setAttribute("type", "text");
  typeInName.setAttribute("id", "username");
  return typeInName;
}

function createSubmitNameButton() {
  const submitName = document.createElement("button");
  submitName.classList.add("submit-button");
  submitName.textContent = "Enter";
  // submitName.setAttribute("type", "submit");
  // submitName.setAttribute("value", "Enter");
  return submitName;
}

function createUser(signUpButton) {
  signUpButton.remove();
  const welcome = document.createElement("h4");
  welcome.textContent = "Enter name for new account:";

  const form = document.createElement("form");
  form.classList.add("new-user-form");

  const label = document.createElement("label");
  label.setAttribute("for", "name");

  const inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("id", "new-name");

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  // submitBtn.setAttribute("type", "submit");
  // submitBtn.setAttribute("value", "Submit");

  const spacing = document.createElement("br");

  form.append(welcome, label, inputName, spacing, submitBtn);

  const pageBanner = document.querySelector(".page-banner");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUserName = document.querySelector("#new-name").value;
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: newUserName,
      }),
    };

    fetch(userUrl, postOptions)
      .then((res) => res.json())
      .then((user) => {
        showUser(user);
        document.querySelector(".log-in-options").innerHTML = "";

        document.querySelector(".new-user-form").innerHTML = "";
        if (user.applications.length) {
          for (const application of user.applications) {
            showApplication(application);
          }
        } else {
          const noAppsYet = document.createElement("p");
          noAppsYet.classList.add("no-apps");
          noAppsYet.innerHTML = "You don't have any applications added yet.";
          document.querySelector(".right").append(noAppsYet);
        }
      });
  });
  // document.querySelector("h2").append(form);
  pageBanner.append(form);
}
