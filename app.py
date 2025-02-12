from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USERNAME = os.getenv('EMAIL_USERNAME')
SMTP_PASSWORD = os.getenv('EMAIL_APP_PASSWORD')
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL')

@app.route('/api/submit-form', methods=['POST'])
def submit_form():
    try:
        data = request.json
        name = data.get('name')
        agency = data.get('agency')
        email = data.get('email')
        phone = data.get('phone')

        # Create email message
        message = f"""
        New Lead from Prop.AI Website:
        
        Name: {name}
        Agency: {agency}
        Email: {email}
        Phone: {phone}
        """

        msg = MIMEText(message)
        msg['Subject'] = 'New Lead from Prop.AI Website'
        msg['From'] = SMTP_USERNAME
        msg['To'] = RECIPIENT_EMAIL

        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)

        return jsonify({"status": "success", "message": "Form submitted successfully"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000))) 