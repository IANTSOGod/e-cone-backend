import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'iantsochristianrazafindrazaka@gmail.com',
        pass: 'ggvt mblh hyve vvlz',
      },
    });
  }

  async sendEmail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text: string;
    html?: string;
  }) {
    try {
      const mailOptions = {
        from: '"Nom de l\'expéditeur" <iantsochristianrazafindrazaka@gmail.com>',
        to,
        subject,
        text,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email envoyé : %s', info.messageId);
      return { message: 'Email envoyé' };
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      throw error;
    }
  }
}
