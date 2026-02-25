import axios from 'axios';
import Logger from './Logger';

export class NotificationUtil {
    /**
     * Send a notification via Slack
     * @param webhookUrl - Slack Webhook URL
     * @param message - Message to send
     */
    static async sendSlackNotification(webhookUrl: string, message: string): Promise<void> {
        try {
            await axios.post(webhookUrl, { text: message });
            Logger.info('Slack notification sent successfully.');
        } catch (error) {
            Logger.error(`Failed to send Slack notification: ${(error as Error).message}`);
        }
    }

    /**
     * Send a notification via Microsoft Teams
     * @param webhookUrl - Teams Webhook URL
     * @param message - Message to send
     */
    static async sendTeamsNotification(webhookUrl: string, message: string): Promise<void> {
        try {
            await axios.post(webhookUrl, { text: message });
            Logger.info('Teams notification sent successfully.');
        } catch (error) {
            Logger.error(`Failed to send Teams notification: ${(error as Error).message}`);
        }
    }

    /**
     * Send an email notification (Placeholder)
     * @param to - Recipient email
     * @param subject - Email subject
     * @param body - Email body
     */
    static async sendEmail(to: string, subject: string, body: string): Promise<void> {
        // Implementation depends on email service (e.g., Nodemailer, SendGrid)
        Logger.info(`Sending email to ${to}: ${subject}`);
    }
}
