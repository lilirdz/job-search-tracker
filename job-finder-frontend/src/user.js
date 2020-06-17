const userUrl = "http://localhost:3000/users";

function myFetch(url, options = {}) {
  return fetch(url, options).then((res) => res.json());
}

myFetch(`${userUrl}/1`).then((user) => {
  showUser(user);
  myFetch(url).then((applications) => {
    for (const application of applications) {
      showApplication(application);
    }
  });
});

function showUser(user) {
  const username = document.querySelector("#username");
  username.textContent = `Hello ${user.name}!`;

  const status = document.querySelector("#status");
  status.textContent = `Status: ${user.status}`;

  const editUserForm = document.querySelector("#edit-user-form");
  editUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const updateName = document.querySelector("#user-name-change").value;
    const updateStatus = document.querySelector("#user-status-change").value;
    console.log(updateName);
    console.log(updateStatus);
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
    fetch(`${userUrl}/1`, patchOptions)
      .then((res) => res.json())
      .then((user) => {
        username.textContent = `Hi ${updateName}`;
        status.textContent = `Status: ${updateStatus}`;
      });
  });
}

// Get the modal
const userModal = document.getElementById("userModal");
// Get the button that opens the modal
const updateBtn = document.getElementById("edit-btn");
// Get the <span> element that closes the modal
const userSpan = document.getElementsByClassName("close")[0];
const userForm = document.querySelector("#edit-user-form");
// When the user clicks on the button, open the modal
updateBtn.onclick = function () {
  userModal.style.display = "block";
};
// When the user clicks on <span> (x), close the userModal
userSpan.onclick = function () {
  userModal.style.display = "none";
};

userForm.onsubmit = function () {
  userModal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == userModal) {
    userModal.style.display = "none";
  }
};
