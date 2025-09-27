// ✅ Replace with your deployed Google Apps Script Web App URL
const APPS_SCRIPT_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzj7T7Dm7w5x8u8IuGxmJWHYiewi6rK1f8Pqv3q9MFsmJqRbJUqqJDdD6u72jQaG7MD/exec';

// Smooth Scroll + Show/Hide sections
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const sectionId = this.getAttribute('data-section');
    const target = document.getElementById(sectionId);

    if (target) {
      // Hide all sections marked .section
      document.querySelectorAll('.section').forEach(sec => {
        sec.classList.add('hidden');
      });

      // Always show hero, services, gallery
      document.getElementById('home').classList.remove('hidden');
      document.getElementById('services').classList.remove('hidden');
      document.getElementById('gallery').classList.remove('hidden');

      // Show clicked one
      target.classList.remove('hidden');

      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

// "Get a Quote" button scrolls to Contact section
const quoteBtn = document.getElementById('quoteBtn');
if (quoteBtn) {
  quoteBtn.addEventListener('click', function () {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
      document.getElementById('home').classList.remove('hidden');
      document.getElementById('services').classList.remove('hidden');
      document.getElementById('gallery').classList.remove('hidden');
      contactSection.classList.remove('hidden');
      window.scrollTo({ top: contactSection.offsetTop - 70, behavior: 'smooth' });
    }
  });
}

// CONTACT FORM → Save enquiry to Google Sheet
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = {
      type: "contact",
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value
    };

    fetch(APPS_SCRIPT_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    alert("✅ Thank you! Your enquiry has been submitted.");
    contactForm.reset();
  });
}

// BOOKING FORM → Send booking email
const bookingForm = document.getElementById("booking-form");
if (bookingForm) {
  bookingForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const bookingData = {
      type: "booking",
      name: document.getElementById("bname").value,
      email: document.getElementById("bemail").value,
      phone: document.getElementById("bphone").value,
      eventType: document.getElementById("beventType").value,
      eventDate: document.getElementById("beventDate").value,
      eventLocation: document.getElementById("beventLocation").value,
      guests: document.getElementById("bguests").value,
      message: document.getElementById("bmessage").value
    };

    fetch(APPS_SCRIPT_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });

    alert("🎉 Your booking request has been sent successfully! We’ll get back to you soon.");
    bookingForm.reset();
  });
}

// ✅ LIGHTBOX FUNCTIONALITY
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
