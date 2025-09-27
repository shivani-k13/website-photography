// Replace this URL with your deployed Google Apps Script Web App URL
const APPS_SCRIPT_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzp666NSNNt7_UlPk5ckyf8Qcldktf-Kcb_eIDxrnsACA4Hc_vTnvVR5W5k28mg6oi6/exec';


document.getElementById('year').textContent = new Date().getFullYear();


const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');


form.addEventListener('submit', async (e) =>{
e.preventDefault();
status.textContent = 'Sending...';
const data = {
name: form.name.value.trim(),
email: form.email.value.trim(),
phone: form.phone.value.trim(),
eventType: form.eventType.value,
message: form.message.value.trim(),
timestamp: new Date().toISOString()
};


try{
const res = await fetch(APPS_SCRIPT_WEBAPP_URL, {
method: 'POST',
headers: {'Content-Type':'application/json'},
body: JSON.stringify(data)
});
const json = await res.json();
if(json.result === 'success'){
status.textContent = 'Thanks — your inquiry has been sent! We will contact you shortly.';
form.reset();
} else {
status.textContent = 'There was a problem sending your message. Please try again.';
console.error(json);
}
} catch(err){
status.textContent = 'Network error — please try again later.';
console.error(err);
}
});