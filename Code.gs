// ✅ Replace these with your actual values
const SHEET_ID = '1N9sEFN9nVziO0QGvUh7BPOPTRKN5AzeZHG_scBwGsHk'; // Example: 1abcD23FghIJkl456...
const EMAIL_TO = 'skunjalkar744@gmail.com'; // Booking notifications will be sent here

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('Responses') || ss.insertSheet('Responses');

    // ✅ Ensure headers
    const headers = [
      'Timestamp', 'Type', 'Name', 'Email', 'Phone',
      'Event Type', 'Event Date', 'Event Location', 'Guests', 'Message'
    ];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    // ✅ Store form data in sheet
    const row = [
      new Date(),
      data.type || '',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.eventType || '',
      data.eventDate || '',
      data.eventLocation || '',
      data.guests || '',
      data.message || ''
    ];
    sheet.appendRow(row);

    // ✅ Send email only for Bookings
    if (data.type === "booking") {
      const subject = `🎉 New Booking Request from ${data.name}`;
      const body = `
You have received a new booking request from your website:

👤 Name: ${data.name}
📧 Email: ${data.email}
📞 Phone: ${data.phone}
🎊 Event Type: ${data.eventType}
📅 Event Date: ${data.eventDate}
📍 Location: ${data.eventLocation}
👥 Guests: ${data.guests}

💬 Message: ${data.message}

🕒 Submitted on: ${new Date()}
      `;
      MailApp.sendEmail(EMAIL_TO, subject, body);
    }

    // ✅ Return response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
