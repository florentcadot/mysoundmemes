import { EmailService } from '../../../../core/port/service/email.service.port';
import { EMAIL_USER } from '../../../../../config/email.config';
import { BASE_URL } from '../../../../../config/env.config';

export class InMemoryEmailService implements EmailService {

  public activationEmailSent
  public resetUserPasswordEmailSent


  async sendActivationEmail(props: { email: string, name: string, activationToken: string }) {

      this.activationEmailSent = {from: EMAIL_USER,
        to: props.email,
        subject: 'Please confirm your account',
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${props.name}!</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${BASE_URL}/activate-account?token=${props.activationToken}> Click here</a>
        </div>`
      }

  }


  async sendResetUserPasswordEmail(props: { email: string, resetUserPasswordToken: string }){

    this.resetUserPasswordEmailSent = {
      from: EMAIL_USER,
      to: props.email,
      subject: 'Password change',
      html: `<h1>Password change</h1>
      <h2>Someone ask to change your password</h2>
      <p>Click on the following link to change your password</p>
      <a href=${BASE_URL}/reset-password?token=${props.resetUserPasswordToken}> Click here</a>
      <p>If you didn't ask for that please send a mail to the admin: ${EMAIL_USER}</p>
      </div>`,
    }
  }

}
