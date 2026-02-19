const fs = require('fs');

function log(message) {
    console.log(message);
    fs.appendFileSync('verification_log.txt', message + '\n');
}

async function sendRequest(data, name) {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }

    try {
        const res = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            body: formData
        });
        const json = await res.json();
        
        if (json.adminEmail) {
             log(`[${name}] RESULT: SUCCESS (Email Sent)`);
        } else if (json.success) {
             log(`[${name}] RESULT: BLOCKED (Fake Success)`);
        } else {
             log(`[${name}] RESULT: FAILED ${JSON.stringify(json)}`);
        }
    } catch (err) {
        log(`[${name}] ERROR: ${err.message}`);
    }
}

async function main() {
    fs.writeFileSync('verification_log.txt', ''); // Clear log file
    
    // 1. Valid Request
    log("\n--- Sending Valid Request ---");
    await sendRequest({
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        form_start_time: Date.now() - 5000,
        material: "Steel",
        quantity: "100", // valid name
        orderType: "one-time",
        location: "Test City",
        details: "Test details"
    }, "Valid");

    // 2. Honeypot Request
    log("\n--- Sending Honeypot Request ---");
    await sendRequest({
        name: "Spam Bot",
        email: "bot@spam.com",
        phone: "123",
        confirm_email: "I am a bot", // Honeypot filled
        form_start_time: Date.now() - 5000,
        material: "Spam",
        quantity: "Lots",
        location: "Nowhere"
    }, "Honeypot");

    // 3. Fast Request
    log("\n--- Sending Fast Request ---");
    await sendRequest({
        name: "Fast User",
        email: "fast@example.com",
        phone: "123",
        form_start_time: Date.now(), // Now
        material: "Speed",
        quantity: "1",
        location: "Speedway"
    }, "Fast");

    // 4. Invalid Name Request
    log("\n--- Sending Invalid Name Request ---");
    await sendRequest({
        name: "ThisIsAVeryLongNameWithoutSpacesWhichIsTypicalOfSpamBots",
        email: "spam@example.com",
        phone: "123",
        form_start_time: Date.now() - 5000,
        material: "Spam",
        quantity: "Lots",
        location: "Nowhere"
    }, "InvalidName");
}

main();
