const errAlert = document.querySelector(".validation__alert");
function getData() {
  const form = document.getElementById("contact__form");
  const name = document.getElementById("name").value,
    email = document.getElementById("email").value,
    phoneNumber = document.getElementById("phone").value,
    subject = document.getElementById("subject").value,
    message = document.getElementById("message").value;

  const errMsg = document.getElementById("error__msg");

  if (!name || !email || !phoneNumber || !subject || !message) {
    errAlert.style.display = "block";
    errAlert.style.backgroundColor = "#e28484";
    errAlert.style.color = "#8f2121";
    errMsg.innerHTML = "All Fields is Required!";
    return;
  }

  const emailReceiver = "ramyabyyu@gmail.com";

  const sendEmailBtn = document.createElement("a");
  sendEmailBtn.href = `mailto:${emailReceiver}?subject=${subject}&body=Hello, my name is ${name}, ${message}. This is my phone ${phoneNumber}, and my email ${email}`;
  sendEmailBtn.click();

  form.reset();

  errAlert.style.display = "block";
  errAlert.style.backgroundColor = "#82eb82";
  errAlert.style.color = "#308330";
  errMsg.innerHTML = "Email Sent Successfully";
}

function closeAlert() {
  errAlert.style.display = "none";
}
