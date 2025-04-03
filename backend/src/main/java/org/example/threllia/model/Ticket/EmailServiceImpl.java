package org.example.threllia.model.Ticket;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendTicketCancel(String userEmail, String ticketId, Ticket ticketDetails) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String subject = "Your ticket for " + ticketDetails.getCity() + " show cancelled!";

        String text = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "    <meta charset=\"UTF-8\">" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "    <title>Ticket Confirmation</title>" +
                "    <style>" +
                "        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }" +
                "        .container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
                "        .header { background-color: #000; color: #fff; padding: 20px; text-align: center; border-bottom: 3px solid #ff6b00; }" +
                "        .ticket { background-color: #fff; border: 1px solid #ddd; padding: 20px; margin-top: 20px; }" +
                "        .ticket-header { border-bottom: 1px solid #ff6b00; padding-bottom: 10px; margin-bottom: 15px; }" +
                "        .ticket-details { margin-bottom: 20px; }" +
                "        .ticket-row { display: flex; justify-content: space-between; margin-bottom: 10px; }" +
                "        .label { font-weight: bold; color: #666; }" +
                "        .value { font-weight: normal; }" +
                "        .ticket-id { background-color: #f8f8f8; border: 1px dashed #ccc; text-align: center; padding: 10px; margin: 20px 0; }" +
                "        .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #999; }" +
                "        .cta-button { display: inline-block; background-color: #ff6b00; color: white; padding: 10px 20px; " +
                "                     text-decoration: none; border-radius: 4px; margin-top: 15px; }" +
                "    </style>" +
                "</head>" +
                "<body>" +
                "    <div class=\"container\">" +
                "        <div class=\"header\">" +
                "            <h1>Ticket Canceled</h1>" +
                "        </div>" +
                "            <div class=\"ticket-id\">" +
                "                <p>Ticket ID: <strong>" + ticketId + "</strong></p>" +
                "            </div>" +
                "    </div>" +
                "</body>" +
                "</html>";

        helper.setSubject(subject);
        helper.setText(text, true);
        helper.setTo(userEmail);

        try {
            mailSender.send(mimeMessage);
        } catch (MailException e) {
            throw new MessagingException("Failed to send ticket confirmation email");
        }

    }
    @Override
    public void sendTicketConfirmation(String userEmail, String ticketId, Ticket ticketDetails) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String subject = "Your ticket for " + ticketDetails.getCity() + " show";

        String text = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "    <meta charset=\"UTF-8\">" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "    <title>Ticket Confirmation</title>" +
                "    <style>" +
                "        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }" +
                "        .container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
                "        .header { background-color: #000; color: #fff; padding: 20px; text-align: center; border-bottom: 3px solid #ff6b00; }" +
                "        .ticket { background-color: #fff; border: 1px solid #ddd; padding: 20px; margin-top: 20px; }" +
                "        .ticket-header { border-bottom: 1px solid #ff6b00; padding-bottom: 10px; margin-bottom: 15px; }" +
                "        .ticket-details { margin-bottom: 20px; }" +
                "        .ticket-row { display: flex; justify-content: space-between; margin-bottom: 10px; }" +
                "        .label { font-weight: bold; color: #666; }" +
                "        .value { font-weight: normal; }" +
                "        .ticket-id { background-color: #f8f8f8; border: 1px dashed #ccc; text-align: center; padding: 10px; margin: 20px 0; }" +
                "        .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #999; }" +
                "        .cta-button { display: inline-block; background-color: #ff6b00; color: white; padding: 10px 20px; " +
                "                     text-decoration: none; border-radius: 4px; margin-top: 15px; }" +
                "    </style>" +
                "</head>" +
                "<body>" +
                "    <div class=\"container\">" +
                "        <div class=\"header\">" +
                "            <h1>Ticket Confirmation</h1>" +
                "        </div>" +
                "        <div class=\"ticket\">" +
                "            <div class=\"ticket-header\">" +
                "                <h2>Your ticket is confirmed!</h2>" +
                "                <p>Thank you for your purchase. Here are your ticket details:</p>" +
                "            </div>" +
                "            <div class=\"ticket-details\">" +
                "                <div class=\"ticket-row\">" +
                "                    <span class=\"label\">Event:</span>" +
                "                    <span class=\"value\">Live Concert in " + ticketDetails.getCity() + "</span>" +
                "                </div>" +
                "                <div class=\"ticket-row\">" +
                "                    <span class=\"label\">Date:</span>" +
                "                    <span class=\"value\"> " + ticketDetails.getFormattedDate() + "</span>" +
                "                </div>" +
                "                <div class=\"ticket-row\">" +
                "                    <span class=\"label\">Venue:</span>" +
                "                    <span class=\"value\"> " + ticketDetails.getPlace() + "</span>" +
                "                </div>" +
                "                <div class=\"ticket-row\">" +
                "                    <span class=\"label\">Location:</span>" +
                "                    <span class=\"value\"> " + ticketDetails.getCity() + ", " + ticketDetails.getCountry() + "</span>" +
                "                </div>" +
                "                <div class=\"ticket-row\">" +
                "                    <span class=\"label\">Quantity:</span>" +
                "                    <span class=\"value\"> " + ticketDetails.getQuantity() + "</span>" +
                "                </div>" +
                "            </div>" +
                "            <div class=\"ticket-id\">" +
                "                <p>Ticket ID: <strong> " + ticketId + "</strong></p>" +
                "                <p>Please save this ticket ID for future reference</p>" +
                "            </div>" +
                "            <p>Please bring a copy of this email or your ticket ID to the venue.</p>" +
                "        </div>" +
                "        <div class=\"footer\">" +
                "            <p>If you have any questions, please contact our support team.</p>" +
                "            <p>&copy; " + java.time.Year.now().getValue() + " Threllia. All rights reserved.</p>" +
                "        </div>" +
                "    </div>" +
                "</body>" +
                "</html>";

        helper.setSubject(subject);
        helper.setText(text, true);
        helper.setTo(userEmail);

        try {
            mailSender.send(mimeMessage);
        } catch (MailException e) {
            throw new MessagingException("Failed to send ticket confirmation email");
        }
    }
}
