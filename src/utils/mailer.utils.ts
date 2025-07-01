// src/utils/mailer.ts
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import dotenv from 'dotenv';
import log from '@utils/logger.utils';
import { transporter } from '@libs/mailer.libs';

dotenv.config();

class Mailer {
  private transporter: Transporter;

  constructor() {
    this.transporter = transporter;

    // Setup Handlebars templating engine
    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.hbs',
          partialsDir: path.resolve(process.cwd(), 'views/emails'),
          defaultLayout: false,
        },
        viewPath: path.resolve(process.cwd(), 'views/emails'),
        extName: '.hbs',
      })
    );

    this.verifyConnection();
  }

  private verifyConnection() {
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('Email server connection failed:', error);
      } else {
        log('✅ Email server connected successfully');
      }
    });
  }

  // support both HTML or HBS
  public async send(
    to: string,
    subject: string,
    htmlOrTemplate: string,
    context: Record<string, any> = {}
  ) {
    const isTemplate = htmlOrTemplate.endsWith('.hbs') || context;

    const mailOptions: SendMailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to,
      subject,
      ...(isTemplate
        ? {
            template: htmlOrTemplate.replace('.hbs', ''), // filename without .hbs
            context,
          }
        : {
            html: htmlOrTemplate,
          }),
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      log('Email sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }
}

export default new Mailer();
